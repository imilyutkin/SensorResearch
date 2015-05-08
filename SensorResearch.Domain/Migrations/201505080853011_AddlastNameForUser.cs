namespace SensorResearch.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddlastNameForUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "LastName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserProfile", "LastName");
        }
    }
}
