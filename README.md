# 🎯 AI-Powered Education Assistant for Inclusive & Equitable Learning

> **Goal**: Align with SDG 4 – Quality Education for All

A comprehensive AI-powered educational platform designed to provide personalized learning experiences for students in grades 6-8, featuring multilingual support, interactive AI tutoring, and progress tracking.

## 🚀 Features

### ✅ Core Features (Implemented)
- **AI Chatbot Tutor** - Interactive learning Q&A with Google Gemini 1.5 Flash
- **Multilingual Support** - English, Hindi, Marathi, Spanish, and French
- **Curriculum-Based Learning** - Structured content for Math, Science, and Technology
- **Progress Tracking** - Comprehensive analytics with badges and streaks
- **Quiz Generation** - AI-powered assessments with instant feedback
- **Personalized Learning Paths** - Adaptive content based on grade and difficulty
- **Modern UI/UX** - Accessible, responsive design with dark/light themes
- **Real-time Translation** - On-demand language translation for content

### 🔧 Technical Architecture

**Backend (Node.js/Express)**
- RESTful API with comprehensive endpoints
- Google Gemini 1.5 Flash integration for AI tutoring
- In-memory data storage (demo) - can be extended to MongoDB
- Rate limiting and security middleware
- Comprehensive error handling

**Frontend (React)**
- Modern React 18 with hooks
- Styled-components for theming
- Framer Motion for animations
- Responsive design with mobile-first approach
- PWA capabilities for offline access

## 📋 Project Structure

```
ai-education-assistant/
├── server/                 # Backend API
│   ├── routes/            # API routes
│   │   ├── chat.js       # AI chatbot endpoints (Gemini 1.5 Flash)
│   │   ├── curriculum.js # Learning content
│   │   ├── progress.js   # Progress tracking
│   │   ├── translate.js  # Language services (Gemini 1.5 Flash)
│   │   └── users.js      # User management
│   ├── index.js          # Main server file
│   └── package.json      # Server dependencies
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── styles/       # Themes and global styles
│   │   ├── context/      # React context
│   │   ├── api/          # API client
│   │   └── App.js        # Main app component
│   └── package.json      # Client dependencies
├── package.json          # Root package.json
└── README.md            # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install-all
```

### 2. Environment Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-education-assistant
JWT_SECRET=your_jwt_secret_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your `.env` file

### 4. Start the Application

