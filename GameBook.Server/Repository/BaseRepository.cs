using GameBook.Server.Data;
using Microsoft.EntityFrameworkCore;
using GameBook.Server.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;
namespace GameBook.Server.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Kontext databáze
        /// </summary>
        protected readonly ApplicationDbContext _context;
        /// <summary>
        /// Tabulka v databázi
        /// </summary>
        protected readonly DbSet<TEntity> _dbSet;
        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        /// <summary>
        /// Vrátí všechny entity
        /// </summary>
        /// <returns>
        /// List <see cref="TEntity"/> objekt reprezentujcí entity v databázi
        /// </returns>
        /// <remarks>
        /// Tato metoda se dotazuje na Dbset a načítá všechny entity z databáze.
        /// </remarks>

        public async Task<IList<TEntity>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        /// <summary>
        /// Vrátí entitu podle zadaného ID
        /// </summary>
        /// <param name="id">Id entity</param>
        /// <returns>
        /// Instnci <see cref="TEntity"/> objektu, pokud id existuje;
        /// </returns>
        /// <remarks>
        /// Tato metoda používá metodu Find na Dbsetu pro nalezení entity podle id.
        /// </remarks>

        public async Task<TEntity?> GetById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        /// <summary>
        /// Vytvoří novou entitu v databázi
        /// </summary>
        /// <param name="entity">Druh entity, kterou chceme založit </param>
        /// <returns>
        /// Vytvoří <see cref="TEntity"/> objekt a uloží ho do databáze"/>
        /// </returns>
        /// <remarks>
        /// Tato metoda používá metodu Add na Dbsetu pro přidání nové entity.
        /// </remarks>

        public async Task<TEntity> Create(TEntity entity)
        {
            EntityEntry<TEntity> entityEntry = _dbSet.Add(entity);
            await _context.SaveChangesAsync();
            return entityEntry.Entity;
        }

        /// <summary>
        /// Aktualizuje entitu v databázi
        /// </summary>
        /// <param name="entity">Druh entity, kterou chceme změnit</param>
        /// <returns>
        /// Informaci o tom, že <see cref="TEntity"/> objekt byl změněn a uložen do databáze"/>
        /// </returns>
        /// <remarks>
        /// Tato metoda používá metodu Update na Dbsetu pro aktualizaci entity.
        /// </remarks>

        public async Task<TEntity> Update(TEntity entity)
        {
            EntityEntry<TEntity> entityEntry = _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return entityEntry.Entity;
        }

        /// <summary>
        /// Oveřuje zda Id entity existuje; odpojuje entitu od kontextu pokud není null
        /// </summary>
        /// <param name="id">Id k ověření</param>
        /// <returns>
        /// True nebo False na základě toho, zda Id entity existuje
        /// </returns>
        /// <remarks>
        /// Tato metoda používá metodu Find na Dbsetu pro nalezení entity podle id.
        /// </remarks>

        public async Task<bool> IsExist(int id)
        {
            TEntity? entity = await _dbSet.FindAsync(id);
            if(entity != null)
            {
               _context.Entry(entity).State = EntityState.Detached;
            }

            return entity != null;
        }

        /// <summary>
        /// Smaže entitu z databáze
        /// </summary>
        /// <param name="id">Id enetity co chceme smazat</param>
        /// <exception cref="InvalidOperationException">Pokud se nepovede smazat entitu</exception>

        public async void Delete(int id)
        {
            TEntity? entity = await _dbSet.FindAsync(id);
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
