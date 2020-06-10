using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class GoogleBooksService
    {
        private readonly string BaseUrl = "https://www.googleapis.com/books/v1/";
        private readonly HttpClient httpClient;

        public GoogleBooksService()
        {
            this.httpClient = HttpClientFactory.Create();
        }

        public async Task<SearchBooksByNameModel> GetBooksByName(string bookName)
        {
            string url = this.BaseUrl + "volumes?q=" + bookName + "&maxResults=40";

            var data = await httpClient.GetStringAsync(url);

            var books = JsonConvert.DeserializeObject<SearchBooksByNameModel>(data);

            return books;
        }

        public SearchBooksByNameModel GetBookByIds(List<string> ids)
        {
            SearchBooksByNameModel model = new SearchBooksByNameModel();
            model.Items = new List<SearchItems>();

            string url = this.BaseUrl + "volumes/";

            foreach (var id in ids)
            {
                string performSearchUrl = url + id;

                var data = httpClient.GetStringAsync(performSearchUrl).Result;

                var book = JsonConvert.DeserializeObject<SearchItems>(data);

                model.Items.Add(book);
            }

            return model;
        }
    }
}