```bash
# Start both server and client concurrently
npm run dev

# Or start individually:
npm run server  # Backend only
npm run client  # Frontend only
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎨 Usage Examples

### AI Chatbot Interaction
```javascript
// Example chat with AI tutor powered by Gemini 1.5 Flash
POST /api/chat/message
{
  "message": "Explain photosynthesis in simple terms",
  "language": "en",
  "conversationHistory": []
}
```

### Multilingual Learning
```javascript
// Get content in Hindi using Gemini translation
POST /api/translate/content
{
  "topic": "photosynthesis",
  "subject": "science",
  "grade": "6",
  "language": "hi"
}
```

### Progress Tracking
```javascript
// Update student progress
POST /api/progress/user/student123/topic
{
  "subject": "science",
  "grade": 6,
  "topicId": "photosynthesis",
  "topicName": "Photosynthesis",
  "timeSpent": 45,
  "difficulty": "beginner"
}
```

## 📚 API Documentation

### Core Endpoints

#### Chat API (Powered by Gemini 1.5 Flash)
- `POST /api/chat/message` - Send message to AI chatbot
- `POST /api/chat/explain` - Get detailed concept explanation
- `POST /api/chat/quiz` - Generate quiz questions

#### Curriculum API
- `GET /api/curriculum/overview` - Get curriculum overview
- `GET /api/curriculum/:subject/:grade/topics` - Get topics for subject/grade
- `GET /api/curriculum/search` - Search topics

#### Progress API
- `GET /api/progress/user/:userId` - Get user progress
- `POST /api/progress/user/:userId/topic` - Update topic completion
- `POST /api/progress/user/:userId/quiz` - Record quiz results

#### Translation API (Powered by Gemini 1.5 Flash)
- `POST /api/translate/detect` - Detect language
- `POST /api/translate/translate` - Translate text
- `GET /api/translate/languages` - Get supported languages

## 🌟 Key Features Explained

### 1. AI-Powered Tutoring (Google Gemini 1.5 Flash)
- **Smart Responses**: Uses Gemini 1.5 Flash for age-appropriate explanations
- **Cost-Effective**: More affordable than GPT-4 alternatives
- **Fast Performance**: Optimized for real-time educational interactions
- **Context Awareness**: Maintains conversation history
- **Subject Focus**: Specialized in STEM subjects for grades 6-8
- **Visual Indicators**: Suggests when visual aids would be helpful

### 2. Multilingual Support (Gemini-Powered)
- **Language Detection**: Automatic detection using Gemini AI
- **Real-time Translation**: On-demand content translation
- **Native Language Names**: Proper display of language names
- **Cultural Sensitivity**: Culturally appropriate examples and explanations
- **5 Languages**: English, Hindi, Marathi, Spanish, French

### 3. Curriculum Structure
- **Grade-based Organization**: Content organized by grades 6-8
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Learning Objectives**: Clear goals for each topic
- **Prerequisites**: Suggested prior knowledge

### 4. Progress Tracking
- **Comprehensive Analytics**: Study time, completion rates, performance
- **Gamification**: Badges, streaks, experience points, leveling
- **Recommendations**: Personalized learning suggestions
- **Visual Progress**: Charts and graphs for easy understanding

## 🎯 Educational Impact

### Alignment with SDG 4 Goals
- **Quality Education**: AI-powered personalized learning with Gemini 1.5 Flash
- **Inclusive Learning**: Multilingual support for diverse learners
- **Equitable Access**: Offline-friendly design for limited connectivity
- **Lifelong Learning**: Foundation for continuous education

### Target Audience
- **Primary**: Students in grades 6-8 (ages 11-14)
- **Secondary**: Teachers and educators
- **Geographic**: Initially focused on multilingual regions (India, but expandable)

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Voice-to-text integration (Google Speech-to-Text)
- [ ] Database persistence (MongoDB)
- [ ] Advanced analytics dashboard
- [ ] Teacher portal and classroom management
- [ ] Mobile app (React Native)

### Phase 3 Features
- [ ] Collaborative learning features
- [ ] Video content integration
- [ ] Advanced AI tutoring with image recognition
- [ ] Integration with school management systems
- [ ] Parent/guardian dashboard

## 🧪 Testing

### Manual Testing
1. Start the application
2. Test AI chatbot responses with Gemini
3. Verify multilingual functionality
4. Check progress tracking
5. Test quiz generation

### API Testing Examples

```bash
# Test Gemini-powered chat
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What is photosynthesis?", "language": "en"}'

# Test Gemini translation
curl -X POST http://localhost:5000/api/translate/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "from": "en", "to": "hi"}'
```

## 🤝 Contributing

### Development Guidelines
1. Follow the existing code structure
2. Add proper error handling
3. Include comprehensive comments
4. Test multilingual functionality
5. Ensure accessibility compliance

### Contribution Areas
- **Content**: Educational content for different subjects
- **Languages**: Additional language support
- **Features**: New learning features
- **Bug fixes**: Performance and functionality improvements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For questions, issues, or contributions:
- Create an issue in the repository
- Check the API documentation
- Review the code comments

## 📊 Project Status

**Current Status**: MVP Development Complete with Gemini 1.5 Flash
- ✅ Core backend infrastructure
- ✅ AI chatbot integration (Gemini 1.5 Flash)
- ✅ Multilingual support (Gemini-powered)
- ✅ Progress tracking system
- ✅ Modern frontend foundation
- ✅ Translation services (Gemini-powered)
- 🔄 UI components (in progress)
- ⏳ Testing and deployment

**Next Steps**:
1. Complete frontend components
2. Implement PWA features
3. Add comprehensive testing
4. Deploy to production
5. Pilot with educational institutions

## 🌟 Why Google Gemini 1.5 Flash?

- **Cost-Effective**: Significantly more affordable than GPT-4
- **Educational Focus**: Excellent at creating age-appropriate content
- **Multilingual Excellence**: Native support for multiple languages
- **Fast Response Times**: Optimized for real-time interactions
- **Large Context Window**: Better conversation memory
- **Google Integration**: Seamless integration with Google services

---

*Built with ❤️ for quality education and SDG 4 alignment using Google Gemini 1.5 Flash*