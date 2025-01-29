namespace GameBook.Server.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<IList<TEntity>> GetAll();
        Task<TEntity> GetById(int id);
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Update(TEntity entity);
        void Delete(int id);
        Task<bool> IsExist(int id);
    }
}
