import { Router } from 'express';

import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboardEntry.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const router = Router();

router.get('/users', async (_request, response, next) => {
  try {
    const items = await User.find().sort({ name: 1 }).lean();

    response.json({
      resource: 'users',
      items,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    const items = await Team.find()
      .sort({ name: 1 })
      .populate('memberIds', 'name email fitnessLevel')
      .lean();

    response.json({
      resource: 'teams',
      items,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (_request, response, next) => {
  try {
    const items = await Activity.find()
      .sort({ completedAt: -1 })
      .populate('userId', 'name email')
      .populate('teamId', 'name city')
      .lean();

    response.json({
      resource: 'activities',
      items,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const entries = await LeaderboardEntry.find()
      .sort({ rank: 1 })
      .populate('userId', 'name fitnessLevel streakDays')
      .populate('teamId', 'name sportFocus')
      .lean();

    response.json({
      resource: 'leaderboard',
      entries,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (_request, response, next) => {
  try {
    const items = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();

    response.json({
      resource: 'workouts',
      items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;