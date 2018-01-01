namespace WebApiTodoApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initproject : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NoteLists",
                c => new
                    {
                        listID = c.Int(nullable: false, identity: true),
                        noteId = c.Int(nullable: false),
                        title = c.String(),
                        done = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.listID)
                .ForeignKey("dbo.Notes", t => t.noteId, cascadeDelete: true)
                .Index(t => t.noteId);
            
            CreateTable(
                "dbo.Notes",
                c => new
                    {
                        noteID = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        description = c.String(),
                        creationDate = c.DateTime(nullable: false),
                        dueDate = c.DateTime(nullable: false),
                        noteType = c.Int(nullable: false),
                        noteStatus = c.Int(nullable: false),
                        colorHex = c.String(),
                        remindMe = c.Int(nullable: false),
                        createdBy = c.Int(nullable: false),
                        tagName = c.String(),
                        tagID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.noteID)
                .ForeignKey("dbo.Tags", t => t.tagID, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.createdBy, cascadeDelete: true)
                .Index(t => t.createdBy)
                .Index(t => t.tagID);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        tagID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.tagID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        userID = c.Int(nullable: false, identity: true),
                        name = c.String(maxLength: 50),
                        lastName = c.String(maxLength: 50),
                        password = c.String(),
                        username = c.String(maxLength: 15),
                        email = c.String(),
                    })
                .PrimaryKey(t => t.userID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.NoteLists", "noteId", "dbo.Notes");
            DropForeignKey("dbo.Notes", "createdBy", "dbo.Users");
            DropForeignKey("dbo.Notes", "tagID", "dbo.Tags");
            DropIndex("dbo.Notes", new[] { "tagID" });
            DropIndex("dbo.Notes", new[] { "createdBy" });
            DropIndex("dbo.NoteLists", new[] { "noteId" });
            DropTable("dbo.Users");
            DropTable("dbo.Tags");
            DropTable("dbo.Notes");
            DropTable("dbo.NoteLists");
        }
    }
}
