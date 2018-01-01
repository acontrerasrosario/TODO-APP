using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiTodoApp.Helpers;
using WebApiTodoApp.Models;

namespace WebApiTodoApp.Controllers.api
{
  [EnableCors(origins: "http://localhost:8100", headers: "*", methods: "*")]
  public class UsersController : ApiController
  {

    public class SignUpDTO
    {
      public string name { get; set; }
      public string lastName { get; set; }
      public string password { get; set; }
      public string email { get; set; }
      public string username { get; set; }
    }

    public class SignInDTO
    {
      public string credential { get; set; }
      public string password { get; set; }
    }

    private string GetMd5Hash(MD5 md5Hash, string input)
    {

      // Convert the input string to a byte array and compute the hash.
      byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

      // Create a new Stringbuilder to collect the bytes
      // and create a string.
      StringBuilder sBuilder = new StringBuilder();

      // Loop through each byte of the hashed data 
      // and format each one as a hexadecimal string.
      for (int i = 0; i < data.Length; i++)
      {
        sBuilder.Append(data[i].ToString("x2"));
      }

      // Return the hexadecimal string.
      return sBuilder.ToString();
    }

    // Verify a hash against a string.
    private bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
    {
      // Hash the input.
      string hashOfInput = GetMd5Hash(md5Hash, input);

      // Create a StringComparer an compare the hashes.
      StringComparer comparer = StringComparer.OrdinalIgnoreCase;

      if (0 == comparer.Compare(hashOfInput, hash))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    [HttpGet]
    public object helloworld()
    {
      return "HelloWoerl";
    }
    [HttpPost]
    [AcceptVerbs("POST")]
    public HttpResponseMessage SignUp([FromBody]SignUpDTO newUser)
    {

      try
      {
        using (var context = new TodoAppContext())
        {


          using (MD5 md5Hash = MD5.Create())
          {
            var c = new Users()
            {
              name = newUser.name,
              lastName = newUser.lastName,
              password = GetMd5Hash(md5Hash, newUser.password),
              username = newUser.username,
              email = newUser.email
            };
            context.users.Add(c);
            context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
          }
        };
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadRequest, e);
      }
    }

    [HttpPost]
    //[AcceptVerbs("POST")]
    public object SignIn([FromBody]SignInDTO requestUser)
    {
      try
      {
        using (var context = new TodoAppContext())
        {
          using (MD5 md5Hash = MD5.Create())
          {
            var user = context.users.Where(u => (u.email == requestUser.credential || u.username == requestUser.credential)).FirstOrDefault();

            if (user == null) return NotFound();

            string currPassword = GetMd5Hash(md5Hash, requestUser.password);

            if (!VerifyMd5Hash(md5Hash, requestUser.password, user.password)) return Request.CreateResponse(HttpStatusCode.NotFound);

            var result = new
            {
              username = user.username,
              name = user.name,
              lastName = user.lastName,
              email = user.email,
            };
            var BASIC = CryptographyService.EncryptValue($"{user.username}:{user.password}");
            HttpContext.Current.Response.AppendHeader("Basic", BASIC);
            //Request.Headers.Add("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{user.username}:{user.password}")));
            return Request.CreateResponse(HttpStatusCode.OK, result);
          }
        };
      }
      catch (Exception e)
      {
        return Request.CreateResponse(HttpStatusCode.BadRequest, e);
      }
    }
  }
}
