using MongoDB.Bson;

namespace WebAPI.Models
{
    public class FavoriteModel
    {
        public ObjectId Id { get; set; }

        public string BookId { get; set; }

        public string LoginId { get; set; }


    }
}
