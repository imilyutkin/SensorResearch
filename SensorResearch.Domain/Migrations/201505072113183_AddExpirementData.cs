namespace SensorResearch.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddExpirementData : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ExperimentResults",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AmountOfStimuls = c.Int(nullable: false),
                        Distance = c.Int(nullable: false),
                        ExpirementDate = c.DateTime(nullable: false),
                        AvarageTimeOfSensorReaction = c.Single(nullable: false),
                        AvarageTimeOfMotorReaction = c.Single(nullable: false),
                        User_UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.User_UserId, cascadeDelete: true)
                .Index(t => t.User_UserId);
            
            CreateTable(
                "dbo.ExperimentDatas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TimeOfSensorReaction = c.Single(nullable: false),
                        TimeOfMotorReaction = c.Single(nullable: false),
                        ExperimentResult_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ExperimentResults", t => t.ExperimentResult_Id)
                .Index(t => t.ExperimentResult_Id);
            
            AlterColumn("dbo.UserProfile", "GroupNumber", c => c.String(maxLength: 6));
        }
        
        public override void Down()
        {
            DropIndex("dbo.ExperimentDatas", new[] { "ExperimentResult_Id" });
            DropIndex("dbo.ExperimentResults", new[] { "User_UserId" });
            DropForeignKey("dbo.ExperimentDatas", "ExperimentResult_Id", "dbo.ExperimentResults");
            DropForeignKey("dbo.ExperimentResults", "User_UserId", "dbo.UserProfile");
            AlterColumn("dbo.UserProfile", "GroupNumber", c => c.String());
            DropTable("dbo.ExperimentDatas");
            DropTable("dbo.ExperimentResults");
        }
    }
}
