import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { HelpCircle } from 'lucide-react';

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

const QuizInterface = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <Title>{t('quiz.title')}</Title>
        <Subtitle>Test your knowledge with interactive quizzes</Subtitle>
      </Header>
      
      <PlaceholderContent>
        <HelpCircle size={64} />
        <h3>Quiz Interface</h3>
        <p>Take quizzes to test your understanding of topics</p>
        <p>This component will be implemented soon!</p>
      </PlaceholderContent>
    </Container>
  );
};

export default QuizInterface; 