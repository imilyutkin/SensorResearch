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
            Repository = new Repository<ExperimentResult>();
        }

        public int Save(ExperimentResult result)
        {
            return Repository.Create(result).Id;
        }


        public ExperimentResult GetLastExperimentForUser(UserProfile user)
        {
            return Repository.GetBy(result => result.User.UserName.Equals(user.UserName)).OrderByDescending(result => result.ExpirementDate).First();
        }

        public ExperimentResult GetResultsById(int id)
        {
            return Repository.GetBy(result => result.Id == id).FirstOrDefault();
        }
    }
}
