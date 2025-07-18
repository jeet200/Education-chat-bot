import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  MessageCircle, 
  TrendingUp, 
  Award, 
  Clock, 
  Target,
  ArrowRight 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import LoadingSpinner from './common/LoadingSpinner';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const WelcomeSection = styled(motion.section)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: ${props => props.theme.fontSize.xxxl};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const WelcomeSubtitle = styled.p`
  font-size: ${props => props.theme.fontSize.lg};
  opacity: 0.9;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const QuickActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.card};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatIcon = styled.div`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.fontSize.xxl};
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: ${props => props.theme.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SubjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.card};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SubjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SubjectTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const SubjectProgress = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.colors.border};
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProgressFill = styled.div`
  background: ${props => props.color || props.theme.colors.primary};
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.width || '0%'};
`;

const ProgressText = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const { progress, loading } = useUser();
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/curriculum/${subject.slug}/${subject.grade}`);
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner text={t('common.loading')} />
      </DashboardContainer>
    );
  }

  const stats = [
    {
      icon: BookOpen,
      value: progress?.totalTopicsCompleted || 0,
      label: t('progress.topics_completed'),
    },
    {
      icon: Award,
      value: progress?.totalQuizzesTaken || 0,
      label: t('progress.quizzes_taken'),
    },
    {
      icon: Target,
      value: progress?.currentStreak || 0,
      label: t('progress.current_streak'),
    },
    {
      icon: Clock,
      value: progress?.averageQuizScore ? `${Math.round(progress.averageQuizScore)}%` : '0%',
      label: t('progress.average_score'),
    },
  ];

  const subjects = [
    {
      name: t('subjects.math'),
      color: '#e67e22',
      progress: 65,
      topics: 8,
      total: 15,
      slug: 'mathematics',
      grade: 'grade-8',
    },
    {
      name: t('subjects.science'),
      color: '#27ae60',
      progress: 40,
      topics: 6,
      total: 15,
      slug: 'science',
      grade: 'grade-8',
    },
    {
      name: t('subjects.technology'),
      color: '#8e44ad',
      progress: 20,
      topics: 3,
      total: 15,
      slug: 'technology',
      grade: 'grade-8',
    },
  ];

  return (
    <DashboardContainer>
      <WelcomeSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeTitle>{t('dashboard.welcome')}</WelcomeTitle>
        <WelcomeSubtitle>{t('dashboard.subtitle')}</WelcomeSubtitle>
        
        <QuickActions>
          <ActionButton to="/chat">
            <MessageCircle size={20} />
            {t('nav.chat')}
          </ActionButton>
          <ActionButton to="/curriculum">
            <BookOpen size={20} />
            {t('nav.curriculum')}
          </ActionButton>
          <ActionButton to="/progress">
            <TrendingUp size={20} />
            {t('nav.progress')}
          </ActionButton>
        </QuickActions>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatHeader>
              <StatIcon>
                <stat.icon size={24} />
              </StatIcon>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <SectionTitle>{t('dashboard.subjects')}</SectionTitle>
      <SubjectsGrid>
        {subjects.map((subject, index) => (
          <SubjectCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleSubjectClick(subject)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SubjectHeader>
              <SubjectTitle>{subject.name}</SubjectTitle>
              <ArrowRight size={20} color={subject.color} />
            </SubjectHeader>
            
            <SubjectProgress>
              <ProgressBar>
                <ProgressFill width={`${subject.progress}%`} color={subject.color} />
              </ProgressBar>
              <ProgressText>
                {subject.topics} / {subject.total} topics completed
              </ProgressText>
            </SubjectProgress>
          </SubjectCard>
        ))}
      </SubjectsGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 