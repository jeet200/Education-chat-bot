import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Circle,
  Calculator,
  Beaker,
  Cpu
} from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSize.xxl};
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.lg};
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:hover {
    background: ${props => props.theme.colors.hover};
  }
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const SubjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.card};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const SubjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SubjectIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const SubjectTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.lg};
`;

const TopicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const TopicItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.theme.colors.surface};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
  }
`;

const TopicTitle = styled.span`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.sm};
`;

const CurriculumBrowser = () => {
  const { t } = useTranslation();
  const { subject, grade } = useParams();
  const navigate = useNavigate();

  const subjects = {
    mathematics: {
      name: 'Mathematics',
      icon: Calculator,
      color: '#e67e22',
      topics: [
        { id: 1, title: 'Algebraic Expressions', completed: true },
        { id: 2, title: 'Linear Equations', completed: true },
        { id: 3, title: 'Quadratic Equations', completed: false },
        { id: 4, title: 'Functions and Graphs', completed: false },
        { id: 5, title: 'Geometry - Areas', completed: true },
        { id: 6, title: 'Geometry - Volumes', completed: false },
        { id: 7, title: 'Statistics', completed: false },
        { id: 8, title: 'Probability', completed: false },
      ]
    },
    science: {
      name: 'Science',
      icon: Beaker,
      color: '#27ae60',
      topics: [
        { id: 1, title: 'Matter and Its Properties', completed: true },
        { id: 2, title: 'Atomic Structure', completed: true },
        { id: 3, title: 'Chemical Reactions', completed: false },
        { id: 4, title: 'Force and Motion', completed: false },
        { id: 5, title: 'Energy and Work', completed: true },
        { id: 6, title: 'Light and Sound', completed: false },
        { id: 7, title: 'Electricity', completed: false },
        { id: 8, title: 'Life Processes', completed: false },
      ]
    },
    technology: {
      name: 'Technology',
      icon: Cpu,
      color: '#8e44ad',
      topics: [
        { id: 1, title: 'Introduction to Programming', completed: true },
        { id: 2, title: 'Web Development Basics', completed: true },
        { id: 3, title: 'Database Fundamentals', completed: false },
        { id: 4, title: 'Computer Networks', completed: false },
        { id: 5, title: 'Digital Citizenship', completed: true },
        { id: 6, title: 'Robotics Basics', completed: false },
        { id: 7, title: 'AI and Machine Learning', completed: false },
        { id: 8, title: 'Cybersecurity', completed: false },
      ]
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/curriculum/${subject}/${grade}/${topicId}`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // If no subject is selected, show all subjects
  if (!subject) {
    return (
      <Container>
        <Header>
          <Title>{t('nav.curriculum')}</Title>
          <Subtitle>Browse learning topics and subjects</Subtitle>
        </Header>
        
        <SubjectGrid>
          {Object.entries(subjects).map(([key, subjectData]) => (
            <SubjectCard
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate(`/curriculum/${key}/grade-8`)}
            >
              <SubjectHeader>
                <SubjectIcon color={subjectData.color}>
                  <subjectData.icon size={24} />
                </SubjectIcon>
                <SubjectTitle>{subjectData.name}</SubjectTitle>
              </SubjectHeader>
              <TopicsList>
                {subjectData.topics.slice(0, 4).map((topic) => (
                  <TopicItem key={topic.id}>
                    {topic.completed ? (
                      <CheckCircle size={16} color="#27ae60" />
                    ) : (
                      <Circle size={16} color="#95a5a6" />
                    )}
                    <TopicTitle>{topic.title}</TopicTitle>
                  </TopicItem>
                ))}
                <TopicItem>
                  <span style={{ color: '#7f8c8d', fontSize: '0.8rem' }}>
                    +{subjectData.topics.length - 4} more topics
                  </span>
                </TopicItem>
              </TopicsList>
            </SubjectCard>
          ))}
        </SubjectGrid>
      </Container>
    );
  }

  // If subject is selected, show topics for that subject
  const selectedSubject = subjects[subject];
  if (!selectedSubject) {
    return (
      <Container>
        <Header>
          <Title>Subject Not Found</Title>
          <Subtitle>The requested subject could not be found.</Subtitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton
        onClick={handleBackClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </BackButton>
      
      <Header>
        <Title>{selectedSubject.name}</Title>
        <Subtitle>{grade?.replace('-', ' ').toUpperCase()} - Learning Topics</Subtitle>
      </Header>
      
      <TopicsList>
        {selectedSubject.topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TopicItem onClick={() => handleTopicClick(topic.id)}>
              {topic.completed ? (
                <CheckCircle size={20} color="#27ae60" />
              ) : (
                <Circle size={20} color="#95a5a6" />
              )}
              <TopicTitle>{topic.title}</TopicTitle>
              <Play size={16} color="#7f8c8d" />
            </TopicItem>
          </motion.div>
        ))}
      </TopicsList>
    </Container>
  );
};

export default CurriculumBrowser; 