interface IMainPicture {
  createdAt: string;
  updatedAt: string;
  author: IUser;
  src: string;
  order: number;
  tab: TMainPicturesTabs;
  _id: string;
}

type TMainPicturesTabs = 'design' | 'model' | 'engineering' | 'production' | 'perfect';
