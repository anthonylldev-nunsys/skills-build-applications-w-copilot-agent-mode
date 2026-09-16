import mongoose, { InferSchemaType, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    sportFocus: {
      type: String,
      required: true,
      trim: true,
    },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;