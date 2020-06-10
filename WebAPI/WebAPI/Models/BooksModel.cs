using System.Collections.Generic;

namespace WebAPI.Models
{
    public class SearchBooksByNameModel
    {
        public List<SearchItems> Items { get; set; }
    }

    public class SearchItems
    {
        public string Id { get; set; }

        public VolumeInfo VolumeInfo { get; set; }
    }

    public class VolumeInfo
    {
        public string Title { get; set; }

        public string Subtitle { get; set; }

        public List<string> Authors { get; set; }

        public string Publisher { get; set; }

        public string PublishedDate { get; set; }

        public decimal AverageRating { get; set; }

        public ImageLinks ImageLinks { get; set; }
    }

    public class ImageLinks
    {
        public string SmallThumbnail { get; set; }

        public string Thumbnail { get; set; }
    }

}
