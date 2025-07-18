# AI Education Assistant - Server

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-education-assistant
JWT_SECRET=your_jwt_secret_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads/
```

3. Get your Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key and add it to your `.env` file

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Chat API
- `POST /api/chat/message` - Send message to AI chatbot (powered by Gemini 1.5 Flash)
- `POST /api/chat/explain` - Get detailed explanation of a concept
- `POST /api/chat/quiz` - Generate quiz questions

### Translation API
- `POST /api/translate/detect` - Detect language of text (powered by Gemini 1.5 Flash)
- `POST /api/translate/translate` - Translate text between languages
- `POST /api/translate/content` - Get educational content in specific language
- `GET /api/translate/languages` - Get supported languages

### Curriculum API
- `GET /api/curriculum/overview` - Get curriculum overview
- `GET /api/curriculum/:subject/:grade/topics` - Get topics for subject and grade
- `GET /api/curriculum/:subject/:grade/topics/:topicId` - Get detailed topic info
- `GET /api/curriculum/search` - Search topics
- `GET /api/curriculum/learning-path/:subject/:grade` - Get learning path

### Progress API
- `GET /api/progress/user/:userId` - Get user progress
- `POST /api/progress/user/:userId/topic` - Update topic completion
- `POST /api/progress/user/:userId/quiz` - Record quiz results
- `GET /api/progress/user/:userId/subject/:subject` - Get subject progress
- `GET /api/progress/user/:userId/analytics` - Get learning analytics

### Users API
- `POST /api/users/profile` - Create/update user profile
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile/:userId` - Update user preferences

## Features

- ✅ AI-powered chatbot for educational queries (Google Gemini 1.5 Flash)
- ✅ Multilingual support (English, Hindi, Marathi, Spanish, French)
- ✅ Curriculum-based learning modules
- ✅ Progress tracking and analytics
- ✅ Quiz generation and scoring
- ✅ Badge system and streaks
- ✅ Learning path recommendations
- ✅ Real-time translation services

## AI Model Configuration

The server uses **Google Gemini 1.5 Flash** for all AI operations:

### Model Settings
- **Temperature**: 0.7 (for creative, conversational responses)
- **Top-K**: 40 (for balanced response diversity)
- **Top-P**: 0.9 (for coherent responses)
- **Max Tokens**: 500 (for concise educational content)

### Translation Settings
- **Temperature**: 0.1 (for accurate translations)
- **Top-K**: 20 (for precise language detection)
- **Top-P**: 0.8 (for consistent translations)

### Benefits of Gemini 1.5 Flash
- **Cost-effective**: More affordable than GPT-4
- **Fast response times**: Optimized for real-time interactions
- **Multilingual excellence**: Native support for multiple languages
- **Educational content**: Excellent at age-appropriate explanations
- **Large context window**: Better conversation memory

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/ai-education-assistant` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## Getting Started

1. **Get Gemini API Key**:
   ```bash
   # Visit Google AI Studio
   https://makersuite.google.com/app/apikey
   
   # Create new API key
   # Copy the key (starts with "AIza...")
   ```

2. **Set up environment**:
   ```bash
   # Create .env file
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   echo "PORT=5000" >> .env
   echo "NODE_ENV=development" >> .env
   echo "CLIENT_URL=http://localhost:3000" >> .env
   ```

3. **Install and run**:
   ```bash
   npm install
   npm run dev
   ```

## Testing the API

### Test Chat Endpoint
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain photosynthesis in simple terms",
    "language": "en"
  }'
```

### Test Translation Endpoint
```bash
curl -X POST http://localhost:5000/api/translate/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how are you?",
    "from": "en",
    "to": "hi"
  }'
```

### Test Educational Content
```bash
curl -X POST http://localhost:5000/api/translate/content \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "photosynthesis",
    "subject": "science",
    "grade": "6",
    "language": "hi"
  }'
``` 