export class Books {
  VolumeInfo: VolumeInfo;
  Id: string;
}

export class VolumeInfo{
  Title: string;
  Subtitle: string;
  Authors: string[];
  Publisher: string;
  PublishedDate: string;
  AverageRating: number;
  ImageLinks: ImageLinks;
}

export class ImageLinks{
  SmallThumbnail: string;
  Thumbnail: string;
}

export class BookList{
  Items: Books[];

  constructor(response: any){
    this.Items = response;
  }
}
