using System;
using System.Data.Entity;
using SensorResearch.Domain.Models;

namespace SensorResearch.Domain
{
    public class UsersContext : DbContext, IDisposable
    {
        public UsersContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<UserProfile> UserProfiles { get; set; }
    }
}