interface IYoutubeVideoFull extends Omit<IYoutubeVideoDto, 'projects'>, IBase {
  projects: IProject[];
}

interface IYoutubeVideo extends IYoutubeVideoDto, IBase {
  author: string;
}

interface IYoutubeVideoDto {
  projects: string[];
  title: string;
  embedId: string;
  autoplay: boolean;
  mute: boolean;
  isMain: boolean;
}
