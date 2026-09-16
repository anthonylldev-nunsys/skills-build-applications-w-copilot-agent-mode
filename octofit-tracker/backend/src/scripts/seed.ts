import mongoose from 'mongoose';

import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboardEntry.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Patel',
        email: 'maya.patel@octofit.test',
        fitnessLevel: 'advanced',
        weeklyGoal: 5,
        streakDays: 21,
      },
      {
        name: 'Jordan Kim',
        email: 'jordan.kim@octofit.test',
        fitnessLevel: 'intermediate',
        weeklyGoal: 4,
        streakDays: 12,
      },
      {
        name: 'Elena Garcia',
        email: 'elena.garcia@octofit.test',
        fitnessLevel: 'beginner',
        weeklyGoal: 3,
        streakDays: 7,
      },
      {
        name: 'Noah Mensah',
        email: 'noah.mensah@octofit.test',
        fitnessLevel: 'advanced',
        weeklyGoal: 6,
        streakDays: 30,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        city: 'Seattle',
        sportFocus: 'Trail Running',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Pulse Collective',
        city: 'Austin',
        sportFocus: 'Functional Strength',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'Hill Sprints',
        durationMinutes: 42,
        caloriesBurned: 510,
        completedAt: new Date('2026-09-15T06:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        type: 'Tempo Run',
        durationMinutes: 36,
        caloriesBurned: 430,
        completedAt: new Date('2026-09-14T18:15:00.000Z'),
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        type: 'Mobility Circuit',
        durationMinutes: 28,
        caloriesBurned: 180,
        completedAt: new Date('2026-09-15T12:00:00.000Z'),
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        type: 'Rowing Intervals',
        durationMinutes: 50,
        caloriesBurned: 620,
        completedAt: new Date('2026-09-13T07:10:00.000Z'),
      },
    ]);

    await Workout.insertMany([
      {
        title: 'City Sprint Builder',
        focusArea: 'Cardio Power',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Warm-up jog', '6 x 400m sprint', 'Walking recovery', 'Cooldown stretch'],
        coachTip: 'Keep the first two rounds controlled so your closing pace stays sharp.',
      },
      {
        title: 'Desk Reset Strength',
        focusArea: 'Functional Strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Dead bugs', 'Band pull-aparts'],
        coachTip: 'Own each rep and stop one rep before your form breaks.',
      },
      {
        title: 'Engine Room Intervals',
        focusArea: 'Endurance',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Row 500m', 'Kettlebell swings', 'Box step-ups', 'Plank hold'],
        coachTip: 'Focus on breathing rhythm during the row to recover faster between rounds.',
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        points: 1480,
        rank: 1,
        weeklyChange: 2,
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        points: 1395,
        rank: 2,
        weeklyChange: -1,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        points: 1180,
        rank: 3,
        weeklyChange: 1,
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        points: 940,
        rank: 4,
        weeklyChange: 0,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
