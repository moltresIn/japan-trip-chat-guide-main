/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ChatInterface from "@/components/ChatInterface";
import TravelHeader from "@/components/TravelHeader";
import VisualPanel from "@/components/VisualPanel";

// Sample data for our chat flow
const chatSteps = [
  {
    id: 0,
    message:
      "Hi there! I'm your Japan travel guide. I see you're planning a 4-day trip to Tokyo and Kyoto. Based on your preferences for adventure, culture, and history, I've got some exciting recommendations for you!",
    options: [
      { id: "start", text: "Great! Show me your recommendations", next: 1 },
    ],
    delay: 500,
  },
  {
    id: 1,
    message: (
      <>
        <p className="mb-2">
          I have two fantastic activities that match your interests:
        </p>
        <p className="mb-2">
          <strong>Option 1: Tokyo MariCar Go-Karting</strong> in Shibuya - Race
          through the streets of Tokyo dressed as your favorite character! It's
          an adrenaline-packed adventure and a unique way to see the city's
          highlights.
        </p>
        <p>
          <strong>Option 2: Traditional Tea Ceremony</strong> in a historic Gion
          teahouse in Kyoto - Experience centuries-old traditions guided by a
          tea master in one of Kyoto's most preserved historic districts.
        </p>
        <p className="mt-2">Which one appeals to you more?</p>
      </>
    ),
    options: [
      {
        id: "tokyo",
        text: "The Go-Karting in Tokyo sounds exciting!",
        next: 2,
        response:
          "Great choice! Racing through Tokyo's streets offers an exciting adventure with amazing city views. It's truly unforgettable!",
        action: "select_tokyo",
      },
      {
        id: "kyoto",
        text: "I'd love to experience the Tea Ceremony in Kyoto",
        next: 2,
        response:
          "Excellent! The tea ceremony offers a peaceful immersion into centuries of Japanese tradition. You'll learn authentic techniques in a historic setting.",
        action: "select_kyoto",
      },
    ],
    delay: 1000,
  },
  {
    id: 2,
    message: (
      <>
        <p className="mb-2">
          Perfect! Based on your preference, I've created a full 4-day itinerary
          that includes your chosen activity plus complementary experiences:
        </p>
        <p className="mb-2">For Tokyo (Days 1-2):</p>
        <ul className="list-disc pl-5 mb-2">
          <li>MariCar Go-Karting adventure</li>
          <li>Teamlab Planets digital art museum</li>
        </ul>
        <p className="mb-2">For Kyoto (Days 3-4):</p>
        <ul className="list-disc pl-5 mb-2">
          <li>Traditional Tea Ceremony in Gion</li>
          <li>Arashiyama Bamboo Grove and Monkey Park</li>
        </ul>
        <p className="mt-2">
          Would you like to confirm these activities for your trip?
        </p>
      </>
    ),
    options: [
      {
        id: "confirm",
        text: "Yes, confirm my itinerary!",
        next: 3,
        response:
          "Wonderful! Your 4-day Japan adventure is now confirmed. I've created your complete itinerary with all activity details, locations and recommended times.",
        action: "confirm",
      },
      {
        id: "changes",
        text: "I'd like to make some changes",
        next: 1,
        response:
          "No problem! Let's revise the plan. What would you like to change?",
      },
    ],
    delay: 1000,
  },
  {
    id: 3,
    message:
      "Your itinerary is confirmed! You can download the complete details or share it with your travel companion. Have a wonderful trip to Japan!",
    delay: 1000,
  },
];

// Activity data
const initialActivities = [
  {
    id: "tokyo_karting",
    title: "MariCar Go-Karting",
    location: "Shibuya, Tokyo",
    description:
      "Race through the streets of Tokyo in costume on this unique go-karting adventure. See iconic landmarks from a thrilling perspective!",
    image:
      "https://images.unsplash.com/photo-1566139884330-f03bebb4264a?auto=format&fit=crop&q=80",
    tags: ["Adventure", "Urban", "Unique"],
    day: 1,
  },
  {
    id: "kyoto_tea",
    title: "Traditional Tea Ceremony",
    location: "Gion, Kyoto",
    description:
      "Experience the art of Japanese tea ceremony in a historic teahouse in Kyoto's most beautiful geisha district.",
    image:
      "https://images.unsplash.com/photo-1576086776736-4da2ad40337d?auto=format&fit=crop&q=80",
    tags: ["Cultural", "Historic", "Serene"],
    day: 3,
  },
];

const secondaryActivities = [
  {
    id: "tokyo_teamlab",
    title: "teamLab Planets",
    location: "Toyosu, Tokyo",
    description:
      "Immerse yourself in this digital art museum where art and your body have no boundaries. Walk through water, touch floating flowers, and become one with art.",
    image:
      "https://images.unsplash.com/photo-1605030753481-bb38b08c384a?auto=format&fit=crop&q=80",
    tags: ["Art", "Modern", "Immersive"],
    day: 2,
  },
  {
    id: "kyoto_arashiyama",
    title: "Arashiyama Bamboo Grove",
    location: "Arashiyama, Kyoto",
    description:
      "Wander through the enchanting bamboo forest and visit the adjacent monkey park for stunning views of Kyoto and up-close encounters with Japanese macaques.",
    image:
      "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?auto=format&fit=crop&q=80",
    tags: ["Nature", "Scenic", "Wildlife"],
    day: 4,
  },
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [confirmedActivities, setConfirmedActivities] = useState<any[]>([]);

  const handleOptionSelect = (option: any) => {
    if (option.action === "select_tokyo") {
      setSelectedActivity("tokyo_karting");
    } else if (option.action === "select_kyoto") {
      setSelectedActivity("kyoto_tea");
    }

    if (option.next !== undefined) {
      setStep(option.next);
    }
  };

  const handleConfirmActivities = () => {
    const selected = initialActivities.find((a) => a.id === selectedActivity);
    if (selected) {
      const allActivities = [selected, ...secondaryActivities];
      setConfirmedActivities(allActivities);
      setStep(3);
    }
  };

  const handleDownloadItinerary = () => {
    toast.success("Itinerary downloaded successfully!");
  };

  useEffect(() => {
    // Welcome toast
    setTimeout(() => {
      toast("Welcome to your Japan trip planner!", {
        description: "Customize your perfect 4-day adventure in Tokyo & Kyoto",
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TravelHeader />

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Chat Interface (Left Column) */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0 overflow-hidden flex flex-col">
          <ChatInterface
            onOptionSelect={handleOptionSelect}
            onConfirmActivities={handleConfirmActivities}
            chatSteps={chatSteps}
          />
        </div>

        {/* Visual Panel (Right Column) */}
        <div className="w-full md:w-1/2 lg:w-3/5 overflow-hidden">
          <VisualPanel
            step={step}
            selectedActivity={selectedActivity}
            confirmedActivities={confirmedActivities}
            initialActivities={initialActivities}
            secondaryActivities={secondaryActivities}
            onConfirm={handleDownloadItinerary}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
