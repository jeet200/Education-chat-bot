#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, 'server', '.env');

console.log('🎯 AI Education Assistant Setup');
console.log('================================');
console.log('');
console.log('This script will help you set up your Google Gemini API configuration.');
console.log('');

// Check if .env file already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists in server directory.');
  rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      setupEnvironment();
    } else {
      console.log('Setup cancelled.');
      rl.close();
    }
  });
} else {
  setupEnvironment();
}

function setupEnvironment() {
  console.log('');
  console.log('📋 Let\'s configure your environment variables:');
  console.log('');
  
  const questions = [
    {
      key: 'GEMINI_API_KEY',
      question: 'Enter your Google Gemini API key (get it from https://makersuite.google.com/app/apikey): ',
      required: true
    },
    {
      key: 'PORT',
      question: 'Server port (default: 5000): ',
      default: '5000'
    },
    {
      key: 'CLIENT_URL',
      question: 'Client URL (default: http://localhost:3000): ',
      default: 'http://localhost:3000'
    },
    {
      key: 'JWT_SECRET',
      question: 'JWT secret (press Enter for auto-generated): ',
      default: () => generateRandomSecret()
    },
    {
      key: 'NODE_ENV',
      question: 'Environment (development/production, default: development): ',
      default: 'development'
    }
  ];
  
  const envVars = {};
  
  function askQuestion(index) {
    if (index >= questions.length) {
      createEnvFile(envVars);
      return;
    }
    
    const q = questions[index];
    rl.question(q.question, (answer) => {
      if (answer.trim() === '') {
        if (q.required) {
          console.log('❌ This field is required. Please enter a value.');
          askQuestion(index);
          return;
        }
        answer = typeof q.default === 'function' ? q.default() : q.default;
      }
      
      envVars[q.key] = answer.trim();
      askQuestion(index + 1);
    });
  }
  
  askQuestion(0);
}

function createEnvFile(envVars) {
  const envContent = `# AI Education Assistant Environment Configuration
# Generated on ${new Date().toISOString()}

# Server Configuration
PORT=${envVars.PORT}
NODE_ENV=${envVars.NODE_ENV}
CLIENT_URL=${envVars.CLIENT_URL}

# Google Gemini API Configuration
GEMINI_API_KEY=${envVars.GEMINI_API_KEY}

# Database Configuration (optional)
# MONGODB_URI=mongodb://localhost:27017/ai-education-assistant

# JWT Configuration
JWT_SECRET=${envVars.JWT_SECRET}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads/

# Optional: Additional Google Services
# GOOGLE_CLOUD_PROJECT_ID=your_project_id
# GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
`;

  try {
    // Ensure server directory exists
    const serverDir = path.join(__dirname, 'server');
    if (!fs.existsSync(serverDir)) {
      fs.mkdirSync(serverDir, { recursive: true });
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('');
    console.log('✅ Environment configuration created successfully!');
    console.log('');
    console.log('📁 Created: server/.env');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('1. Install dependencies: npm run install-all');
    console.log('2. Start the development server: npm run dev');
    console.log('3. Open your browser to http://localhost:3000');
    console.log('');
    console.log('📚 For more information, check the README.md file');
    console.log('');
    console.log('🔗 Useful links:');
    console.log('- Get Gemini API key: https://makersuite.google.com/app/apikey');
    console.log('- Project documentation: README.md');
    console.log('- Server API docs: server/README.md');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
  
  rl.close();
}

function generateRandomSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n👋 Setup cancelled by user.');
  rl.close();
  process.exit(0);
});

rl.on('close', () => {
  console.log('');
  console.log('Thank you for using AI Education Assistant! 🎓');
  process.exit(0);
}); 