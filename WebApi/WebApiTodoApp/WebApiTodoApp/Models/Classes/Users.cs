using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiTodoApp.Models
{
    public class Users
    {
        [Key]
        public int userID { get; set; }
        [StringLength(50)]
        public string name { get; set; }
        [StringLength(50)]
        public string lastName { get; set; }
        public string password { get; set; }
        [StringLength(15)]
        public string username { get; set; }
        [DataType(DataType.EmailAddress)]
        public string email { get; set; }
    }
}