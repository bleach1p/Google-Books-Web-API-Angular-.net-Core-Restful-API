using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly DocumentService _documentService;
        private readonly GoogleBooksService _googleBooksService;

        public FavoriteController(DocumentService documentService)
        {
            _documentService = documentService;
            _googleBooksService = new GoogleBooksService();
        }

        [HttpGet("login")]
        public JsonResult Get(string login, [FromQuery]bool returnIdsString = false)
        {
            if (returnIdsString)
            {
                var listaFavoritos = _documentService.BuscaListaFavorito(login, returnIdsString).GroupBy(x => x.BookId).Select(x => x.First()).Select(x => x.BookId).ToList();

                var model = _googleBooksService.GetBookByIds(listaFavoritos);
                return new JsonResult(model);
            }
            else
            {
                var listaFavoritos = _documentService.BuscarListaFavorito(login).Distinct();
                return new JsonResult(listaFavoritos);
            }
        }

        // POST: api/Favorite
        [HttpPost]
        public async Task<JsonResult> Post([FromQuery] string id, [FromQuery] string login)
        {
            FavoriteModel model = new FavoriteModel()
            {
                BookId = id,
                LoginId = login
            };
            await _documentService.CreateFavorite(model);

            return new JsonResult("success");
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public async Task<JsonResult> Delete([FromQuery]string id, [FromQuery] string login)
        {
            FavoriteModel model = new FavoriteModel()
            {
                BookId = id,
                LoginId = login
            };
            await _documentService.DeleteFavorite(model);

            return new JsonResult("success");
        }
    }
}
