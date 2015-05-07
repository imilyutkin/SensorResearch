using System.Data.Entity;
using SensorResearch.Domain.Models;

namespace SensorResearch.Domain
{
    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<ExperimentResult> ExperimentResults { get; set; }

        public DbSet<ExperimentData> ExperimentDatas { get; set; }

        private static readonly UsersContext Instance = new UsersContext();

        public static UsersContext Current
        {
            get { return Instance; }
        }
    }
}