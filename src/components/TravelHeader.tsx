
import React from "react";
import { MapPin, Calendar } from "lucide-react";

const TravelHeader = () => {
  return (
    <div className="py-4 px-4 md:px-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Japan Adventure</h1>
          <div className="flex items-center text-sm md:text-base mt-1">
            <MapPin size={16} className="mr-1" />
            <span>Tokyo & Kyoto</span>
            <span className="mx-2">•</span>
            <span>4 Days</span>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm shadow-inner">
        <Calendar size={14} className="mr-1.5" />
        <span>Apr 30 - May 3</span>
      </div>
    </div>
  );
};

export default TravelHeader;
