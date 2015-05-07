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

        public void Save(ExperimentResult result)
        {
            Repository.Create(result);
        }
    }
}
