using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApiTodoApp.Models
{
    public enum Type
    {
        NOTE,LIST
    }
    public enum Status
    {
        TODO, DOING, DONE 
    }
    public enum remindMeType
    {
        min15 = 1, min30 = 2, hour1 = 3, hour2 = 4
  }
    public class Notes
    {
        [Key]
        public int noteID { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime creationDate { get; set; }
        public DateTime dueDate { get; set; }
        public Type noteType { get; set; }
        public Status noteStatus { get; set; }
        public string colorHex { get; set; }
        public remindMeType remindMe { get; set; }
        [ForeignKey("users")]
        public int? createdBy { get; set; }
        public Users users { get; set; }
        public string tagName { get; set; }
        [ForeignKey("tags")]
        public int? tagID { get; set; }
        public Tags tags { get; set; }
    }
}
