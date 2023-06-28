interface ITag extends IBase, Omit<ITagDto, 'projects'> {
  projects: IProject[];
}

interface ITagDto {
  name: string;
  slug: string;
  order: number;
  projects: string[];
}
