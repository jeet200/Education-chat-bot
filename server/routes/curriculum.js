const express = require('express');
const router = express.Router();

// Predefined curriculum structure for grades 6-8
const CURRICULUM_DATA = {
  math: {
    name: 'Mathematics',
    grades: {
      6: {
        topics: [
          { id: 'fractions', name: 'Fractions and Decimals', difficulty: 'beginner' },
          { id: 'geometry-basics', name: 'Basic Geometry', difficulty: 'beginner' },
          { id: 'ratios', name: 'Ratios and Proportions', difficulty: 'intermediate' },
          { id: 'integers', name: 'Integers and Number Lines', difficulty: 'beginner' },
          { id: 'algebra-intro', name: 'Introduction to Algebra', difficulty: 'intermediate' }
        ]
      },
      7: {
        topics: [
          { id: 'linear-equations', name: 'Linear Equations', difficulty: 'intermediate' },
          { id: 'geometry-advanced', name: 'Advanced Geometry', difficulty: 'intermediate' },
          { id: 'probability', name: 'Basic Probability', difficulty: 'intermediate' },
          { id: 'statistics', name: 'Data and Statistics', difficulty: 'intermediate' },
          { id: 'percentages', name: 'Percentages and Applications', difficulty: 'beginner' }
        ]
      },
      8: {
        topics: [
          { id: 'quadratic-equations', name: 'Quadratic Equations', difficulty: 'advanced' },
          { id: 'trigonometry', name: 'Basic Trigonometry', difficulty: 'advanced' },
          { id: 'functions', name: 'Functions and Graphs', difficulty: 'advanced' },
          { id: 'surface-area', name: 'Surface Area and Volume', difficulty: 'intermediate' },
          { id: 'exponents', name: 'Exponents and Powers', difficulty: 'intermediate' }
        ]
      }
    }
  },
  science: {
    name: 'Science',
    grades: {
      6: {
        topics: [
          { id: 'plants', name: 'Plants and Photosynthesis', difficulty: 'beginner' },
          { id: 'light', name: 'Light and Shadows', difficulty: 'beginner' },
          { id: 'water-cycle', name: 'Water Cycle', difficulty: 'beginner' },
          { id: 'materials', name: 'Materials and Their Properties', difficulty: 'beginner' },
          { id: 'body-systems', name: 'Human Body Systems', difficulty: 'intermediate' }
        ]
      },
      7: {
        topics: [
          { id: 'acids-bases', name: 'Acids and Bases', difficulty: 'intermediate' },
          { id: 'weather', name: 'Weather and Climate', difficulty: 'intermediate' },
          { id: 'motion', name: 'Motion and Force', difficulty: 'intermediate' },
          { id: 'electricity', name: 'Basic Electricity', difficulty: 'intermediate' },
          { id: 'nutrition', name: 'Nutrition and Food', difficulty: 'beginner' }
        ]
      },
      8: {
        topics: [
          { id: 'atoms-molecules', name: 'Atoms and Molecules', difficulty: 'advanced' },
          { id: 'sound', name: 'Sound and Waves', difficulty: 'intermediate' },
          { id: 'reproduction', name: 'Reproduction in Animals', difficulty: 'intermediate' },
          { id: 'natural-resources', name: 'Natural Resources', difficulty: 'intermediate' },
          { id: 'pollution', name: 'Pollution and Environment', difficulty: 'intermediate' }
        ]
      }
    }
  },
  technology: {
    name: 'Technology',
    grades: {
      6: {
        topics: [
          { id: 'computer-basics', name: 'Computer Basics', difficulty: 'beginner' },
          { id: 'internet-safety', name: 'Internet Safety', difficulty: 'beginner' },
          { id: 'typing', name: 'Typing and Keyboard Skills', difficulty: 'beginner' },
          { id: 'file-management', name: 'File Management', difficulty: 'beginner' },
          { id: 'digital-citizenship', name: 'Digital Citizenship', difficulty: 'beginner' }
        ]
      },
      7: {
        topics: [
          { id: 'programming-intro', name: 'Introduction to Programming', difficulty: 'intermediate' },
          { id: 'spreadsheets', name: 'Spreadsheets and Data', difficulty: 'intermediate' },
          { id: 'presentations', name: 'Creating Presentations', difficulty: 'intermediate' },
          { id: 'research-skills', name: 'Digital Research Skills', difficulty: 'intermediate' },
          { id: 'robotics-basics', name: 'Basic Robotics', difficulty: 'intermediate' }
        ]
      },
      8: {
        topics: [
          { id: 'algorithms', name: 'Algorithms and Logic', difficulty: 'advanced' },
          { id: 'web-basics', name: 'Web Development Basics', difficulty: 'advanced' },
          { id: 'databases', name: 'Introduction to Databases', difficulty: 'advanced' },
          { id: 'ai-basics', name: 'Artificial Intelligence Basics', difficulty: 'advanced' },
          { id: 'cyber-security', name: 'Cyber Security Basics', difficulty: 'intermediate' }
        ]
      }
    }
  }
};

