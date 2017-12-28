using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApiTodoApp.Models
{
    public class Tags
    {
        [Key]
        public int tagID { get; set; }
        public string Name { get; set; }
        [ForeignKey("users")]
        public int? createdBy { get; set; }
        public Users users { get; set; }
        public IEnumerable<Notes> notes { get; set; }
    }
}