using System;
using System.Linq;
using SensorResearch.Domain.Models;

namespace SensorResearch.Domain.Repositories
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        IQueryable<TEntity> GetAll();

        TEntity Create(TEntity entity);

        void Update(TEntity entity);

        void Remove(TEntity entity);

        void RemoveById(int id);

        IQueryable<TEntity> GetBy(Func<TEntity, bool> predicate);
    }
}
