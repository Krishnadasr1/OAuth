import express from 'express';
import { getUserById } from '../config/passport.js';

const router = express.Router();

function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Please log in to access this resource'
    });
  }
}

router.get('/profile', requireAuth, (req, res) => {
  const user = req.user;
  
  res.json({
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    },
    message: 'Profile retrieved successfully'
  });
});

router.get('/dashboard', requireAuth, (req, res) => {
  const user = req.user;
  
  const dashboardData = {
    user: {
      name: user.name,
      email: user.email,
      photo: user.photo
    },
    stats: {
      loginCount: Math.floor(Math.random() * 100) + 1,
      lastLogin: user.lastLogin,
      accountAge: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))
    },
    activities: [
      { action: 'Logged in', timestamp: new Date(), ip: req.ip },
      { action: 'Viewed profile', timestamp: new Date(Date.now() - 3600000), ip: req.ip },
      { action: 'Updated settings', timestamp: new Date(Date.now() - 7200000), ip: req.ip }
    ],
    notifications: [
      { type: 'info', message: 'Welcome to the OAuth tutorial!', read: false },
      { type: 'success', message: 'Your account is verified', read: true }
    ]
  };
  
  res.json({
    dashboard: dashboardData,
    message: 'Dashboard data retrieved successfully'
  });
});

router.put('/profile', requireAuth, (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim().length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Name is required'
    });
  }
  
  const user = getUserById(req.user.id);
  if (user) {
    user.name = name.trim();
    console.log('✅ Profile updated for user:', user.email);
  }
  
  res.json({
    message: 'Profile updated successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo
    }
  });
});

router.get('/users', requireAuth, (req, res) => {
  res.json({
    message: 'This is a protected route - you are authenticated!',
    note: 'In production, this would require admin permissions',
    userCount: 1, 
    currentUser: req.user.email
  });
});

export default router;