interface IVideoFull extends Omit<IVideoDto, 'projects'>, IBase {
  projects: IProject[];
}

interface IVideo extends IVideoDto, IBase {
  author: string;
}

interface IVideoDto {
  projects: string[];
  title: string;
  embedId: string;
  autoplay: boolean;
  mute: boolean;
  isMain: boolean;
}
