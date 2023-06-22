interface IYoutubeVideo extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  projects: TObjectId[];
  title: string;
  embedId: string;
  autoplay: boolean;
  mute: boolean;
  isMain: boolean;
}
