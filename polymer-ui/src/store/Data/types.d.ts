interface ITag {
  _id: string;
  projects: IProject[];
  name: string;
  slug: string;
  order: number;
}

interface IProject {
  _id: string;
  title: string;
  done: string;
  year: number;
  images: string[];
  customer: ICustomer;
  tags: ITag[];
  slug: string;
  order: number;
}

interface ICustomer {
  _id: string;
  projects: IProject[];
  name: string;
  description: string;
  logo: string;
  slug: string;
  order: number;
}

interface IArticle {
  _id: string;
  title: string;
  content: string;
  images: string[];
}

interface IStep {
  _id: string;
  order: number;
  title: string;
  content: string;
  image: string;
}

interface IProductionArticle {
  _id: string;
  title: string;
  content: string;
  order: number;
  steps: IStep[];
}

interface IStory {
  _id: string;
  from: number;
  content: string;
  to: number;
}

interface IStoryArticle {
  content: string;
  title: string;
}

interface IVacancy {
  _id: string;
  title: string;
  requirements: string;
  wage: number;
}

interface IBanner {
  _id: string;
  text: string;
  image: string;
  order: number;
}

interface IBottomBanner {
  _id: string;
  projects: string[];
}

interface IWantFile {
  email: string;
}

interface IFeedback {
  name: string;
  email: string;
  phone: string;
}
