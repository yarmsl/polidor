import { Schema, model } from 'mongoose';

const customerSchema = new Schema<IYoutubeVideo>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    title: { type: String, default: '' },
    embedId: { type: String, required: true },
    autoplay: { type: Boolean, default: false },
    mute: { type: Boolean, default: true },
    isMain: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const YoutubeVideo = model('YoutubeVideo', customerSchema);
