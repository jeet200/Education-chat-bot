const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get Gemini model for translation
function getGeminiModel() {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.1,
      topK: 20,
      topP: 0.8,
      maxOutputTokens: 500,
    },
  });
}

// Supported languages
const SUPPORTED_LANGUAGES = {
  'en': 'English',
  'hi': 'Hindi',
  'mr': 'Marathi',
  'es': 'Spanish',
  'fr': 'French'
};

// Detect language of input text
router.post('/detect', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const prompt = `Identify the language of this text and respond with only the language code (en, hi, mr, es, fr, or 'unknown'). Do not include any other text or explanation.

Text: "${text}"

Language code:`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const detectedLanguage = response.text().trim().toLowerCase();
    
    res.json({
      language: detectedLanguage,
      languageName: SUPPORTED_LANGUAGES[detectedLanguage] || 'Unknown',
      confidence: detectedLanguage !== 'unknown' ? 0.9 : 0.1
    });

  } catch (error) {
    console.error('Language detection error:', error);
    res.status(500).json({ 
      error: 'Failed to detect language',
      message: 'Please try again later'
    });
  }
});

// Translate text between supported languages
router.post('/translate', async (req, res) => {
  try {
    const { text, from, to } = req.body;

    if (!text || !from || !to) {
      return res.status(400).json({ error: 'Text, from, and to languages are required' });
    }

    if (!SUPPORTED_LANGUAGES[from] || !SUPPORTED_LANGUAGES[to]) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    if (from === to) {
      return res.json({ translatedText: text, from, to });
    }

    const prompt = `Translate the following text from ${SUPPORTED_LANGUAGES[from]} to ${SUPPORTED_LANGUAGES[to]}. Provide only the translation without any additional text or explanation.

Text to translate: "${text}"

Translation:`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text().trim();

    res.json({
      translatedText,
      from,
      to,
      fromLanguage: SUPPORTED_LANGUAGES[from],
      toLanguage: SUPPORTED_LANGUAGES[to],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      error: 'Failed to translate text',
      message: 'Please try again later'
    });
  }
});

// Get educational content in specific language
router.post('/content', async (req, res) => {
  try {
    const { topic, subject, grade, language = 'en' } = req.body;

    if (!topic || !subject) {
      return res.status(400).json({ error: 'Topic and subject are required' });
    }

    const languageName = SUPPORTED_LANGUAGES[language] || 'English';
    
    const prompt = `Create educational content about "${topic}" in ${subject} for grade ${grade || '6-8'} students. 
    
    ${language !== 'en' ? `Write your response in ${languageName} language.` : ''}
    
    Include:
    1. Simple explanation suitable for the age group
    2. Real-world example that students can relate to
    3. Key concepts to remember
    4. A fun fact or interesting detail
    
    Keep it engaging, age-appropriate, and educational.`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    res.json({
      content,
      topic,
      subject,
      grade: grade || '6-8',
      language,
      languageName,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content',
      message: 'Please try again later'
    });
  }
});

// Get supported languages
router.get('/languages', (req, res) => {
  res.json({
    languages: Object.keys(SUPPORTED_LANGUAGES).map(code => ({
      code,
      name: SUPPORTED_LANGUAGES[code],
      nativeName: getNativeName(code)
    }))
  });
});

function getNativeName(code) {
  const nativeNames = {
    'en': 'English',
    'hi': 'हिंदी',
    'mr': 'मराठी',
    'es': 'Español',
    'fr': 'Français'
  };
  return nativeNames[code] || SUPPORTED_LANGUAGES[code];
}

module.exports = router; 