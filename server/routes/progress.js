const express = require('express');
const router = express.Router();

// In-memory storage for demo purposes
// In production, this would be a database
let progressData = {};

// Get user's overall progress
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  if (!progressData[userId]) {
    progressData[userId] = {
      userId,
      totalTopicsCompleted: 0,
      totalQuizzesTaken: 0,
      currentStreak: 0,
      longestStreak: 0,
      averageQuizScore: 0,
      subjects: {},
      recentActivity: [],
      badges: [],
      level: 1,
      experiencePoints: 0,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
  }

  const userProgress = progressData[userId];

  res.json({
    progress: {
      ...userProgress,
      progressPercentage: calculateOverallProgress(userProgress),
      nextLevelRequirement: calculateNextLevelRequirement(userProgress.level)
    },
    timestamp: new Date().toISOString()
  });
});

// Update progress when user completes a topic
router.post('/user/:userId/topic', (req, res) => {
  const { userId } = req.params;
  const { subject, grade, topicId, topicName, timeSpent, difficulty } = req.body;

  if (!progressData[userId]) {
    progressData[userId] = createNewUserProgress(userId);
  }

  const userProgress = progressData[userId];
  const gradeKey = `grade${grade}`;
  
  // Initialize subject and grade if not exists
  if (!userProgress.subjects[subject]) {
    userProgress.subjects[subject] = {};
  }
  if (!userProgress.subjects[subject][gradeKey]) {
    userProgress.subjects[subject][gradeKey] = {
      completedTopics: [],
      totalTimeSpent: 0,
      averageScore: 0,
      topicsCount: 0
    };
  }

  const gradeProgress = userProgress.subjects[subject][gradeKey];
  
  // Check if topic is already completed
  const existingTopic = gradeProgress.completedTopics.find(t => t.topicId === topicId);
  
  if (!existingTopic) {
    // Add new completed topic
    gradeProgress.completedTopics.push({
      topicId,
      topicName,
      difficulty,
      completedAt: new Date().toISOString(),
      timeSpent: timeSpent || 0
    });
    
    userProgress.totalTopicsCompleted++;
    
    // Award experience points based on difficulty
    const experiencePoints = {
      'beginner': 10,
      'intermediate': 15,
      'advanced': 20
    };
    
    userProgress.experiencePoints += experiencePoints[difficulty] || 10;
    
    // Update level
    userProgress.level = calculateLevel(userProgress.experiencePoints);
    
    // Update streak
    updateStreak(userProgress);
    
    // Check for badges
    checkAndAwardBadges(userProgress);
  }
  
  gradeProgress.totalTimeSpent += timeSpent || 0;
  userProgress.lastActive = new Date().toISOString();
  
  // Add to recent activity
  userProgress.recentActivity.unshift({
    type: 'topic_completed',
    subject,
    grade,
    topicId,
    topicName,
    difficulty,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 10 activities
  userProgress.recentActivity = userProgress.recentActivity.slice(0, 10);

  res.json({
    success: true,
    progress: userProgress,
    newBadges: userProgress.badges.filter(b => 
      new Date() - new Date(b.awardedAt) < 5000
    ),
    timestamp: new Date().toISOString()
  });
});

// Record quiz results
router.post('/user/:userId/quiz', (req, res) => {
  const { userId } = req.params;
  const { subject, grade, topicId, topicName, score, totalQuestions, timeSpent } = req.body;

  if (!progressData[userId]) {
    progressData[userId] = createNewUserProgress(userId);
  }

  const userProgress = progressData[userId];
  const gradeKey = `grade${grade}`;
  
  // Initialize subject and grade if not exists
  if (!userProgress.subjects[subject]) {
    userProgress.subjects[subject] = {};
  }
  if (!userProgress.subjects[subject][gradeKey]) {
    userProgress.subjects[subject][gradeKey] = {
      completedTopics: [],
      totalTimeSpent: 0,
      averageScore: 0,
      topicsCount: 0,
      quizzes: []
    };
  }

  const gradeProgress = userProgress.subjects[subject][gradeKey];
  
  // Add quiz result
  if (!gradeProgress.quizzes) {
    gradeProgress.quizzes = [];
  }
  
  gradeProgress.quizzes.push({
    topicId,
    topicName,
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    timeSpent: timeSpent || 0,
    takenAt: new Date().toISOString()
  });
  
  userProgress.totalQuizzesTaken++;
  
  // Update average quiz score
  const allQuizzes = Object.values(userProgress.subjects).flatMap(subject => 
    Object.values(subject).flatMap(grade => grade.quizzes || [])
  );
  
  userProgress.averageQuizScore = allQuizzes.reduce((sum, quiz) => 
    sum + quiz.percentage, 0) / allQuizzes.length;
  
  // Award experience points for quiz
  const percentage = Math.round((score / totalQuestions) * 100);
  let experiencePoints = 5; // Base points for taking quiz
  
  if (percentage >= 80) experiencePoints += 10;
  else if (percentage >= 60) experiencePoints += 5;
  
  userProgress.experiencePoints += experiencePoints;
  userProgress.level = calculateLevel(userProgress.experiencePoints);
  
  // Update streak if quiz score is good
  if (percentage >= 60) {
    updateStreak(userProgress);
  }
  
  userProgress.lastActive = new Date().toISOString();
  
  // Add to recent activity
  userProgress.recentActivity.unshift({
    type: 'quiz_completed',
    subject,
    grade,
    topicId,
    topicName,
    score,
    totalQuestions,
    percentage,
    timestamp: new Date().toISOString()
  });
  
  userProgress.recentActivity = userProgress.recentActivity.slice(0, 10);
  
  checkAndAwardBadges(userProgress);

  res.json({
    success: true,
    progress: userProgress,
    quizResult: {
      score,
      totalQuestions,
      percentage,
      experienceEarned: experiencePoints
    },
    timestamp: new Date().toISOString()
  });
});

// Get subject-specific progress
router.get('/user/:userId/subject/:subject', (req, res) => {
  const { userId, subject } = req.params;

  if (!progressData[userId] || !progressData[userId].subjects[subject]) {
    return res.json({
      subject,
      progress: {
        grades: {},
        totalTopicsCompleted: 0,
        totalTimeSpent: 0,
        averageScore: 0
      },
      timestamp: new Date().toISOString()
    });
  }

  const subjectProgress = progressData[userId].subjects[subject];
  
  const summary = {
    subject,
    progress: {
      grades: subjectProgress,
      totalTopicsCompleted: Object.values(subjectProgress).reduce((sum, grade) => 
        sum + (grade.completedTopics?.length || 0), 0),
      totalTimeSpent: Object.values(subjectProgress).reduce((sum, grade) => 
        sum + (grade.totalTimeSpent || 0), 0),
      averageScore: calculateSubjectAverageScore(subjectProgress),
      recentQuizzes: getRecentQuizzes(subjectProgress, 5)
    },
    timestamp: new Date().toISOString()
  };

  res.json(summary);
});

// Get learning analytics
router.get('/user/:userId/analytics', (req, res) => {
  const { userId } = req.params;

  if (!progressData[userId]) {
    return res.json({
      analytics: {
        studyTime: [],
        topicCompletion: [],
        quizPerformance: [],
        streakData: [],
        recommendations: []
      },
      timestamp: new Date().toISOString()
    });
  }

  const userProgress = progressData[userId];
  
  const analytics = {
    studyTime: generateStudyTimeAnalytics(userProgress),
    topicCompletion: generateTopicCompletionAnalytics(userProgress),
    quizPerformance: generateQuizPerformanceAnalytics(userProgress),
    streakData: generateStreakAnalytics(userProgress),
    recommendations: generateRecommendations(userProgress)
  };

  res.json({
    analytics,
    timestamp: new Date().toISOString()
  });
});

// Helper functions
function createNewUserProgress(userId) {
  return {
    userId,
    totalTopicsCompleted: 0,
    totalQuizzesTaken: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageQuizScore: 0,
    subjects: {},
    recentActivity: [],
    badges: [],
    level: 1,
    experiencePoints: 0,
    lastStreakUpdate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString()
  };
}

function calculateLevel(experiencePoints) {
  return Math.floor(experiencePoints / 100) + 1;
}

function calculateNextLevelRequirement(level) {
  return level * 100;
}

function calculateOverallProgress(userProgress) {
  const totalPossibleTopics = 45; // 15 topics × 3 subjects
  return Math.round((userProgress.totalTopicsCompleted / totalPossibleTopics) * 100);
}

function updateStreak(userProgress) {
  const today = new Date().toDateString();
  const lastUpdate = new Date(userProgress.lastStreakUpdate).toDateString();
  
  if (today === lastUpdate) {
    // Already updated today
    return;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastUpdate === yesterday.toDateString()) {
    // Consecutive day
    userProgress.currentStreak++;
  } else {
    // Streak broken
    userProgress.currentStreak = 1;
  }
  
  userProgress.longestStreak = Math.max(userProgress.longestStreak, userProgress.currentStreak);
  userProgress.lastStreakUpdate = new Date().toISOString();
}

function checkAndAwardBadges(userProgress) {
  const badges = [];
  
  // First topic badge
  if (userProgress.totalTopicsCompleted === 1) {
    badges.push({
      id: 'first_topic',
      name: 'First Steps',
      description: 'Completed your first topic!',
      icon: '🎯',
      awardedAt: new Date().toISOString()
    });
  }
  
  // Streak badges
  if (userProgress.currentStreak === 3) {
    badges.push({
      id: 'streak_3',
      name: 'On Fire!',
      description: '3-day learning streak',
      icon: '🔥',
      awardedAt: new Date().toISOString()
    });
  }
  
  if (userProgress.currentStreak === 7) {
    badges.push({
      id: 'streak_7',
      name: 'Weekly Warrior',
      description: '7-day learning streak',
      icon: '⚡',
      awardedAt: new Date().toISOString()
    });
  }
  
  // Topic completion badges
  if (userProgress.totalTopicsCompleted === 10) {
    badges.push({
      id: 'topics_10',
      name: 'Knowledge Seeker',
      description: 'Completed 10 topics',
      icon: '📚',
      awardedAt: new Date().toISOString()
    });
  }
  
  // Quiz performance badges
  if (userProgress.averageQuizScore >= 80) {
    badges.push({
      id: 'quiz_master',
      name: 'Quiz Master',
      description: 'Maintaining 80%+ average in quizzes',
      icon: '🏆',
      awardedAt: new Date().toISOString()
    });
  }
  
  // Add new badges to user's collection
  badges.forEach(badge => {
    const existingBadge = userProgress.badges.find(b => b.id === badge.id);
    if (!existingBadge) {
      userProgress.badges.push(badge);
    }
  });
}

function calculateSubjectAverageScore(subjectProgress) {
  const allQuizzes = Object.values(subjectProgress).flatMap(grade => grade.quizzes || []);
  if (allQuizzes.length === 0) return 0;
  
  return allQuizzes.reduce((sum, quiz) => sum + quiz.percentage, 0) / allQuizzes.length;
}

function getRecentQuizzes(subjectProgress, count) {
  const allQuizzes = Object.values(subjectProgress).flatMap(grade => grade.quizzes || []);
  return allQuizzes
    .sort((a, b) => new Date(b.takenAt) - new Date(a.takenAt))
    .slice(0, count);
}

function generateStudyTimeAnalytics(userProgress) {
  const last7Days = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // This would typically query database for actual study time
    // For demo, generating sample data
    last7Days.push({
      date: date.toISOString().split('T')[0],
      minutes: Math.floor(Math.random() * 60) + 30
    });
  }
  
  return last7Days;
}

function generateTopicCompletionAnalytics(userProgress) {
  const subjects = Object.keys(userProgress.subjects);
  
  return subjects.map(subject => ({
    subject,
    completed: Object.values(userProgress.subjects[subject]).reduce((sum, grade) => 
      sum + (grade.completedTopics?.length || 0), 0),
    total: 15 // 5 topics per grade × 3 grades
  }));
}

function generateQuizPerformanceAnalytics(userProgress) {
  const last10Quizzes = userProgress.recentActivity
    .filter(activity => activity.type === 'quiz_completed')
    .slice(0, 10)
    .map(activity => ({
      topicName: activity.topicName,
      percentage: activity.percentage,
      date: activity.timestamp.split('T')[0]
    }));
  
  return last10Quizzes;
}

function generateStreakAnalytics(userProgress) {
  return {
    current: userProgress.currentStreak,
    longest: userProgress.longestStreak,
    lastUpdate: userProgress.lastStreakUpdate
  };
}

function generateRecommendations(userProgress) {
  const recommendations = [];
  
  // Weak subject recommendation
  const subjectScores = Object.keys(userProgress.subjects).map(subject => ({
    subject,
    score: calculateSubjectAverageScore(userProgress.subjects[subject])
  }));
  
  const weakestSubject = subjectScores.reduce((min, current) => 
    current.score < min.score ? current : min, subjectScores[0]);
  
  if (weakestSubject && weakestSubject.score < 70) {
    recommendations.push({
      type: 'improvement',
      title: `Focus on ${weakestSubject.subject}`,
      description: `Your average score in ${weakestSubject.subject} is ${weakestSubject.score.toFixed(1)}%. Consider reviewing basic concepts.`,
      priority: 'high'
    });
  }
  
  // Streak recommendation
  if (userProgress.currentStreak === 0) {
    recommendations.push({
      type: 'engagement',
      title: 'Start a learning streak!',
      description: 'Complete one topic today to start building your learning habit.',
      priority: 'medium'
    });
  }
  
  return recommendations;
}

module.exports = router; 