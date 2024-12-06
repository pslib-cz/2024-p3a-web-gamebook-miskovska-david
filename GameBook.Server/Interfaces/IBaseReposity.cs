namespace GameBook.Server.Interfaces
{
    public interface IBaseReposity<T> where T : class
    {
        public IList<T> GetById(int id);
        public IList<T> GetAll();
        public void Add(T entity);
        public void Update(T entity);
        public void Delete(T entity);
        public Task Upload(IFormFile file);
    }
}
