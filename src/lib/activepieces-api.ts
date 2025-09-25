// Active Pieces Integration API utilities
export interface ActivePiecesConfig {
  flowId: string;
  webhookUrl: string;
  apiKey?: string;
}

export interface ActivePiecesMessage {
  message: string;
  conversation_id: string;
  user_id?: string;
}

export interface ActivePiecesResponse {
  response: string;
  conversation_id: string;
  status: 'success' | 'error';
}

// Get Active Pieces configuration from localStorage
export const getActivePiecesConfig = (): ActivePiecesConfig | null => {
  const config = localStorage.getItem('activepieces-config');
  return config ? JSON.parse(config) : null;
};

// Save Active Pieces configuration to localStorage
export const saveActivePiecesConfig = (config: ActivePiecesConfig): void => {
  localStorage.setItem('activepieces-config', JSON.stringify(config));
};

// Send message to Active Pieces flow via webhook
export const sendMessageToActivePieces = async (message: ActivePiecesMessage): Promise<ActivePiecesResponse> => {
  const config = getActivePiecesConfig();
  
  if (!config || !config.webhookUrl) {
    throw new Error('Active Pieces configuration not found. Please configure your flow in Settings.');
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
        flow_id: config.flowId
      }),
    });

    if (!response.ok) {
      throw new Error(`Active Pieces API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      response: data.text || data.response || data.message || 'No response from flow',
      conversation_id: message.conversation_id,
      status: 'success'
    };
  } catch (error) {
    console.error('Error sending message to Active Pieces:', error);
    return {
      response: 'Sorry, I encountered an error while processing your request.',
      conversation_id: message.conversation_id,
      status: 'error'
    };
  }
};