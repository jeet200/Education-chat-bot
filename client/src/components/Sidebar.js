import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  MessageCircle, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  X 
} from 'lucide-react';

const SidebarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.theme.zIndex.sidebar - 1};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: ${props => props.theme.colors.card};
  border-right: 1px solid ${props => props.theme.colors.border};
  z-index: ${props => props.theme.zIndex.sidebar};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    position: relative;
    height: calc(100vh - 70px);
  }
`;

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.primary};
  }
`;

const Navigation = styled.nav`
  padding: ${props => props.theme.spacing.md};
  flex: 1;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
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

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSize.sm};
  text-align: center;
`;

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: t('nav.dashboard'), icon: Home },
    { path: '/chat', label: t('nav.chat'), icon: MessageCircle },
    { path: '/curriculum', label: t('nav.curriculum'), icon: BookOpen },
    { path: '/progress', label: t('nav.progress'), icon: TrendingUp },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SidebarOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <SidebarContainer
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <SidebarHeader>
              <h2>Menu</h2>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </SidebarHeader>
            
            <Navigation>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavItem
                    key={item.path}
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={onClose}
                  >
                    <Icon size={20} />
                    {item.label}
                  </NavItem>
                );
              })}
            </Navigation>
            
            <SidebarFooter>
              <div>AI Education Assistant</div>
              <div>v1.0.0</div>
            </SidebarFooter>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 