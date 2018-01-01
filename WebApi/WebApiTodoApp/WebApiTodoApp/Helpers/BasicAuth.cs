using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Controllers;
using WebApiTodoApp.Models;

namespace WebApiTodoApp.Helpers
{
  class BasicAuthAttribute : System.Web.Http.Filters.AuthorizationFilterAttribute
  {
    public override void OnAuthorization(HttpActionContext actionContext)
    {
      try
      {
        var BasicToken = actionContext.Request.Headers.Where(d => d.Key == "Authorization").FirstOrDefault().Value.FirstOrDefault();
        if (BasicToken == null)
          actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);

        string xx = CryptographyService.DecryptValue(BasicToken);
        using (var context = new TodoAppContext())
        {
          string[] credential = xx.Split(new char[] { ':' }, StringSplitOptions.None);
          string username = credential[0].ToString();
          string password = credential[1].ToString();
          var user = context.users.Where(u => u.username == username && u.password == password).FirstOrDefault();
          if (user == null) actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
        }
      }
      catch (Exception)
      {
        actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
      }

    }
  }
}
