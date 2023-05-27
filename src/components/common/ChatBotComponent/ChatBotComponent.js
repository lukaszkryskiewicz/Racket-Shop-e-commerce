import React from 'react';
import styles from './ChatBotComponent.module.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import clsx from 'clsx';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const ChatBotComponent = () => {
  const [activeChat, setActiveChat] = useState(true);

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#d58e32',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#d58e32',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const steps = [
    {
      id: '1',
      message: 'Please choose topic',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Shop opening hours', trigger: '3' },
        { value: 2, label: 'Delivery costs', trigger: '4' },
        { value: 3, label: 'Shop contact', trigger: '5' },
        { value: 4, label: 'Other', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: 'We work from monday to friday 9.00 AM - 4.00 PM',
      trigger: '1',
    },
    {
      id: '4',
      message: 'We offer free delivery!',
      trigger: '1',
    },
    {
      id: '5',
      message: 'You can contact us using our chat or call +34 333 222 333',
      trigger: '1',
    },
    {
      id: '6',
      message: 'Please write your question below',
      trigger: '7',
    },
    {
      id: '7',
      user: true,
      trigger: '8',
    },
    {
      id: '8',
      message:
        "Unfortunately, I don't know the answer to this question. Please contact the hotline at +34 333 222 333",
      end: true,
    },
  ];

  const handleClick = e => {
    e.preventDefault();
    setActiveChat(!activeChat);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.chatBot}>
          {activeChat && (
            <ThemeProvider theme={theme}>
              <ChatBot steps={steps} />
            </ThemeProvider>
          )}
          <div className={styles.chatButton}>
            <Button
              variant='small'
              className={clsx(styles.button, activeChat && styles.active)}
              onClick={handleClick}
            >
              Need help? Use our chat!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotComponent;
