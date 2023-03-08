import express from 'express';

import moduleAlias from 'module-alias';
moduleAlias.addAlias('~', __dirname);
import mongoose from 'mongoose';
// eslint-disable-next-line import/order
import cors from 'cors';
import { DB_HOST, PORT, SCOPE_HOST } from '~/config/constants';
import Article from '~/modules/Article';
import Auth from '~/modules/Auth';
import Banner from '~/modules/Banner';
import Customer from '~/modules/Customer';
import Mail from '~/modules/Mail';
import MainPictures from '~/modules/MainPicture';
import PresentationFile from '~/modules/PresentationFile';
import ProductionArticle from '~/modules/ProductionArticle';
import Project from '~/modules/Project';
import Story from '~/modules/Story';
import StoryArticle from '~/modules/StoryArticle';
import Tag from '~/modules/Tag';
import User from '~/modules/User';
import Vacancy from '~/modules/Vacancy';

const corsOptions = {
  origin: SCOPE_HOST,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use('/uploads', express.static('uploads', { maxAge: 1296000000 }));

app.use('/api/auth', Auth);
app.use('/api/user', User);
app.use('/api/banner', Banner);
app.use('/api/customer', Customer);
app.use('/api/tag', Tag);
app.use('/api/project', Project);
app.use('/api/file', PresentationFile);
app.use('/api/mail', Mail);
app.use('/api/article', Article);
app.use('/api/production', ProductionArticle);
app.use('/api/story', Story);
app.use('/api/storyarticle', StoryArticle);
app.use('/api/vacancy', Vacancy);
app.use('/api/main_pictures', MainPictures);

const start = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(DB_HOST);
  } catch (e) {
    console.warn('Server error ', e);
    process.exit(1);
  }
};
start();

app.listen(PORT, () => console.log(`Server up port ${PORT}`));
