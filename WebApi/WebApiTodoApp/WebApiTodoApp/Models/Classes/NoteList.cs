using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoApp.Models
{
    public class NoteList
    {
        [Key]
        public int listID { get; set; }
        [ForeignKey("notes"), Required]
        public int noteId { get; set; }
        public Notes notes { get; set; }
        public string title { get; set; }
        public bool done { get; set; }
    }
}