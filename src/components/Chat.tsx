// src/components/Chat.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader, AlertCircle } from "lucide-react";
import { chatService } from "../Services/chatService";

interface Message {
  text: string;
  sender: "user" | "bot";
  id: string;
  isTyping?: boolean;
  isStreaming?: boolean;
  timestamp?: number;
}

interface ChatProps {
  onClose: () => void;
  initialMessage?: string;
}

const containerVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
};

const Chat = ({ onClose, initialMessage }: ChatProps): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageProcessed = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback(
    (
      text: string,
      sender: "user" | "bot",
      id: string,
      isTyping: boolean = false,
      isStreaming: boolean = false
    ) => {
      setMessages((prev) => [
        ...prev,
        {
          text,
          sender,
          id,
          isTyping,
          isStreaming,
          timestamp: Date.now(),
        },
      ]);
    },
    []
  );

  const updateMessage = useCallback(
    (id: string, text: string, isTyping?: boolean, isStreaming?: boolean) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? { ...msg, text, isTyping, isStreaming }
            : msg
        )
      );
    },
    []
  );

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      try {
        setError(null);
        setIsLoading(true);
        setRetryCount(0);

        // Add user message
        const userMessageId = `user-${Date.now()}`;
        addMessage(messageText, "user", userMessageId);

        // Show typing indicator
        const typingId = `typing-${Date.now()}`;
        addMessage("", "bot", typingId, true, false);

        // Send message to backend with timeout
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
          const response = await chatService.sendMessage(messageText);

          clearTimeout(timeoutId);

          // Remove typing indicator
          setMessages((prev) => prev.filter((msg) => !msg.isTyping));

          // Add bot response with streaming effect
          if (response.botResponse) {
            const botMessageId = response.botResponse.id;
            const botText = response.botResponse.payload.text;
            
            // Add message with streaming effect
            addMessage(botText, "bot", botMessageId, false, true);
            
            // Simulate streaming by updating the message
            setTimeout(() => {
              updateMessage(botMessageId, botText, false, false);
            }, 300);
          } else if (response.messages && response.messages.length > 0) {
            // Find bot message (should be the last one)
            const botMessage = response.messages.find(
              (msg) => msg.userId !== response.user.id
            );
            if (botMessage) {
              addMessage(botMessage.payload.text, "bot", botMessage.id, false, true);
              setTimeout(() => {
                updateMessage(botMessage.id, botMessage.payload.text, false, false);
              }, 300);
            }
          }
        } catch (timeoutError) {
          clearTimeout(timeoutId);
          throw new Error('Request timeout. Please try again.');
        }
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
        
        // Remove typing indicator
        setMessages((prev) => prev.filter((msg) => !msg.isTyping));

        const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
        setError(errorMessage);
        
        addMessage(
          "I'm having trouble connecting. Please try again.",
          "bot",
          `error-${Date.now()}`
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [addMessage, updateMessage]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue("");
    await handleSendMessage(message);
  };

  const handleRetry = async () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
      if (lastUserMessage) {
        setRetryCount(prev => prev + 1);
        await handleSendMessage(lastUserMessage.text);
      }
    }
  };

  // Handle initial message
  useEffect(() => {
    if (initialMessage && !initialMessageProcessed.current) {
      initialMessageProcessed.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, handleSendMessage]);

  const handleClose = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    chatService.resetChat();
    onClose();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-1/2 h-full flex flex-col bg-gray-900/95 backdrop-blur-sm border-l border-emerald-500/20 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20 flex justify-between items-center bg-gradient-to-r from-gray-900/50 to-transparent">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-400 font-mono text-sm">Chat with Aditya</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-gray-800/50 text-emerald-400"
          title="Close chat"
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl transition-all duration-200 ${
                  message.isTyping
                    ? "bg-gray-800/50 text-emerald-400"
                    : message.sender === "user"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-gray-800/50 text-white border border-gray-700/30"
                } ${message.isStreaming ? "animate-pulse" : ""}`}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-0 w-full" />
      </div>

      {/* Error Message with Retry */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          {retryCount < 3 && (
            <button
              onClick={handleRetry}
              className="ml-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs font-medium transition-colors"
            >
              Retry
            </button>
          )}
        </motion.div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-emerald-500/20 bg-gradient-to-t from-gray-900/50 to-transparent"
      >
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim() && !isLoading) {
                  handleSubmit(e);
                }
              }
            }}
            placeholder="Ask about my experience, projects, or skills..."
            className="w-full px-6 py-3 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white text-sm
               placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 
               focus:ring-emerald-500/20 pr-16 transition-all duration-300"
            disabled={isLoading}
            autoFocus
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !inputValue.trim()}
              className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 
                 hover:text-white hover:bg-emerald-500/30 group transition-all duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message (Enter)"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isLoading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <Send
                    className="transform rotate-45 group-hover:text-white transition-colors duration-300"
                    size={20}
                    strokeWidth={2}
                  />
                )}
              </div>
            </motion.button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </form>
    </motion.div>
  );
};

export default Chat;
