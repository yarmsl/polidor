interface IStoryArticle extends IBase, IStoryArticleDto {}

interface IStoryArticleDto {
  title: string;
  content: string;
}
