using GameBook.Server.Data;
using Microsoft.EntityFrameworkCore;
using GameBook.Server.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;
namespace GameBook.Server.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<TEntity> _dbSet;
        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public IList<TEntity> GetAll()
        {
            return _dbSet.ToList();
        }

        public TEntity? GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public TEntity Create(TEntity entity)
        {
            EntityEntry<TEntity> entityEntry = _dbSet.Add(entity);
            _context.SaveChanges();
            return entityEntry.Entity;
        }

        public TEntity Update(TEntity entity)
        {
            EntityEntry<TEntity> entityEntry = _dbSet.Update(entity);
            _context.SaveChanges();
            return entityEntry.Entity;
        }

        public bool IsExist(int id)
        {
            TEntity? entity = _dbSet.Find(id);
            if(entity != null)
            {
                _context.Entry(entity).State = EntityState.Detached;
            }

            return entity != null;
        }

        public void Delete(int id)
        {
            TEntity? entity = _dbSet.Find(id);
            if (entity != null)
            {
                try
                {
                    _dbSet.Remove(entity);
                    _context.SaveChanges();
                }
                catch
                {
                    _context.Entry(entity).State = EntityState.Detached;
                    throw;
                }
            }
        }
    }
}
