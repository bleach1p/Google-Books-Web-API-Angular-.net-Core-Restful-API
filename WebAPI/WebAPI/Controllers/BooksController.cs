using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        // GET: api/Books
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{description}")]
        public JsonResult Get(string description)
        {
            GoogleBooksService booksService = new GoogleBooksService();

            var result = booksService.GetBooksByName(description).Result;

            var restOfBooks = result.Items.Where(x => x.VolumeInfo.ImageLinks != null && !string.IsNullOrEmpty(x.VolumeInfo.ImageLinks.SmallThumbnail));

            SearchBooksByNameModel search = new SearchBooksByNameModel()
            {
                Items = restOfBooks.ToList(),
            };

            return new JsonResult(search);
        }


        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
