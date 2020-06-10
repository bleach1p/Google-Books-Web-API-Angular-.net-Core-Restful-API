using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Database;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class DocumentService
    {
        private readonly MongoClient _client;
        private readonly IMongoCollection<FavoriteModel> _favoriteCollection;

        public DocumentService(DatabaseConfiguration settings)
        {
            _client = new MongoClient(settings.ConnectionString);
            _favoriteCollection = _client.GetDatabase("Favoritos").GetCollection<FavoriteModel>("Favoritos");

        }

        public  List<string> BuscarListaFavorito(string login)
        {
            List<string> list = new List<string>();
            
            var loginIdFilter = Builders<FavoriteModel>.Filter.Eq("LoginId", login);
            var listOfBooks = _favoriteCollection.Find(loginIdFilter).ToList();
            list.AddRange(listOfBooks.Select(x => x.BookId));
            return list;
        }

        public List<FavoriteModel> BuscaListaFavorito(string login, bool buscaListaModel)
        {
            var loginIdFilter = Builders<FavoriteModel>.Filter.Eq("LoginId", login);

            var listOfBooks = _favoriteCollection.Find(loginIdFilter).ToList();

            return listOfBooks;
        }

        public async Task CreateFavorite(FavoriteModel favorite)
        {
            await _favoriteCollection.InsertOneAsync(favorite);
        }

        public async Task DeleteFavorite(FavoriteModel favorite)
        {
            var bookIdFilter = Builders<FavoriteModel>.Filter.Eq("BookId", favorite.BookId);
            var loginIdFilter = Builders<FavoriteModel>.Filter.Eq("LoginId", favorite.LoginId);
            var combinedFilter = Builders<FavoriteModel>.Filter.And(bookIdFilter, loginIdFilter);

            await _favoriteCollection.DeleteOneAsync(combinedFilter);
        }
    }
}