import mongoose, { InferSchemaType, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    focusArea: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    exercises: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    coachTip: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;