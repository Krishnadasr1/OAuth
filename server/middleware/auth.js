
export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Authentication required'
  });
}


export function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  
  return res.status(400).json({
    error: 'Already Authenticated',
    message: 'You are already logged in'
  });
}


const loginAttempts = new Map();

export function rateLimitAuth(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; 
  const maxAttempts = 5;
  
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return next();
  }
  
  const attempts = loginAttempts.get(ip);
  
  
  if (now - attempts.firstAttempt > windowMs) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return next();
  }
  
  
  if (attempts.count >= maxAttempts) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Too many login attempts. Please try again later.'
    });
  }
  
  attempts.count++;
  next();
}

export function corsForAuth(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}