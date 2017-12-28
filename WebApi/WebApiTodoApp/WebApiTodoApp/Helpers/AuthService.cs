using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using WebApiTodoApp.Models;

namespace WebApiTodoApp.Helpers
{
    public class AuthService
    {

        public class decryptdUser
        {
            public int userID { get; set; }
            public string name { get; set; }
            public string lastName { get; set; }
            public string usernmae { get; set; }
            public string email { get; set; }
        }

        public static decryptdUser getCurrUserInfo(NameValueCollection headers)
        {
            var y = headers["Authorization"];
            if (y == null) return null;
            else
            {
                try
                {
                    string xx = CryptographyService.DecryptValue(y);
                    using (var context = new TodoAppContext())
                    {
                        string[] credential = xx.Split(new char[] { ':' }, StringSplitOptions.None);
                        string username = credential[0].ToString();
                        string password = credential[1].ToString();
                        var user = context.users.Where(u => u.username == username && u.password == password).FirstOrDefault();
                        if (user == null) return null;
                        decryptdUser dgUser = new decryptdUser()
                        {
                            userID = user.userID,
                            name = user.name,
                            lastName = user.lastName,
                            usernmae = user.username,
                            email = user.email
                        };
                        return dgUser;
                    }
                }
                catch (Exception e)
                {
                    return null;
                }

            }
        }
    }
}