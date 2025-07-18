import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Menu, Sun, Moon, Globe, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.card};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 ${props => props.theme.spacing.lg};
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.header};
  box-shadow: ${props => props.theme.shadows.small};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.bold};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.primary};
  }
  
  &.active {
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.primary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.surface};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Header = ({ toggleTheme, toggleSidebar, currentTheme }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useUser();


  const navigationItems = [
    { path: '/', label: t('nav.dashboard') },
    { path: '/chat', label: t('nav.chat') },
    { path: '/curriculum', label: t('nav.curriculum') },
    { path: '/progress', label: t('nav.progress') },
  ];

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <IconButton onClick={toggleSidebar}>
          <Menu size={20} />
        </IconButton>
        
        <Logo to="/">
          <span>🎓</span>
          AI Education Assistant
        </Logo>
      </div>

      <Navigation>
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </NavLink>
        ))}
      </Navigation>

      <Actions>
        <IconButton onClick={toggleTheme} title={t('settings.theme')}>
          {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
        
        <IconButton title={t('settings.language')}>
          <Globe size={20} />
        </IconButton>
        
        {user && (
          <UserInfo>
            <User size={16} />
            <span>{user.name}</span>
          </UserInfo>
        )}
      </Actions>
    </HeaderContainer>
  );
};

export default Header; 