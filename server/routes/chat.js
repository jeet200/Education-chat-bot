const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Educational system prompt for grades 6-8
const SYSTEM_PROMPT = `You are an AI education assistant designed to help students in grades 6-8 (ages 11-14) with STEM subjects. Your primary goals are:

1. Explain concepts in simple, age-appropriate language
2. Use examples and analogies that students can relate to
3. Be encouraging and patient
4. Break down complex topics into digestible steps
5. Provide visual descriptions when helpful
6. Focus on core curriculum topics: Math, Science, Technology basics

Guidelines:
- Keep explanations simple but accurate
- Use everyday examples (sports, food, games, etc.)
- Ask follow-up questions to check understanding
- Offer additional help or practice questions
- Be culturally sensitive and inclusive
- If asked about non-educational topics, gently redirect to learning

Subjects you can help with:
- Mathematics: Basic algebra, geometry, fractions, decimals, percentages
- Science: Basic physics, chemistry, biology, earth science
- Technology: Basic computer concepts, simple programming

Always respond in a friendly, encouraging tone and adapt your language to the student's level of understanding.`;

// Get Gemini model
function getGeminiModel() {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.9,
      maxOutputTokens: 500,
    },
  });
}

// Chat with AI assistant
router.post('/message', async (req, res) => {
  try {
    const { message, language = 'en', conversationHistory = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation context
    let fullPrompt = SYSTEM_PROMPT + '\n\n';
    
    // Add language-specific instruction if not English
    if (language !== 'en') {
      const languageNames = {
        'hi': 'Hindi',
        'mr': 'Marathi',
        'es': 'Spanish',
        'fr': 'French'
      };
      
      const languageName = languageNames[language] || 'the requested language';
      fullPrompt += `Please respond in ${languageName}. If you don't know the language well, respond in English and mention that translation services are available.\n\n`;
    }

    // Add conversation history
    if (conversationHistory.length > 0) {
      fullPrompt += 'Previous conversation:\n';
      conversationHistory.forEach(msg => {
        fullPrompt += `${msg.role === 'user' ? 'Student' : 'AI'}: ${msg.content}\n`;
      });
      fullPrompt += '\n';
    }

    // Add current message
    fullPrompt += `Student: ${message}\nAI: `;

    const model = getGeminiModel();
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiResponse = response.text();

    // Determine if this is a concept that could benefit from visual aids
    const needsVisual = /diagram|picture|image|show|draw|visual|chart|graph/.test(message.toLowerCase());

    res.json({
      response: aiResponse,
      needsVisual,
      conversationId: req.body.conversationId || generateConversationId(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      message: 'Please try again later'
    });
  }
});

// Generate concept explanations with examples
router.post('/explain', async (req, res) => {
  try {
    const { concept, grade, subject, language = 'en' } = req.body;

    if (!concept || !subject) {
      return res.status(400).json({ error: 'Concept and subject are required' });
    }

    const gradeLevel = grade || '6-8';
    
    let explanationPrompt = SYSTEM_PROMPT + '\n\n';
    
    // Add language instruction if needed
    if (language !== 'en') {
      const languageNames = {
        'hi': 'Hindi',
        'mr': 'Marathi',
        'es': 'Spanish',
        'fr': 'French'
      };
      
      const languageName = languageNames[language] || 'the requested language';
      explanationPrompt += `Please respond in ${languageName}.\n\n`;
    }

    explanationPrompt += `Explain the concept of "${concept}" in ${subject} for grade ${gradeLevel} students. Include:
    1. Simple definition
    2. Real-world example
    3. Key points to remember
    4. A simple practice question
    
    Keep it engaging and age-appropriate.`;

    const model = getGeminiModel();
    const result = await model.generateContent(explanationPrompt);
    const response = await result.response;
    const explanation = response.text();

    res.json({
      explanation,
      concept,
      subject,
      grade: gradeLevel,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Explanation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate explanation',
      message: 'Please try again later'
    });
  }
});

// Generate quiz questions
router.post('/quiz', async (req, res) => {
  try {
    const { topic, subject, grade = '6-8', questionCount = 3 } = req.body;

    if (!topic || !subject) {
      return res.status(400).json({ error: 'Topic and subject are required' });
    }

    const quizPrompt = SYSTEM_PROMPT + '\n\n' + `Generate ${questionCount} multiple choice questions about "${topic}" in ${subject} for grade ${grade} students. 
    
    Format each question as:
    Question: [question text]
    A) [option A]
    B) [option B]
    C) [option C]
    D) [option D]
    Correct Answer: [A/B/C/D]
    Explanation: [brief explanation]
    
    Make questions age-appropriate and test understanding of key concepts.`;

    const model = getGeminiModel();
    const result = await model.generateContent(quizPrompt);
    const response = await result.response;
    const questions = response.text();

    res.json({
      questions,
      topic,
      subject,
      grade,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      message: 'Please try again later'
    });
  }
});

function generateConversationId() {
  return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router; 