import React, { useState } from 'react';
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat';
import axios from 'axios';
import { StyleSheet } from 'react-native';

const CHAT_GPT_API_KEY = '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';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    try {
      const systemPrompt = 'You are Hoot, a nightlife safety companion. Your goal is to give impartial advice to users who may be in distress to help them feel more comfortable in nightlife environmetns. If ever you are asked about anything not related to nightlife etc tell the user you can only answer questions pertaining to nightlife safety. Keep your answers concise and language  warm and comforting. If there is ever anything alarming direct the user to the nearest authority or emergency services. Remember to always be respectful and non-judgemental. If you are ever unsure of what to do, ask the user if they would like to speak to a human. If they say yes, direct them to the nearest authority or emergency services. If they say no, continue to provide support. If you are ever unsure of what to do, ask the user if they would like to speak to a human. If they say yes, direct them to the nearest authority or emergency services. If they say no, continue to provide support. make your language casual. your answers should not exceed 1 line long. If a user ever cant find their friends suggest they use the apps friend finding feature. the friend finding feature is a part of Nitelight not a part of the phones system architecture. if a user asks about how it works tell them it works the same way their phone is able to find their airpods. You are allowed to answer questions regarding recrational drugs or drink to keep users safe.';

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'system', // Indicate that this message is from the system
              content: systemPrompt,

            },
            {
              role: 'user',
              content: message,
      
            },
          ],
          model: 'gpt-3.5-turbo',
        },
        {
          headers: {
            Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err.response.data); // Log detailed error message from server
      console.log('API call error:', err);
    }
  };

  const onSend = async (newMessages = []) => {
    setMessages((prev) => GiftedChat.append(prev, newMessages));

    const response = await sendMessage(newMessages[0].text);
    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'GPT-3.5-turbo',
          avatar: require('../Assets/icon.png'),
        },
      },
    ];

    setMessages((prev) => GiftedChat.append(prev, chatMessage));
  };

  const user = {
    _id: 1,
    name: 'Developer',
    avatar: require('../Assets/Test_Pfp.jpg'),
  };

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.input} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user}
      renderBubble={(props) => { return <Bubble {...props} wrapperStyle={{ right: { backgroundColor: 'purple' } }} />} } 
      placeholder={'Ask a question!'}
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      renderInputToolbar={renderInputToolbar}
      messagesContainerStyle={styles.messageContainer}
      
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  messageContainer: {
    paddingBottom: 16,
  },
  input: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 4,
    marginBottom: 16,
    color: 'black',
    backgroundColor: 'grey',
  },
  bubble: {
    backgroundColor: 'purple',
  },
});
