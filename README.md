# Node.js Express OAuth Tutorial

A comprehensive tutorial implementation of OAuth 2.0 authentication using Node.js, Express, and Google OAuth.

## Features

- **OAuth 2.0 with Google**: Complete Google OAuth implementation
- **Session Management**: Secure session handling with express-session
- **Protected Routes**: Middleware-based route protection
- **User Profile Management**: Complete user profile system
- **Security Features**: CORS, Helmet, rate limiting
- **Modern Frontend**: React with TypeScript and Tailwind CSS

## Getting Started

### Prerequisites

1. Node.js (v16 or later)
2. Google OAuth credentials

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3001/auth/google/callback`

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Google OAuth credentials to `.env`:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   SESSION_SECRET=your_super_secret_session_key_here
   ```

### Running the Application

1. Start the server:
   ```bash
   npm run dev
   ```

2. The server will run on `http://localhost:3001`
3. The frontend will be available at `http://localhost:5173`

## Project Structure

```
├── server/
│   ├── index.js              # Main Express server
│   ├── config/
│   │   └── passport.js       # Passport.js configuration
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── api.js           # Protected API routes
│   └── middleware/
│       └── auth.js          # Authentication middleware
├── src/
│   ├── App.tsx              # React frontend
│   └── main.tsx             # React entry point
└── .env.example             # Environment variables template
```

## API Endpoints

### Authentication Routes
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - OAuth callback
- `POST /auth/logout` - Logout user
- `GET /auth/user` - Get current user info
- `GET /auth/status` - Check authentication status

### Protected API Routes
- `GET /api/profile` - Get user profile
- `GET /api/dashboard` - Get dashboard data
- `PUT /api/profile` - Update user profile
- `GET /api/users` - Get users (admin/testing)

### System Routes
- `GET /health` - Health check
- `GET /` - API documentation

## Security Features

- **CORS Configuration**: Properly configured for frontend
- **Helmet**: Security headers
- **Session Security**: Secure session configuration
- **Rate Limiting**: Basic rate limiting for auth routes
- **Input Validation**: Request validation and sanitization

## Tutorial Highlights

This implementation demonstrates:

1. **OAuth 2.0 Flow**: Complete Google OAuth integration
2. **Session Management**: Secure session handling
3. **Middleware Patterns**: Authentication and authorization middleware
4. **Error Handling**: Comprehensive error handling
5. **Security Best Practices**: CORS, CSRF protection, secure sessions
6. **Modern Architecture**: Clean, modular code structure

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Required |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Required |
| `SESSION_SECRET` | Session encryption secret | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `CLIENT_URL` | Frontend URL | http://localhost:5173 |

## Production Considerations

For production deployment:

1. Use a proper database instead of in-memory storage
2. Set up Redis for session storage
3. Configure proper HTTPS
4. Set up proper logging and monitoring
5. Use environment-specific configurations
6. Implement proper error tracking
7. Set up automated backups

## Learning Resources

- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)

## License

This project is for educational purposes. Feel free to use and modify as needed.