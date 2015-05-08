using System.Data.Entity;
using SensorResearch.Domain.Migrations;
using SensorResearch.Domain.Models;

namespace SensorResearch.Domain
{
    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<ExperimentResult> ExperimentResults { get; set; }

        public DbSet<ExperimentData> ExperimentDatas { get; set; }

        private static readonly UsersContext Instance = new UsersContext();

        public static UsersContext Current
        {
            get { return Instance; }
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<UsersContext, Configuration>());
        }
    }
}