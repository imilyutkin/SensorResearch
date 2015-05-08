using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using SensorResearch.Domain.Models;
using SensorResearch.Domain.Repositories;

namespace SensorResearch.Domain.Services
{
    public class ExperimentService
    {
        protected readonly Repository<ExperimentResult> Repository; 

        public ExperimentService()
        {
            Repository = new ExperimentResultRepository();
        }

        public int Save(ExperimentResult result)
        {
            return Repository.Create(result).Id;
        }

        public IEnumerable<ExperimentResult> GetLastExperimentForUser(UserProfile user)
        {
            return Repository.GetBy(result => result.User.UserName.Equals(user.UserName)).OrderByDescending(result => result.ExpirementDate);
        }

        public IEnumerable<ExperimentResult> GetAll()
        {
            return Repository.GetAll().OrderByDescending(result => result.ExpirementDate);
        }

        public ExperimentResult GetResultsById(int id)
        {
            return Repository.GetBy(result => result.Id == id).FirstOrDefault();
        }
    }
}
