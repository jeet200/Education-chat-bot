import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader, BookOpen } from 'lucide-react';
import { chatAPI } from '../api/api';
import { useUser } from '../context/UserContext';
import LoadingSpinner from './common/LoadingSpinner';

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ChatTitle = styled.h1`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ChatSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.surface};
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &.user {
    flex-direction: row-reverse;
  }
`;

const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.round};
  background: ${props => props.isUser ? props.theme.colors.primary : props.theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.isUser ? props.theme.colors.primary : props.theme.colors.card};
  color: ${props => props.isUser ? 'white' : props.theme.colors.text};
  box-shadow: ${props => props.theme.shadows.small};
`;

const MessageText = styled.p`
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const MessageTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.isUser ? 'rgba(255,255,255,0.7)' : props.theme.colors.textLight};
  margin-top: ${props => props.theme.spacing.xs};
`;

const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.card};
  color: ${props => props.theme.colors.text};
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-size: ${props => props.theme.fontSize.md};
  transition: ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary}dd;
  }
  
  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
`;

const ChatInterface = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Extract topic and subject from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const topicId = urlParams.get('topic');
  const subject = urlParams.get('subject');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add initial message when topic is selected
    if (topicId && subject && messages.length === 0) {
      const topics = {
        mathematics: {
          1: 'Algebraic Expressions',
          2: 'Linear Equations',
          3: 'Quadratic Equations'
        },
        science: {
          1: 'Matter and Its Properties'
        },
        technology: {
          1: 'Introduction to Programming'
        }
      };
      
      const topicName = topics[subject]?.[topicId];
      if (topicName) {
        const welcomeMessage = {
          id: Date.now(),
          text: `Hi! I'm your AI tutor for ${topicName}. I'm here to help you learn and understand this topic. What would you like to know about ${topicName}?`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [topicId, subject, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage({
        message: inputMessage,
        language: user?.preferredLanguage || 'en',
        topic: topicId,
        subject: subject,
        conversationHistory: messages.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text,
        })),
      });

      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: t('chat.error'),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get topic name for display
  const getTopicName = () => {
    const topics = {
      mathematics: {
        1: 'Algebraic Expressions',
        2: 'Linear Equations',
        3: 'Quadratic Equations'
      },
      science: {
        1: 'Matter and Its Properties'
      },
      technology: {
        1: 'Introduction to Programming'
      }
    };
    return topics[subject]?.[topicId];
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>
          {topicId && subject ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} />
              {getTopicName()} - AI Tutor
            </div>
          ) : (
            t('chat.title')
          )}
        </ChatTitle>
        <ChatSubtitle>
          {topicId && subject ? 
            `Learn about ${getTopicName()} with personalized AI assistance` : 
            t('chat.subtitle')
          }
        </ChatSubtitle>
      </ChatHeader>

      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <Bot size={48} />
            <p>{t('chat.subtitle')}</p>
          </EmptyState>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              className={message.isUser ? 'user' : 'ai'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageAvatar isUser={message.isUser}>
                {message.isUser ? <User size={20} /> : <Bot size={20} />}
              </MessageAvatar>
              <MessageContent isUser={message.isUser}>
                <MessageText>{message.text}</MessageText>
                <MessageTime isUser={message.isUser}>
                  {message.timestamp.toLocaleTimeString()}
                </MessageTime>
              </MessageContent>
            </Message>
          ))
        )}
        
        {isLoading && (
          <Message
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MessageAvatar isUser={false}>
              <Bot size={20} />
            </MessageAvatar>
            <MessageContent isUser={false}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LoadingSpinner size="20px" thickness="2px" showText={false} />
                <span>{t('chat.thinking')}</span>
              </div>
            </MessageContent>
          </Message>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <MessageInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('chat.placeholder')}
          disabled={isLoading}
        />
        <SendButton onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
          {isLoading ? <Loader size={20} /> : <Send size={20} />}
          {t('chat.send')}
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface; 