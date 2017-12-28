namespace WebApiTodoApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class nullfields : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Notes", "tagID", "dbo.Tags");
            DropForeignKey("dbo.Notes", "createdBy", "dbo.Users");
            DropIndex("dbo.Notes", new[] { "createdBy" });
            DropIndex("dbo.Notes", new[] { "tagID" });
            AlterColumn("dbo.Notes", "createdBy", c => c.Int());
            AlterColumn("dbo.Notes", "tagID", c => c.Int());
            CreateIndex("dbo.Notes", "createdBy");
            CreateIndex("dbo.Notes", "tagID");
            AddForeignKey("dbo.Notes", "tagID", "dbo.Tags", "tagID");
            AddForeignKey("dbo.Notes", "createdBy", "dbo.Users", "userID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Notes", "createdBy", "dbo.Users");
            DropForeignKey("dbo.Notes", "tagID", "dbo.Tags");
            DropIndex("dbo.Notes", new[] { "tagID" });
            DropIndex("dbo.Notes", new[] { "createdBy" });
            AlterColumn("dbo.Notes", "tagID", c => c.Int(nullable: false));
            AlterColumn("dbo.Notes", "createdBy", c => c.Int(nullable: false));
            CreateIndex("dbo.Notes", "tagID");
            CreateIndex("dbo.Notes", "createdBy");
            AddForeignKey("dbo.Notes", "createdBy", "dbo.Users", "userID", cascadeDelete: true);
            AddForeignKey("dbo.Notes", "tagID", "dbo.Tags", "tagID", cascadeDelete: true);
        }
    }
}
