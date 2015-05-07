using System;
using System.Data;
using System.Linq;
using SensorResearch.Domain.Models;

namespace SensorResearch.Domain.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
           where TEntity : class, IEntity
    {
        protected UsersContext CreativesContext
        {
            get
            {
                return UsersContext.Current;
            }
        }
        public IQueryable<TEntity> GetAll()
        {
            return CreativesContext.Set<TEntity>().AsQueryable();
        }

        public TEntity Create(TEntity entity)
        {
            TEntity tEntity = CreativesContext.Set<TEntity>().Add(entity);
            CreativesContext.SaveChanges();
            return tEntity;
        }

        public void Update(TEntity entity)
        {
            CreativesContext.Entry(entity).State = EntityState.Modified;
            CreativesContext.SaveChanges();
        }

        public void RemoveById(int id)
        {
            TEntity entity = CreativesContext.Set<TEntity>().Find(id);
            CreativesContext.Set<TEntity>().Remove(entity);
            CreativesContext.SaveChanges();
        }

        public void Remove(TEntity entity)
        {
            CreativesContext.Set<TEntity>().Remove(entity);
            CreativesContext.SaveChanges();
        }

        public IQueryable<TEntity> GetBy(Func<TEntity, bool> predicate)
        {
            return CreativesContext.Set<TEntity>().Where(predicate).AsQueryable();
        }
    }
}
