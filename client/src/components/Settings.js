import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon } from 'lucide-react';

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

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <Title>{t('nav.settings')}</Title>
        <Subtitle>Customize your learning experience</Subtitle>
      </Header>
      
      <PlaceholderContent>
        <SettingsIcon size={64} />
        <h3>Settings</h3>
        <p>Configure your preferences, language, and account settings</p>
        <p>This component will be implemented soon!</p>
      </PlaceholderContent>
    </Container>
  );
};

export default Settings; 