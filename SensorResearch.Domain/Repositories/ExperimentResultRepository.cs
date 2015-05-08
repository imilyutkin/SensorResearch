using System;
using System.Data.Entity;
using System.Linq;
using SensorResearch.Domain.Models;

namespace SensorResearch.Domain.Repositories
{
    public class ExperimentResultRepository : Repository<ExperimentResult>
    {
        public override IQueryable<ExperimentResult> GetAll()
        {
            return CreativesContext.Set<ExperimentResult>().Include(r => r.ExperimentDatas).AsQueryable();
        }

        public override IQueryable<ExperimentResult> GetBy(Func<ExperimentResult, bool> predicate)
        {
            return CreativesContext.Set<ExperimentResult>().Include(r => r.ExperimentDatas).Where(predicate).AsQueryable();
        }
    }
}
