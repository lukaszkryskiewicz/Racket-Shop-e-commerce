import React from 'react';
import styles from './ChatBotComponent.module.scss';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const ChatBotComponent = () => {
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
      hideInput: true,
    },
    {
      id: '3',
      message: 'We work from monday to friday 9.00 AM - 4.00 PM',
      trigger: '1',
      hideInput: true,
    },
    {
      id: '4',
      message: 'We offer free delivery!',
      trigger: '1',
      hideInput: true,
    },
    {
      id: '5',
      message: 'You can contact us using our chat or call +34 333 222 333',
      trigger: '1',
      hideInput: true,
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
      trigger: '1',
    },
  ];
  return (
    <div className={styles.root}>
      <ThemeProvider theme={theme}>
        <ChatBot floating={true} steps={steps} headerTitle='RacketShop Chat' />
      </ThemeProvider>
    </div>
  );
};

export default ChatBotComponent;
