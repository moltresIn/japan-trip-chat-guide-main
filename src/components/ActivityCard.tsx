
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Check } from "lucide-react";

interface ActivityCardProps {
  title: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  selected?: boolean;
  day?: number;
  onClick?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  location,
  description,
  image,
  tags,
  selected = false,
  day,
  onClick
}) => {
  return (
    <Card className={`activity-card overflow-hidden ${selected ? 'ring-2 ring-accent shadow-lg' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {day && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium shadow-sm">
            Day {day}
          </div>
        )}
        {selected && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground p-1 rounded-full shadow-sm">
            <Check size={16} />
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold line-clamp-1">{title}</CardTitle>
        </div>
        <CardDescription className="flex items-center text-xs mt-1">
          <MapPin size={12} className="mr-1" /> {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag, i) => (
            <Badge key={i} variant={tag === "Adventure" ? "default" : tag === "Cultural" ? "secondary" : "outline"} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {onClick && (
        <CardFooter className="p-4 pt-0">
          <Button 
            variant={selected ? "default" : "outline"} 
            size="sm" 
            className="w-full"
            onClick={onClick}
          >
            {selected ? "Selected" : "Choose this"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ActivityCard;
