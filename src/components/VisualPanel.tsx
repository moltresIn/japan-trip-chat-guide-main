
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, MapPin } from "lucide-react";
import ActivityCard from "./ActivityCard";

interface Activity {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  day?: number;
}

interface VisualPanelProps {
  step: number;
  selectedActivity: string | null;
  confirmedActivities: Activity[];
  initialActivities: Activity[];
  secondaryActivities: Activity[];
  onConfirm: () => void;
}

const VisualPanel: React.FC<VisualPanelProps> = ({
  step,
  selectedActivity,
  confirmedActivities,
  initialActivities,
  secondaryActivities,
  onConfirm
}) => {
  if (step === 3) {
    // Confirmation step
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 flex-1 overflow-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
              <Check size={24} />
            </div>
            <h2 className="text-2xl font-bold">Your Japan Adventure is Set!</h2>
            <p className="text-muted-foreground mt-2">
              Here's your confirmed 4-day itinerary
            </p>
          </div>

          <div className="space-y-6">
            {confirmedActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                  Day {activity.day}
                </div>
                <div className="flex-1">
                  <Card>
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 h-32 sm:h-auto">
                        <img 
                          src={activity.image} 
                          alt={activity.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
                          <MapPin size={14} className="mr-1" />
                          {activity.location}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t flex justify-between items-center bg-muted/30">
          <div>
            <h3 className="font-medium">Japan Adventure</h3>
            <p className="text-sm text-muted-foreground">4 Days • 4 Activities</p>
          </div>
          <Button onClick={onConfirm}>
            Download Itinerary
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="activities" className="flex-1 flex flex-col">
        <div className="px-4 pt-4 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="activities" className="flex-1">Activities</TabsTrigger>
            <TabsTrigger value="map" className="flex-1">Map</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="activities" className="flex-1 overflow-y-auto p-4 space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-medium">Suggested Activities</h2>
                <p className="text-sm text-muted-foreground">
                  Based on your preferences for adventure, culture, and history
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    location={activity.location}
                    description={activity.description}
                    image={activity.image}
                    tags={activity.tags}
                    selected={activity.id === selectedActivity}
                  />
                ))}
              </div>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-medium">Complete Your Itinerary</h2>
                <p className="text-sm text-muted-foreground">
                  Here are more recommendations to complete your 4-day trip
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialActivities
                  .filter(a => a.id === selectedActivity)
                  .map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      title={activity.title}
                      location={activity.location}
                      description={activity.description}
                      image={activity.image}
                      tags={activity.tags}
                      selected={true}
                      day={activity.id === 'tokyo_karting' ? 1 : 3}
                    />
                  ))}
                
                {secondaryActivities.map((activity, idx) => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    location={activity.location}
                    description={activity.description}
                    image={activity.image}
                    tags={activity.tags}
                    selected={true}
                    day={activity.id.includes('tokyo') ? 2 : 4}
                  />
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="map" className="flex-1 p-0 m-0">
          <div className="h-full p-4 flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Map view coming soon</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisualPanel;
