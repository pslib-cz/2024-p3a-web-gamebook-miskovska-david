using GameBook.Server.Data;
using GameBook.Server.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace GameBook.Server.Repository
{
    public class BaseRepository<T> : IBaseReposity<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;
        private const string _folder = "Uploads";
        public BaseRepository(ApplicationDbContext context) {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public void Add(T entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public IList<T> GetAll()
        {
            return _dbSet.ToList(); 
        }

        public IList<T> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task Upload(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                throw new Exception("Soubor je prázdný");
            }
            var path = Path.Combine(_folder, file.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

        }
    }
}
