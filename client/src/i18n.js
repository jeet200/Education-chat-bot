import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.chat': 'AI Tutor',
      'nav.curriculum': 'Curriculum',
      'nav.progress': 'Progress',
      'nav.settings': 'Settings',
      
      // Dashboard
      'dashboard.welcome': 'Welcome to AI Education Assistant',
      'dashboard.subtitle': 'Your personalized learning companion',
      'dashboard.subjects': 'Subjects',
      'dashboard.progress': 'Progress',
      'dashboard.streaks': 'Learning Streaks',
      'dashboard.badges': 'Badges',
      
      // Chat
      'chat.title': 'AI Tutor',
      'chat.subtitle': 'Ask me anything about your studies',
      'chat.placeholder': 'Type your question here...',
      'chat.send': 'Send',
      'chat.thinking': 'Thinking...',
      'chat.error': 'Sorry, I encountered an error. Please try again.',
      
      // Subjects
      'subjects.math': 'Mathematics',
      'subjects.science': 'Science',
      'subjects.technology': 'Technology',
      
      // Progress
      'progress.topics_completed': 'Topics Completed',
      'progress.quizzes_taken': 'Quizzes Taken',
      'progress.current_streak': 'Current Streak',
      'progress.average_score': 'Average Score',
      'progress.level': 'Level',
      'progress.experience': 'Experience Points',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.retry': 'Retry',
      'common.close': 'Close',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.continue': 'Continue',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      
      // Quiz
      'quiz.title': 'Quiz',
      'quiz.question': 'Question',
      'quiz.submit': 'Submit Answer',
      'quiz.score': 'Score',
      'quiz.correct': 'Correct!',
      'quiz.incorrect': 'Incorrect',
      'quiz.explanation': 'Explanation',
      
      // Settings
      'settings.language': 'Language',
      'settings.theme': 'Theme',
      'settings.notifications': 'Notifications',
      'settings.profile': 'Profile',
      'settings.grade': 'Grade',
      'settings.subjects': 'Preferred Subjects',
      
      // Errors
      'error.network': 'Network error. Please check your connection.',
      'error.server': 'Server error. Please try again later.',
      'error.invalid_input': 'Invalid input. Please check your data.',
      'error.not_found': 'Resource not found.',
      'error.permission': 'Permission denied.',
      
      // Success messages
      'success.saved': 'Settings saved successfully!',
      'success.completed': 'Topic completed successfully!',
      'success.quiz_submitted': 'Quiz submitted successfully!',
      'success.profile_updated': 'Profile updated successfully!',
    }
  },
  
  hi: {
    translation: {
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.chat': 'AI शिक्षक',
      'nav.curriculum': 'पाठ्यक्रम',
      'nav.progress': 'प्रगति',
      'nav.settings': 'सेटिंग्स',
      
      // Dashboard
      'dashboard.welcome': 'AI शिक्षा सहायक में आपका स्वागत है',
      'dashboard.subtitle': 'आपका व्यक्तिगत शिक्षण साथी',
      'dashboard.subjects': 'विषय',
      'dashboard.progress': 'प्रगति',
      'dashboard.streaks': 'सिखने की लकीर',
      'dashboard.badges': 'बैज',
      
      // Chat
      'chat.title': 'AI शिक्षक',
      'chat.subtitle': 'अपनी पढ़ाई के बारे में मुझसे कुछ भी पूछें',
      'chat.placeholder': 'यहाँ अपना प्रश्न लिखें...',
      'chat.send': 'भेजें',
      'chat.thinking': 'सोच रहा हूं...',
      'chat.error': 'माफ़ करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।',
      
      // Subjects
      'subjects.math': 'गणित',
      'subjects.science': 'विज्ञान',
      'subjects.technology': 'तकनीक',
      
      // Progress
      'progress.topics_completed': 'पूरे किए गए विषय',
      'progress.quizzes_taken': 'लिए गए प्रश्नोत्तर',
      'progress.current_streak': 'वर्तमान स्ट्रीक',
      'progress.average_score': 'औसत स्कोर',
      'progress.level': 'स्तर',
      'progress.experience': 'अनुभव अंक',
      
      // Common
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'त्रुटि',
      'common.retry': 'पुनः प्रयास',
      'common.close': 'बंद करें',
      'common.save': 'सेव करें',
      'common.cancel': 'रद्द करें',
      'common.continue': 'जारी रखें',
      'common.back': 'वापस',
      'common.next': 'अगला',
      'common.previous': 'पिछला',
      
      // Quiz
      'quiz.title': 'प्रश्नोत्तर',
      'quiz.question': 'प्रश्न',
      'quiz.submit': 'उत्तर जमा करें',
      'quiz.score': 'स्कोर',
      'quiz.correct': 'सही!',
      'quiz.incorrect': 'गलत',
      'quiz.explanation': 'व्याख्या',
      
      // Settings
      'settings.language': 'भाषा',
      'settings.theme': 'थीम',
      'settings.notifications': 'सूचनाएं',
      'settings.profile': 'प्रोफाइल',
      'settings.grade': 'कक्षा',
      'settings.subjects': 'पसंदीदा विषय',
      
      // Errors
      'error.network': 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।',
      'error.server': 'सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें।',
      'error.invalid_input': 'अमान्य इनपुट। कृपया अपना डेटा जांचें।',
      'error.not_found': 'संसाधन नहीं मिला।',
      'error.permission': 'अनुमति नहीं।',
      
      // Success messages
      'success.saved': 'सेटिंग्स सफलतापूर्वक सहेजी गईं!',
      'success.completed': 'विषय सफलतापूर्वक पूरा किया गया!',
      'success.quiz_submitted': 'प्रश्नोत्तर सफलतापूर्वक जमा किया गया!',
      'success.profile_updated': 'प्रोफाइल सफलतापूर्वक अपडेट किया गया!',
    }
  },
  
  mr: {
    translation: {
      // Navigation
      'nav.dashboard': 'डॅशबोर्ड',
      'nav.chat': 'AI शिक्षक',
      'nav.curriculum': 'अभ्यासक्रम',
      'nav.progress': 'प्रगती',
      'nav.settings': 'सेटिंग्ज',
      
      // Dashboard
      'dashboard.welcome': 'AI शिक्षण सहाय्यकामध्ये आपले स्वागत आहे',
      'dashboard.subtitle': 'तुमचा वैयक्तिक शिक्षण साथी',
      'dashboard.subjects': 'विषय',
      'dashboard.progress': 'प्रगती',
      'dashboard.streaks': 'शिकण्याची पट्टी',
      'dashboard.badges': 'बॅजेस',
      
      // Chat
      'chat.title': 'AI शिक्षक',
      'chat.subtitle': 'तुमच्या अभ्यासाबद्दल मला काहीही विचारा',
      'chat.placeholder': 'तुमचा प्रश्न येथे टाका...',
      'chat.send': 'पाठवा',
      'chat.thinking': 'विचार करत आहे...',
      'chat.error': 'माफ करा, मला त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
      
      // Subjects
      'subjects.math': 'गणित',
      'subjects.science': 'विज्ञान',
      'subjects.technology': 'तंत्रज्ञान',
      
      // Progress
      'progress.topics_completed': 'पूर्ण झालेले विषय',
      'progress.quizzes_taken': 'घेतलेल्या प्रश्नमंजुषा',
      'progress.current_streak': 'सध्याची स्ट्रीक',
      'progress.average_score': 'सरासरी गुण',
      'progress.level': 'स्तर',
      'progress.experience': 'अनुभव गुण',
      
      // Common
      'common.loading': 'लोड होत आहे...',
      'common.error': 'त्रुटी',
      'common.retry': 'पुन्हा प्रयत्न करा',
      'common.close': 'बंद करा',
      'common.save': 'सेव्ह करा',
      'common.cancel': 'रद्द करा',
      'common.continue': 'सुरू ठेवा',
      'common.back': 'मागे',
      'common.next': 'पुढे',
      'common.previous': 'मागील',
      
      // Quiz
      'quiz.title': 'प्रश्नमंजुषा',
      'quiz.question': 'प्रश्न',
      'quiz.submit': 'उत्तर सबमिट करा',
      'quiz.score': 'गुण',
      'quiz.correct': 'बरोबर!',
      'quiz.incorrect': 'चुकीचे',
      'quiz.explanation': 'स्पष्टीकरण',
      
      // Settings
      'settings.language': 'भाषा',
      'settings.theme': 'थीम',
      'settings.notifications': 'सूचना',
      'settings.profile': 'प्रोफाइल',
      'settings.grade': 'इयत्ता',
      'settings.subjects': 'आवडते विषय',
      
      // Errors
      'error.network': 'नेटवर्क त्रुटी. कृपया तुमचे कनेक्शन तपासा.',
      'error.server': 'सर्व्हर त्रुटी. कृपया नंतर पुन्हा प्रयत्न करा.',
      'error.invalid_input': 'अवैध इनपुट. कृपया तुमचा डेटा तपासा.',
      'error.not_found': 'संसाधन सापडले नाही.',
      'error.permission': 'परवानगी नाही.',
      
      // Success messages
      'success.saved': 'सेटिंग्ज यशस्वीरित्या सेव्ह झाल्या!',
      'success.completed': 'विषय यशस्वीरित्या पूर्ण झाला!',
      'success.quiz_submitted': 'प्रश्नमंजुषा यशस्वीरित्या सबमिट झाली!',
      'success.profile_updated': 'प्रोफाइल यशस्वीरित्या अपडेट झाले!',
    }
  }
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n; 