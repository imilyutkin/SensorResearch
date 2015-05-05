using System.Linq;
using System.Web.Security;
using WebMatrix.WebData;

namespace SensorResearch.Domain.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AddDefaultuser : DbMigration
    {
        public override void Up()
        {
//            CreateTable(
//                "dbo.UserProfile",
//                c => new
//                    {
//                        UserId = c.Int(nullable: false, identity: true),
//                        UserName = c.String(),
//                    })
//                .PrimaryKey(t => t.UserId);

            if (!WebSecurity.Initialized)
            {
                WebSecurity.InitializeDatabaseConnection("DefaultConnection", "UserProfile", "UserId", "UserName",
                    autoCreateTables:
                        true);
            }

            var roles = (SimpleRoleProvider)Roles.Provider;
            var membership = (SimpleMembershipProvider)Membership.Provider;

            if (!roles.RoleExists("Admin"))
            {
                roles.CreateRole("Admin");
            }
            if (!roles.RoleExists("Student"))
            {
                roles.CreateRole("Student");
            }
            if (membership.GetUser("admin", false) == null)
            {
                membership.CreateUserAndAccount("admin", "admin");
            }
            if (!roles.GetRolesForUser("admin").Contains("admin"))
            {
                roles.AddUsersToRoles(new[] { "admin" }, new[] { "Admin" });
            }
            if (membership.GetUser("student", false) == null)
            {
                membership.CreateUserAndAccount("student", "student");
            }
            if (!roles.GetRolesForUser("student").Contains("Student"))
            {
                roles.AddUsersToRoles(new[] { "student" }, new[] { "Student" });
            }
        }
        
        public override void Down()
        {
//            DropTable("dbo.UserProfile");
        }
    }
}
