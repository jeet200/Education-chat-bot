import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';

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

const PlaceholderContent = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textSecondary};
  
  svg {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const ProgressTracker = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <Title>{t('nav.progress')}</Title>
        <Subtitle>Track your learning progress and achievements</Subtitle>
      </Header>
      
      <PlaceholderContent>
        <TrendingUp size={64} />
        <h3>Progress Tracker</h3>
        <p>View your learning analytics, badges, and progress charts</p>
        <p>This component will be implemented soon!</p>
      </PlaceholderContent>
    </Container>
  );
};

export default ProgressTracker; 