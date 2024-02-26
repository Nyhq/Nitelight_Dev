// gpt_api.js
import axios from 'axios';

const API_KEY = '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'; 
const MODEL = 'gpt-3.5-turbo';

const callChatGPT = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: MODEL,
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content; 
  } catch (error) {
    console.error('ChatGPT Error:', error);
    throw error; // Re-throw error for handling in the component
  }
};

export default callChatGPT; 
