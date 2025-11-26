// src/services/chatService.ts
interface BotMessage {
  id: string;
  createdAt: string;
  conversationId: string;
  userId: string;
  payload: {
    type: string;
    text: string;
  };
}

interface ChatResponse {
  message: {
    message: BotMessage;
  };
  botResponse?: BotMessage | null;
  conversation: {
    id: string;
    isStarted: boolean;
  };
  messages: BotMessage[];
  user: {
    key: string;
    id: string;
  };
}

interface RequestConfig {
  timeout?: number;
  retries?: number;
  backoffMultiplier?: number;
}

class ChatService {
  private static instance: ChatService;
  private readonly API_BASE_URL: string = process.env.REACT_APP_CHAT_API_URL || 'https://portfolio-chatbot-backend-rwxc.onrender.com/api/chat';
  private userKey: string | null = null;
  private conversationId: string | null = null;
  private messageQueue: string[] = [];
  private isProcessing: boolean = false;

  private constructor() {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('chatState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        this.userKey = state.userKey;
        this.conversationId = state.conversationId;
      } catch (e) {
        console.warn('Failed to parse saved chat state');
      }
    }
  }

  private saveState() {
    localStorage.setItem('chatState', JSON.stringify({
      userKey: this.userKey,
      conversationId: this.conversationId
    }));
  }

  /**
   * Exponential backoff retry logic
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
    backoffMultiplier: number = 1.5
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries - 1) {
          const delay = baseDelay * Math.pow(backoffMultiplier, attempt);
          const jitter = Math.random() * 0.1 * delay;
          const totalDelay = delay + jitter;
          
          console.warn(`Request failed, retrying in ${totalDelay.toFixed(0)}ms (attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, totalDelay));
        }
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  /**
   * Send a message with improved error handling and retry logic
   */
  async sendMessage(messageText: string, config: RequestConfig = {}): Promise<ChatResponse> {
    const {
      timeout = 30000,
      retries = 3,
      backoffMultiplier = 1.5
    } = config;

    try {
      return await this.retryWithBackoff(
        async () => {
          const headers: Record<string, string> = {
            'Content-Type': 'application/json'
          };

          if (this.userKey) {
            headers['x-user-key'] = this.userKey;
          }

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);

          try {
            const response = await fetch(`${this.API_BASE_URL}/messages`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                message: messageText,
                conversationId: this.conversationId
              }),
              signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(
                errorData.error || `HTTP ${response.status}: ${response.statusText}`
              );
            }

            const data = await response.json() as ChatResponse;

            // Update state with new values
            if (data.user?.key) {
              this.userKey = data.user.key;
            }
            if (data.conversation?.id) {
              this.conversationId = data.conversation.id;
            }
            this.saveState();

            return data;
          } catch (error) {
            clearTimeout(timeoutId);
            
            if (error instanceof Error) {
              if (error.name === 'AbortError') {
                throw new Error('Request timeout. The server took too long to respond.');
              }
              throw error;
            }
            throw new Error('Network error. Please check your connection.');
          }
        },
        retries,
        1000,
        backoffMultiplier
      );
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Queue a message for processing
   */
  async queueMessage(messageText: string): Promise<ChatResponse> {
    this.messageQueue.push(messageText);
    return this.processQueue();
  }

  /**
   * Process message queue sequentially
   */
  private async processQueue(): Promise<ChatResponse> {
    if (this.isProcessing || this.messageQueue.length === 0) {
      return Promise.reject(new Error('Queue is empty or already processing'));
    }

    this.isProcessing = true;
    let lastResponse: ChatResponse | null = null;

    try {
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message) {
          lastResponse = await this.sendMessage(message);
        }
      }
    } finally {
      this.isProcessing = false;
    }

    return lastResponse || Promise.reject(new Error('No messages processed'));
  }

  /**
   * Check if the service is connected
   */
  async isConnected(): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE_URL.replace('/messages', '')}/health`, {
        method: 'GET',
        timeout: 5000
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Reset the chat session
   */
  resetChat() {
    this.userKey = null;
    this.conversationId = null;
    this.messageQueue = [];
    this.isProcessing = false;
    localStorage.removeItem('chatState');
  }

  /**
   * Get current session info
   */
  getSessionInfo() {
    return {
      hasUserKey: !!this.userKey,
      hasConversationId: !!this.conversationId,
      queueLength: this.messageQueue.length,
      isProcessing: this.isProcessing
    };
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }
}

export const chatService = ChatService.getInstance();
