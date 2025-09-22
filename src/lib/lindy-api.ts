// Lindy AI Integration API utilities
export interface LindyConfig {
  agentId: string;
  webhookUrl: string;
  apiKey?: string;
}

export interface LindyMessage {
  message: string;
  conversation_id: string;
  user_id?: string;
}

export interface LindyResponse {
  response: string;
  conversation_id: string;
  status: 'success' | 'error';
}

// Get Lindy configuration from localStorage
export const getLindyConfig = (): LindyConfig | null => {
  const config = localStorage.getItem('lindy-config');
  return config ? JSON.parse(config) : null;
};

// Save Lindy configuration to localStorage
export const saveLindyConfig = (config: LindyConfig): void => {
  localStorage.setItem('lindy-config', JSON.stringify(config));
};

// Send message to Lindy agent via webhook
export const sendMessageToLindy = async (message: LindyMessage): Promise<LindyResponse> => {
  const config = getLindyConfig();
  
  if (!config || !config.webhookUrl) {
    throw new Error('Lindy configuration not found. Please configure your Lindy agent in Settings.');
  }

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      },
      body: JSON.stringify({
        text: message.message,
        conversation_id: message.conversation_id,
        user_id: message.user_id || 'anonymous',
        agent_id: config.agentId
      }),
    });

    if (!response.ok) {
      throw new Error(`Lindy API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      response: data.text || data.response || data.message || 'No response from agent',
      conversation_id: message.conversation_id,
      status: 'success'
    };
  } catch (error) {
    console.error('Error sending message to Lindy:', error);
    return {
      response: 'Sorry, I encountered an error while processing your request.',
      conversation_id: message.conversation_id,
      status: 'error'
    };
  }
};