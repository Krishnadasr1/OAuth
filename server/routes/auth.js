import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('✅ OAuth callback successful for user:', req.user.email);
    
    
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}?auth=success`);
  }
);

router.post('/logout', (req, res) => {
  const userEmail = req.user?.email || 'Unknown';
  
  req.logout((err) => {
    if (err) {
      console.error('❌ Error during logout:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    
    console.log('👋 User logged out:', userEmail);
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user info
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    
    const userInfo = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      photo: req.user.photo,
      lastLogin: req.user.lastLogin,
      createdAt: req.user.createdAt
    };
    
    res.json({
      authenticated: true,
      user: userInfo
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});


router.get('/status', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    sessionID: req.sessionID,
    timestamp: new Date().toISOString()
  });
});

export default router;