// Get curriculum overview
router.get('/overview', (req, res) => {
  const overview = Object.keys(CURRICULUM_DATA).map(subject => ({
    subject,
    name: CURRICULUM_DATA[subject].name,
    grades: Object.keys(CURRICULUM_DATA[subject].grades).map(grade => ({
      grade: parseInt(grade),
      topicCount: CURRICULUM_DATA[subject].grades[grade].topics.length
    }))
  }));

  res.json({
    curriculum: overview,
    totalSubjects: Object.keys(CURRICULUM_DATA).length,
    supportedGrades: [6, 7, 8],
    timestamp: new Date().toISOString()
  });
});

// Get topics for a specific subject and grade
router.get('/:subject/:grade/topics', (req, res) => {
  const { subject, grade } = req.params;
  const gradeNum = parseInt(grade);

  if (!CURRICULUM_DATA[subject]) {
    return res.status(404).json({ error: 'Subject not found' });
  }

  if (!CURRICULUM_DATA[subject].grades[gradeNum]) {
    return res.status(404).json({ error: 'Grade not supported for this subject' });
  }

  const topics = CURRICULUM_DATA[subject].grades[gradeNum].topics;

  res.json({
    subject,
    subjectName: CURRICULUM_DATA[subject].name,
    grade: gradeNum,
    topics,
    topicCount: topics.length,
    timestamp: new Date().toISOString()
  });
});

// Get detailed topic information
router.get('/:subject/:grade/topics/:topicId', (req, res) => {
  const { subject, grade, topicId } = req.params;
  const gradeNum = parseInt(grade);

  if (!CURRICULUM_DATA[subject] || !CURRICULUM_DATA[subject].grades[gradeNum]) {
    return res.status(404).json({ error: 'Subject or grade not found' });
  }

  const topic = CURRICULUM_DATA[subject].grades[gradeNum].topics.find(t => t.id === topicId);

  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  // Generate learning objectives and key concepts
  const topicDetails = {
    ...topic,
    subject,
    subjectName: CURRICULUM_DATA[subject].name,
    grade: gradeNum,
    learningObjectives: generateLearningObjectives(topic.name, gradeNum),
    keyConcepts: generateKeyConcepts(topic.name, subject),
    estimatedTime: getEstimatedTime(topic.difficulty),
    prerequisites: getPrerequisites(subject, gradeNum, topicId),
    nextTopics: getNextTopics(subject, gradeNum, topicId)
  };

  res.json({
    topic: topicDetails,
    timestamp: new Date().toISOString()
  });
});

