#!/usr/bin/env node

const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server', '.env') });

async function testGeminiAPI() {
  console.log('🧪 Testing Google Gemini API Integration');
  console.log('=======================================');
  console.log('');

  // Check if API key is configured
  if (!process.env.GEMINI_API_KEY) {
    console.log('❌ GEMINI_API_KEY not found in server/.env file');
    console.log('');
    console.log('Please run: npm run setup');
    console.log('Or manually create server/.env with your Gemini API key');
    console.log('');
    console.log('Get your API key from: https://makersuite.google.com/app/apikey');
    process.exit(1);
  }

  try {
    console.log('🔑 API Key found, initializing Gemini...');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 200,
      },
    });

    console.log('✅ Gemini initialized successfully');
    console.log('');
    console.log('🎓 Testing educational content generation...');
    
    // Test 1: Basic educational explanation
    const prompt1 = `You are an AI education assistant for students in grades 6-8. 
    Explain photosynthesis in simple terms that a 12-year-old can understand. 
    Keep it brief and engaging.`;
    
    console.log('📝 Generating explanation of photosynthesis...');
    const result1 = await model.generateContent(prompt1);
    const response1 = await result1.response;
    const text1 = response1.text();
    
    console.log('');
    console.log('📚 Gemini Response:');
    console.log('-------------------');
    console.log(text1);
    console.log('');
    
    // Test 2: Multilingual support
    console.log('🌍 Testing multilingual support (Hindi)...');
    const prompt2 = `Explain "What is gravity?" in Hindi language for grade 6 students. Keep it simple and engaging.`;
    
    const result2 = await model.generateContent(prompt2);
    const response2 = await result2.response;
    const text2 = response2.text();
    
    console.log('');
    console.log('🇮🇳 Hindi Response:');
    console.log('-------------------');
    console.log(text2);
    console.log('');
    
    // Test 3: Quiz generation
    console.log('❓ Testing quiz generation...');
    const prompt3 = `Generate 1 multiple choice question about basic fractions for grade 6 students.
    
    Format:
    Question: [question text]
    A) [option A]
    B) [option B]
    C) [option C]
    D) [option D]
    Correct Answer: [A/B/C/D]
    Explanation: [brief explanation]`;
    
    const result3 = await model.generateContent(prompt3);
    const response3 = await result3.response;
    const text3 = response3.text();
    
    console.log('');
    console.log('📝 Quiz Question:');
    console.log('------------------');
    console.log(text3);
    console.log('');
    
    // Test 4: Translation test
    console.log('🔄 Testing translation capability...');
    const prompt4 = `Translate "Hello, how are you?" from English to Hindi. Provide only the translation.`;
    
    const result4 = await model.generateContent(prompt4);
    const response4 = await result4.response;
    const text4 = response4.text();
    
    console.log('');
    console.log('🔄 Translation:');
    console.log('---------------');
    console.log(`English: "Hello, how are you?"`);
    console.log(`Hindi: ${text4.trim()}`);
    console.log('');
    
    // Success summary
    console.log('🎉 All tests passed successfully!');
    console.log('');
    console.log('✅ Gemini API is working correctly');
    console.log('✅ Educational content generation: Working');
    console.log('✅ Multilingual support: Working');
    console.log('✅ Quiz generation: Working');
    console.log('✅ Translation: Working');
    console.log('');
    console.log('🚀 Your AI Education Assistant is ready to use!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Install dependencies: npm run install-all');
    console.log('2. Start the server: npm run dev');
    console.log('3. Open http://localhost:3000 in your browser');
    console.log('');
    
  } catch (error) {
    console.log('❌ Error testing Gemini API:');
    console.log('');
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('🔑 Invalid API key. Please check your Gemini API key.');
      console.log('');
      console.log('Steps to fix:');
      console.log('1. Go to https://makersuite.google.com/app/apikey');
      console.log('2. Create or regenerate your API key');
      console.log('3. Run: npm run setup');
      console.log('4. Enter your new API key');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.log('🚫 Permission denied. Your API key may not have access to Gemini.');
      console.log('');
      console.log('Steps to fix:');
      console.log('1. Check if your API key has Gemini API access');
      console.log('2. Enable Gemini API in Google Cloud Console');
      console.log('3. Wait a few minutes and try again');
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      console.log('📊 API quota exceeded. You may have reached your usage limit.');
      console.log('');
      console.log('Steps to fix:');
      console.log('1. Check your API usage in Google Cloud Console');
      console.log('2. Wait for quota to reset or upgrade your plan');
    } else {
      console.log('Error details:', error.message);
      console.log('');
      console.log('Common solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your API key is correct');
      console.log('3. Try running the test again in a few minutes');
    }
    
    console.log('');
    console.log('For more help, check:');
    console.log('- README.md file');
    console.log('- https://makersuite.google.com/app/apikey');
    console.log('- https://ai.google.dev/docs');
    
    process.exit(1);
  }
}

// Run the test
testGeminiAPI(); 