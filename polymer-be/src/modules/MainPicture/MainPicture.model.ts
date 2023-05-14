import { Schema, model } from 'mongoose';

const mainPicture = new Schema<IMainPicture>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    src: { type: String, required: true },
    order: { type: Number, required: true },
    tab: { type: String, required: true },
  },
  { timestamps: true },
);

export const MainPicture = model('MainPictures_1', mainPicture);
