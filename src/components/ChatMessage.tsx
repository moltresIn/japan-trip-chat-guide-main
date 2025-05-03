
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type MessageType = "agent" | "user";

interface ChatMessageProps {
  type: MessageType;
  content: string | React.ReactNode;
  timestamp?: string;
  delayed?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  type, 
  content, 
  timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  delayed = false
}) => {
  const [isVisible, setIsVisible] = useState(!delayed);
  
  useEffect(() => {
    if (delayed) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [delayed]);

  if (type === "agent") {
    return (
      <div className={cn(
        "flex gap-3 max-w-full mb-4 chat-message transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/lovable-uploads/3ed28964-b995-401a-85d0-f01ea45ba2a7.png" alt="Guide" />
          <AvatarFallback className="bg-primary text-primary-foreground">JG</AvatarFallback>
        </Avatar>
        <div>
          <div className="bg-muted rounded-lg rounded-tl-none p-4 text-sm shadow-sm">
            {content}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{timestamp}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-row-reverse gap-3 max-w-full mb-4 chat-message transition-opacity duration-300",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="bg-accent text-primary-foreground">You</AvatarFallback>
      </Avatar>
      <div>
        <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-4 text-sm shadow-sm">
          {content}
        </div>
        <div className="text-xs text-muted-foreground mt-1 text-right">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
