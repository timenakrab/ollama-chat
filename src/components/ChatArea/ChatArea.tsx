import { ChatAreaProps } from '@/types/components';
import React, { forwardRef } from 'react';

const ChatArea = forwardRef<HTMLDivElement, ChatAreaProps>(
  ({ messages, showExamples, exampleMessages, handleExampleClick, formatTimestamp }, ref) => {
    return (
      <div ref={ref} className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {showExamples ? (
          <div className="grid grid-cols-2 gap-4">
            {exampleMessages.map((message, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(message)}
                className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg text-white text-left hover:bg-opacity-30 transition-colors"
              >
                {message}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-blue-500'
                      : 'bg-white bg-opacity-20 backdrop-blur-sm'
                  }`}
                >
                  {message.text}
                  {message.image && (
                    <img src={message.image} alt="Shared" className="mt-2 rounded-lg max-w-full h-auto" />
                  )}
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ChatArea.displayName = 'ChatArea';

export default ChatArea;