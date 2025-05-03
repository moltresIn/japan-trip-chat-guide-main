
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";
import { Send } from "lucide-react";

interface ChatOption {
  id: string;
  text: string;
  next?: number;
  response?: string;
  action?: string;
}

interface ChatStep {
  id: number;
  message: string | React.ReactNode;
  options?: ChatOption[];
  delay?: number;
}

interface ChatInterfaceProps {
  onOptionSelect: (option: ChatOption) => void;
  onConfirmActivities: () => void;
  chatSteps: ChatStep[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onOptionSelect,
  onConfirmActivities,
  chatSteps
}) => {
  const [messages, setMessages] = useState<Array<{type: "agent" | "user", content: string | React.ReactNode}>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentStep < chatSteps.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { type: "agent", content: chatSteps[currentStep].message }
        ]);
        setShowOptions(true);
      }, chatSteps[currentStep].delay || 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, chatSteps]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionSelect = (option: ChatOption) => {
    setHasSelected(true);
    setShowOptions(false);
    
    setMessages(prev => [
      ...prev,
      { type: "user", content: option.text }
    ]);

    setTimeout(() => {
      if (option.response) {
        setMessages(prev => [
          ...prev,
          { type: "agent", content: option.response }
        ]);
      }
      
      if (option.action === "confirm") {
        onConfirmActivities();
      }

      setHasSelected(false);
      
      if (option.next !== undefined) {
        setCurrentStep(option.next);
      }

      onOptionSelect(option);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with Japan Guide</h2>
        <p className="text-sm text-muted-foreground">Plan your perfect 4-day adventure</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              type={msg.type}
              content={msg.content}
            />
          ))}
          
          {showOptions && !hasSelected && currentStep < chatSteps.length && chatSteps[currentStep].options && (
            <div className="flex flex-col space-y-2 animate-fade-in">
              {chatSteps[currentStep].options?.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="justify-start text-left"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-muted rounded-l-md focus:outline-none"
            disabled
          />
          <Button className="rounded-l-none" disabled>
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This is a demo chat. Please select from the options above.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
