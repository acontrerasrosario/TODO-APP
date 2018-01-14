using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiTodoApp.Helpers;
using WebApiTodoApp.Models;

namespace WebApiTodoApp.Controllers.api
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
  public class NotesController : ApiController
  {
    public class newNoteDTO
    {
      public string title { get; set; }
      public string description { get; set; }
      public int type { get; set; }
      public string dueDate { get; set; }
      public string color { get; set; }
      public int remindMe { get; set; }
      public int tagId { get; set; }
    }
    public class UpdateNoteDTO
    {
      public int noteID { get; set; }
      public string title { get; set; }
      public string description { get; set; }
      public int type { get; set; }
      public string dueDate { get; set; }
      public string colorHex { get; set; }
      public int remindMe { get; set; }
      public int tagId { get; set; }

    }

    [HttpGet]
    [BasicAuth]
    public HttpResponseMessage getAllNotes()
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          var result = context.notes.Where(n => n.createdBy == user.userID).ToList();
          return Request.CreateResponse(HttpStatusCode.OK, result);
        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

    [HttpGet]
    [BasicAuth]
    public HttpResponseMessage getNoteByID(int id)
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          var result = context.notes.Where(n => n.createdBy == user.userID && n.noteID == id).FirstOrDefault();
          return Request.CreateResponse(HttpStatusCode.OK, result);
        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

    [HttpPost]
    [BasicAuth]
    public HttpResponseMessage createNewNote(newNoteDTO newNote)
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          if (user == null) return Request.CreateResponse(HttpStatusCode.Unauthorized);

          var c = new Notes()
          {
            title = newNote.title,
            creationDate = DateTime.UtcNow,
            description = newNote.description,
            dueDate = DateTime.Parse(newNote.dueDate),
            noteStatus = Status.TODO,
            noteType = (Models.Type)newNote.type,
            colorHex = newNote.color,
            remindMe = (Models.remindMeType)newNote.remindMe,
            createdBy = user.userID
          };
          if (newNote.tagId != 0)
          {

            c.tagID = newNote.tagId;
            c.tagName = context.tags.Where(t => t.tagID == newNote.tagId).Select(d => d.Name).FirstOrDefault();
          }

          context.notes.Add(c);
          context.SaveChanges();
          return Request.CreateResponse(HttpStatusCode.OK, c);

        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

    [HttpPut]
    [BasicAuth]
    public HttpResponseMessage UpdateNote(UpdateNoteDTO note)
    {

      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          if (user == null) return Request.CreateResponse(HttpStatusCode.Unauthorized);

          var c = context.notes.Where(n => n.noteID == note.noteID && n.createdBy == user.userID).FirstOrDefault();
          if (c == null) NotFound();
          c.title = note.title;
          c.description = note.description;
          c.dueDate = DateTime.Parse(note.dueDate);
          c.noteStatus = Status.TODO;
          c.noteType = (Models.Type)note.type;
          c.colorHex = note.colorHex;
          c.remindMe = (Models.remindMeType)note.remindMe;
          if (note.tagId != 0)
          {
            c.tagID = note.tagId;
            c.tagName = context.tags.Where(t => t.tagID == note.tagId).Select(d => d.Name).FirstOrDefault();
          }
          context.SaveChanges();
          var result = context.notes.Where(n => n.createdBy == user.userID).ToList();
          return Request.CreateResponse(HttpStatusCode.OK, result);

        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }


    [HttpDelete]
    [BasicAuth]
    public HttpResponseMessage deleteNote(int noteID)
    {

      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          if (user == null) return Request.CreateResponse(HttpStatusCode.Unauthorized);

          var c = context.notes.Where(n => n.noteID == noteID && n.createdBy == user.userID).FirstOrDefault();

          if (c == null) return Request.CreateResponse(HttpStatusCode.NotFound);
          context.notes.Remove(c);
          context.SaveChanges();
          return Request.CreateResponse(HttpStatusCode.OK, c);
        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

    [HttpPost]
    [BasicAuth]
    public HttpResponseMessage CreateTag(string newTagName)
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          if (user == null) return Request.CreateResponse(HttpStatusCode.Unauthorized);

          var c = new Tags()
          {
            Name = newTagName,
            createdBy = user.userID
          };
          context.tags.Add(c);
          context.SaveChanges();
          return Request.CreateResponse(HttpStatusCode.OK);

        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

    [HttpDelete]
    public HttpResponseMessage DeleteTag(int id)
    {

      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          if (user == null) return Request.CreateResponse(HttpStatusCode.Unauthorized);
          var c = context.tags.Where(t => t.tagID == id && t.createdBy == user.userID).FirstOrDefault();
          if (c == null) return Request.CreateResponse(HttpStatusCode.NotFound);
          context.tags.Remove(c);
          context.SaveChanges();
          return Request.CreateResponse(HttpStatusCode.OK);

        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

    [HttpGet]
    [BasicAuth]
    public HttpResponseMessage getTagByID(int id)
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          var result = context.tags.Where(n => n.createdBy == user.userID && n.tagID == id).FirstOrDefault();
          return Request.CreateResponse(HttpStatusCode.OK, result);
        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }


    [HttpGet]
    [BasicAuth]
    public HttpResponseMessage getAllTags()
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          var user = AuthService.getCurrUserInfo(HttpContext.Current.Request.Headers);
          var result = context.tags.Where(n => n.createdBy == user.userID).ToList();
          return Request.CreateResponse(HttpStatusCode.OK, result);
        }
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadGateway, e);
      }
    }

  }
}
