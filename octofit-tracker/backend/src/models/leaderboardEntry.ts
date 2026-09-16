import mongoose, { InferSchemaType, Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    weeklyChange: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema>;

const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;