import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const users = new Map();

export function configurePassport() {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      
      
      console.log('Google Profile:', {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value
      });

      
      let user = users.get(profile.id);
      
      if (!user) {
        
        user = {
          id: profile.id,
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          photo: profile.photos?.[0]?.value || '',
          createdAt: new Date(),
          lastLogin: new Date(),
          accessToken, 
        };
        users.set(profile.id, user);
        console.log('✅ New user created:', user.email);
      } else {
        
        user.lastLogin = new Date();
        user.accessToken = accessToken;
        console.log('✅ Existing user logged in:', user.email);
      }

      return done(null, user);
    } catch (error) {
      console.error('❌ Error in Google Strategy:', error);
      return done(error, null);
    }
  }));

  
  passport.serializeUser((user, done) => {
    console.log('🔄 Serializing user:', user.id);
    done(null, user.id);
  });

  
  passport.deserializeUser((id, done) => {
    console.log('🔄 Deserializing user:', id);
    const user = users.get(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'), null);
    }
  });
}


export function getAllUsers() {
  return Array.from(users.values());
}


export function getUserById(id) {
  return users.get(id);
}