// Search topics across all subjects and grades
router.get('/search', (req, res) => {
  const { query, subject, grade, difficulty } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const results = [];
  const searchTerm = query.toLowerCase();

  Object.keys(CURRICULUM_DATA).forEach(subjectKey => {
    if (subject && subjectKey !== subject) return;

    Object.keys(CURRICULUM_DATA[subjectKey].grades).forEach(gradeKey => {
      if (grade && parseInt(gradeKey) !== parseInt(grade)) return;

      CURRICULUM_DATA[subjectKey].grades[gradeKey].topics.forEach(topic => {
        if (difficulty && topic.difficulty !== difficulty) return;

        if (topic.name.toLowerCase().includes(searchTerm) || 
            topic.id.toLowerCase().includes(searchTerm)) {
          results.push({
            ...topic,
            subject: subjectKey,
            subjectName: CURRICULUM_DATA[subjectKey].name,
            grade: parseInt(gradeKey)
          });
        }
      });
    });
  });

  res.json({
    query,
    results,
    resultCount: results.length,
    timestamp: new Date().toISOString()
  });
});

// Get learning path suggestions
router.get('/learning-path/:subject/:grade', (req, res) => {
  const { subject, grade } = req.params;
  const gradeNum = parseInt(grade);

  if (!CURRICULUM_DATA[subject] || !CURRICULUM_DATA[subject].grades[gradeNum]) {
    return res.status(404).json({ error: 'Subject or grade not found' });
  }

  const topics = CURRICULUM_DATA[subject].grades[gradeNum].topics;
  
  // Sort topics by difficulty (beginner -> intermediate -> advanced)
  const sortedTopics = [...topics].sort((a, b) => {
    const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });

  const learningPath = sortedTopics.map((topic, index) => ({
    ...topic,
    order: index + 1,
    isRecommended: index < 3, // First 3 topics are recommended
    estimatedTime: getEstimatedTime(topic.difficulty)
  }));

  res.json({
    subject,
    subjectName: CURRICULUM_DATA[subject].name,
    grade: gradeNum,
    learningPath,
    totalTopics: learningPath.length,
    estimatedTotalTime: learningPath.reduce((sum, topic) => sum + topic.estimatedTime, 0),
    timestamp: new Date().toISOString()
  });
});

// Helper functions
function generateLearningObjectives(topicName, grade) {
  const objectives = [
    `Understand the fundamental concepts of ${topicName}`,
    `Apply ${topicName} principles to solve problems`,
    `Demonstrate knowledge through practical examples`
  ];
  
  if (grade >= 7) {
    objectives.push(`Analyze relationships within ${topicName}`);
  }
  
  if (grade >= 8) {
    objectives.push(`Evaluate and critique different approaches to ${topicName}`);
  }
  
  return objectives;
}

function generateKeyConcepts(topicName, subject) {
  const concepts = {
    math: ['Definition', 'Properties', 'Rules', 'Applications', 'Problem-solving'],
    science: ['Theory', 'Observation', 'Experimentation', 'Real-world examples', 'Environmental impact'],
    technology: ['Concepts', 'Tools', 'Practice', 'Ethics', 'Future applications']
  };
  
  return concepts[subject] || ['Basic concepts', 'Applications', 'Examples'];
}

function getEstimatedTime(difficulty) {
  const timeMap = {
    'beginner': 45,
    'intermediate': 60,
    'advanced': 90
  };
  return timeMap[difficulty] || 60;
}

function getPrerequisites(subject, grade, topicId) {
  // Simple prerequisite logic - in a real system, this would be more sophisticated
  if (grade === 6) return [];
  
  const prevGrade = grade - 1;
  if (CURRICULUM_DATA[subject].grades[prevGrade]) {
    return CURRICULUM_DATA[subject].grades[prevGrade].topics.slice(0, 2).map(t => t.name);
  }
  
  return [];
}

function getNextTopics(subject, grade, topicId) {
  const currentTopics = CURRICULUM_DATA[subject].grades[grade].topics;
  const currentIndex = currentTopics.findIndex(t => t.id === topicId);
  
  if (currentIndex === -1) return [];
  
  const nextTopics = currentTopics.slice(currentIndex + 1, currentIndex + 3);
  return nextTopics.map(t => t.name);
}

module.exports = router; 