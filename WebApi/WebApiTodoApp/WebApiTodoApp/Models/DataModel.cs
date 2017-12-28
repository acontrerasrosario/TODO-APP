using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApiTodoApp.Models
{
    public class TodoAppContext : DbContext
    {

        public TodoAppContext()
        {
        }
        public TodoAppContext(bool LazyLoadEnabled)
        {
            Configuration.LazyLoadingEnabled = LazyLoadEnabled;
        }

        
        public DbSet<Users> users { get; set; }
        public DbSet<Notes> notes { get; set; }
        public DbSet<NoteList> noteList { get; set; }
        public DbSet<Tags> tags { get; set; }
    }
}