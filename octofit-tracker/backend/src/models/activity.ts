import mongoose, { InferSchemaType, Schema } from 'mongoose';

const activitySchema = new Schema(
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
    type: {
      type: String,
      required: true,
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    caloriesBurned: {
      type: Number,
      required: true,
      min: 0,
    },
    completedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity;