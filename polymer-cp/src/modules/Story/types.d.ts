interface IStory extends IBase, IStoryDto {}

interface IStoryDto {
  from: number;
  to?: number;
  content: string;
}
