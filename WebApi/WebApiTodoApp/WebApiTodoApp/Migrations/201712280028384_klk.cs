namespace WebApiTodoApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class klk : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tags", "createdBy", c => c.Int());
            CreateIndex("dbo.Tags", "createdBy");
            AddForeignKey("dbo.Tags", "createdBy", "dbo.Users", "userID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tags", "createdBy", "dbo.Users");
            DropIndex("dbo.Tags", new[] { "createdBy" });
            DropColumn("dbo.Tags", "createdBy");
        }
    }
}
