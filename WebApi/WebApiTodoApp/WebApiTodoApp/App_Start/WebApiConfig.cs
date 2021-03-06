using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net.Http.Headers;
using System.Web.Http;

namespace WebApiTodoApp
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services
      config.EnableCors();
      
      // Web API routes
      config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
      /**/
      var settings = config.Formatters.JsonFormatter.SerializerSettings;
      settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      settings.Formatting = Formatting.Indented;
      /**/
      // Web API configuration and services
      // Configure Web API to use only bearer token authentication.
      //config.SuppressDefaultHostAuthentication();
      //config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
      // Web API routes
      config.MapHttpAttributeRoutes();
      /**/
      // Atribute Routing
      config.Routes.MapHttpRoute(
          name: "ActionApi",
          routeTemplate: "api/{controller}/{action}/{id}",
          defaults: new { id = RouteParameter.Optional }
       );

      /**/
      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
