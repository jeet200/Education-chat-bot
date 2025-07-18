import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  BookOpen,
  Clock,
  Target,
  MessageCircle
} from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
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

const PlaceholderContent = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textSecondary};
  
  svg {
    margin-bottom: ${props => props.theme.spacing.md};
  }
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

const TopicCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TopicHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TopicIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const TopicInfo = styled.div`
  flex: 1;
`;

const TopicTitle = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.xl};
`;

const TopicSubtitle = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.md};
`;

const TopicMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
`;

const TopicDescription = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.primary ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.primary ? props.theme.colors.primary + 'dd' : props.theme.colors.hover};
    transform: translateY(-2px);
  }
`;

const TopicDetail = () => {
  const { subject, grade, topicId } = useParams();
  const navigate = useNavigate();

  const subjects = {
    mathematics: {
      name: 'Mathematics',
      color: '#e67e22',
      topics: {
        1: {
          title: 'Algebraic Expressions',
          description: 'Learn about variables, constants, and algebraic expressions. Understand how to simplify and manipulate algebraic expressions.',
          duration: '45 minutes',
          difficulty: 'Beginner',
          completed: true,
          content: `
            <h3>What are Algebraic Expressions?</h3>
            <p>An algebraic expression is a mathematical phrase that contains variables, constants, and mathematical operations.</p>
            
            <h3>Key Concepts:</h3>
            <p>• Variables: Letters that represent unknown values (like x, y, z)</p>
            <p>• Constants: Fixed numbers (like 5, -3, 2.5)</p>
            <p>• Coefficients: Numbers multiplied by variables (in 3x, the coefficient is 3)</p>
            <p>• Terms: Parts of an expression separated by + or - signs</p>
            
            <h3>Examples:</h3>
            <p>• 3x + 5 (has two terms: 3x and 5)</p>
            <p>• 2y² - 4y + 1 (has three terms)</p>
            <p>• x + y - z (has three terms)</p>
          `
        },
        2: {
          title: 'Linear Equations',
          description: 'Solve linear equations with one variable. Learn different methods and techniques for finding solutions.',
          duration: '50 minutes',
          difficulty: 'Intermediate',
          completed: true,
          content: `
            <h3>What are Linear Equations?</h3>
            <p>A linear equation is an equation where the highest power of the variable is 1.</p>
            
            <h3>Standard Form:</h3>
            <p>ax + b = 0, where a ≠ 0</p>
            
            <h3>Solving Steps:</h3>
            <p>1. Isolate the variable term on one side</p>
            <p>2. Move constants to the other side</p>
            <p>3. Divide by the coefficient of the variable</p>
            
            <h3>Example:</h3>
            <p>Solve: 2x + 3 = 11</p>
            <p>Step 1: 2x = 11 - 3</p>
            <p>Step 2: 2x = 8</p>
            <p>Step 3: x = 4</p>
          `
        },
        3: {
          title: 'Quadratic Equations',
          description: 'Introduction to quadratic equations and their solutions using various methods.',
          duration: '60 minutes',
          difficulty: 'Advanced',
          completed: false,
          content: `
            <h3>What are Quadratic Equations?</h3>
            <p>A quadratic equation is an equation of the form ax² + bx + c = 0, where a ≠ 0.</p>
            
            <h3>Methods of Solving:</h3>
            <p>• Factoring</p>
            <p>• Completing the square</p>
            <p>• Quadratic formula</p>
            
            <h3>The Quadratic Formula:</h3>
            <p>x = (-b ± √(b² - 4ac)) / 2a</p>
            
            <h3>Example:</h3>
            <p>Solve: x² - 5x + 6 = 0</p>
            <p>Factor: (x - 2)(x - 3) = 0</p>
            <p>Solutions: x = 2 or x = 3</p>
          `
        }
      }
    },
    science: {
      name: 'Science',
      color: '#27ae60',
      topics: {
        1: {
          title: 'Matter and Its Properties',
          description: 'Explore the different states of matter and their properties.',
          duration: '40 minutes',
          difficulty: 'Beginner',
          completed: true,
          content: `
            <h3>What is Matter?</h3>
            <p>Matter is anything that has mass and takes up space.</p>
            
            <h3>States of Matter:</h3>
            <p>• Solid: Fixed shape and volume</p>
            <p>• Liquid: Fixed volume, takes shape of container</p>
            <p>• Gas: Takes both shape and volume of container</p>
            <p>• Plasma: Ionized gas at very high temperatures</p>
            
            <h3>Properties of Matter:</h3>
            <p>• Physical properties: Color, density, melting point</p>
            <p>• Chemical properties: Reactivity, flammability</p>
          `
        }
      }
    },
    technology: {
      name: 'Technology',
      color: '#8e44ad',
      topics: {
        1: {
          title: 'Introduction to Programming',
          description: 'Learn the basics of programming and computational thinking.',
          duration: '55 minutes',
          difficulty: 'Beginner',
          completed: true,
          content: `
            <h3>What is Programming?</h3>
            <p>Programming is the process of creating instructions for computers to follow.</p>
            
            <h3>Key Concepts:</h3>
            <p>• Variables: Store data values</p>
            <p>• Functions: Reusable blocks of code</p>
            <p>• Loops: Repeat actions</p>
            <p>• Conditionals: Make decisions</p>
            
            <h3>Programming Languages:</h3>
            <p>• Python: Easy to learn, great for beginners</p>
            <p>• JavaScript: Used for web development</p>
            <p>• Java: Used for applications and Android apps</p>
          `
        }
      }
    }
  };

  const handleBackClick = () => {
    navigate(`/curriculum/${subject}/${grade}`);
  };

  const handleStartLearning = () => {
    navigate(`/chat?topic=${topicId}&subject=${subject}`);
  };

  const handleTakeQuiz = () => {
    navigate(`/quiz/${subject}/${grade}/${topicId}`);
  };

  const selectedSubject = subjects[subject];
  const selectedTopic = selectedSubject?.topics[topicId];

  if (!selectedSubject || !selectedTopic) {
    return (
      <Container>
        <Header>
          <Title>Topic Not Found</Title>
          <Subtitle>The requested topic could not be found.</Subtitle>
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
        Back to {selectedSubject.name}
      </BackButton>

      <TopicCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TopicHeader>
          <TopicIcon color={selectedSubject.color}>
            <BookOpen size={32} />
          </TopicIcon>
          <TopicInfo>
            <TopicTitle>{selectedTopic.title}</TopicTitle>
            <TopicSubtitle>{selectedTopic.description}</TopicSubtitle>
          </TopicInfo>
          {selectedTopic.completed && (
            <CheckCircle size={24} color="#27ae60" />
          )}
        </TopicHeader>

        <TopicMeta>
          <MetaItem>
            <Clock size={16} />
            {selectedTopic.duration}
          </MetaItem>
          <MetaItem>
            <Target size={16} />
            {selectedTopic.difficulty}
          </MetaItem>
          <MetaItem>
            <FileText size={16} />
            {selectedSubject.name}
          </MetaItem>
        </TopicMeta>

        <TopicDescription>
          <div dangerouslySetInnerHTML={{ __html: selectedTopic.content }} />
        </TopicDescription>

        <ActionButtons>
          <ActionButton
            primary
            onClick={handleStartLearning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            Start Learning with AI
          </ActionButton>
          <ActionButton
            onClick={handleTakeQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} />
            Take Quiz
          </ActionButton>
        </ActionButtons>
      </TopicCard>
    </Container>
  );
};

export default TopicDetail; 