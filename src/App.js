import React, { useState, useMemo } from "react";
import {
  Phone,
  ArrowLeft,
  MapPin,
  Clock,
  AlertTriangle,
  ChevronRight,
  BatteryCharging,
  Wifi,
  Signal,
  Lightbulb,
  Calendar,
  Award,
  Shield,
  Gauge,
  Hand,
  CornerRightDown,
  Waves,
  Car,
  Wind,
  Trophy,
} from "lucide-react";

const weeklyDriverData = {
  driverName: "John D.",
  period: "June 2 - June 8, 2025",
  overallRating: "Excellent",
  topAchievement: {
    icon: Trophy,
    title: "5-Day Safe Streak!",
    description:
      "You maintained an 'Excellent' or 'Good' rating for four consecutive days. Fantastic consistency!",
  },
  focusAreas: [
    {
      type: "Hard Braking",
      icon: Hand,
      suggestion:
        "Try to increase your following distance in heavy traffic to allow for smoother, more gradual stops, especially during peak hours.",
    },
    {
      type: "Speed Management",
      icon: Gauge,
      suggestion:
        "Great job on highways this week. Let's focus on maintaining steady speeds on arterial roads next.",
    },
  ],
  dailyOverallSafety: [
    "excellent",
    "excellent",
    "good",
    "excellent",
    "needs-attention",
    "good",
    null,
  ],
  days: [
    {
      day: "Monday",
      date: "June 2, 2025",
      rating: "Excellent",
      trips: [
        {
          id: "M1",
          time: "8:05 AM",
          duration: "45 min",
          route: "Concord Depot to 1 King St W",
          events: [],
        },
        {
          id: "M2",
          time: "2:30 PM",
          duration: "55 min",
          route: "1 King St W to Concord Depot",
          events: [],
        },
      ],
    },
    {
      day: "Tuesday",
      date: "June 3, 2025",
      rating: "Excellent",
      trips: [
        {
          id: "T1",
          time: "7:55 AM",
          duration: "40 min",
          route: "Concord Depot to Liberty Village",
          events: [],
        },
        {
          id: "T2",
          time: "11:10 AM",
          duration: "20 min",
          route: "Liberty Village to Fort York",
          events: [],
        },
        {
          id: "T3",
          time: "4:00 PM",
          duration: "65 min",
          route: "Fort York to Concord Depot",
          events: [],
        },
      ],
    },
    {
      day: "Wednesday",
      date: "June 4, 2025",
      rating: "Good",
      trips: [
        {
          id: "W1",
          time: "9:00 AM",
          duration: "50 min",
          route: "Concord Depot to Union Station",
          events: [
            {
              type: "Speeding",
              severity: "moderate",
              details:
                "Travelled 88 km/h (limit 60 km/h) for 35 seconds on the Don Valley Parkway.",
            },
          ],
        },
        {
          id: "W2",
          time: "3:45 PM",
          duration: "70 min",
          route: "Union Station to Concord Depot",
          events: [],
        },
      ],
    },
    {
      day: "Thursday",
      date: "June 5, 2025",
      rating: "Excellent",
      trips: [
        {
          id: "TH1",
          time: "10:20 AM",
          duration: "35 min",
          route: "Concord Depot to Yorkdale Mall",
          events: [],
        },
      ],
    },
    {
      day: "Friday",
      date: "June 6, 2025",
      rating: "Needs Attention",
      trips: [
        {
          id: "F1",
          time: "7:30 AM",
          duration: "15 min",
          route: "Yard Movement",
          events: [
            {
              type: "Hard Braking",
              severity: "high",
              details: "Pre-trip brake check flagged in yard.",
            },
          ],
        },
        {
          id: "F2",
          time: "1:00 PM",
          duration: "60 min",
          route: "Concord Depot to Sherway Gardens",
          events: [
            {
              type: "Hard Braking",
              severity: "high",
              details:
                "Sudden deceleration detected on Gardiner Expy near Spadina Ave.",
            },
            {
              type: "Sharp Turn",
              severity: "moderate",
              details: "Abrupt turn detected at Queen St W & Ossington Ave.",
            },
          ],
        },
      ],
    },
    {
      day: "Saturday",
      date: "June 7, 2025",
      rating: "Good",
      trips: [
        {
          id: "S1",
          time: "9:45 AM",
          duration: "30 min",
          route: "Concord Depot to a local site",
          events: [],
        },
      ],
    },
    {
      day: "Sunday",
      date: "June 8, 2025",
      rating: "Not Rated",
      trips: [],
    },
  ],
};

const RatingIndicator = ({ rating }) => {
  const styles = {
    Excellent: "bg-green-500",
    Good: "bg-yellow-500",
    "Needs Attention": "bg-red-500",
    "High Risk": "bg-red-500",
    "Not Rated": "bg-gray-300",
  };
  return (
    <div
      className={`w-3 h-3 rounded-full ${styles[rating] || "bg-gray-400"}`}
    />
  );
};

const EventTag = ({ event }) => {
  const styles = {
    low: "border-yellow-400 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
    moderate:
      "border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
    high: "border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20",
  };
  const style = styles[event.severity] || styles.low;
  return (
    <div
      className={`flex items-center text-sm font-medium px-2 py-1 rounded-full border ${style}`}
    >
      <AlertTriangle size={14} className="mr-1.5" />
      {event.type}
    </div>
  );
};

const SafetyBarChart = ({ title, data }) => {
  const ratingStyles = {
    excellent: { height: "h-24", color: "bg-green-500" },
    good: { height: "h-16", color: "bg-yellow-500" },
    "needs-attention": { height: "h-8", color: "bg-red-500" },
  };
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div>
      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">
        {title}
      </h4>
      <div className="flex justify-between items-end h-32 px-2 pt-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {daysOfWeek.map((day, i) => {
          const rating = data[i];
          const style = rating
            ? ratingStyles[rating]
            : { height: "h-2", color: "bg-gray-300 dark:bg-gray-600" };
          return (
            <div key={i} className="flex flex-col items-center w-full">
              <div
                className={`${style.height} ${style.color} w-3/4 rounded-t-md transition-all duration-500`}
              ></div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">
                {day}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DayAccordion = ({ dayData, onTripSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center">
          <RatingIndicator rating={dayData.rating} />
          <div className="ml-4">
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {dayData.day}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {dayData.date}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {dayData.trips.reduce((acc, trip) => acc + trip.events.length, 0) >
            0 && <AlertTriangle size={20} className="text-yellow-500 mr-3" />}
          <ChevronRight
            size={24}
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          {dayData.trips.length > 0 ? (
            dayData.trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => onTripSelect(trip, dayData)}
                className="w-full text-left py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md px-2 -mx-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    {trip.time}{" "}
                    <span className="text-gray-500 font-normal">
                      ({trip.duration})
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    {trip.events.map((e, i) => (
                      <EventTag key={i} event={e} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>{trip.route}</span>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4 text-base">
              No trips recorded for this day.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const TripDetailsView = ({ trip, day, onBack }) => (
  <div className="w-full h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 z-10 p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft size={22} />
      </button>
      <div className="text-center flex-grow">
        <h1 className="font-bold text-xl">Trip Details</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {day.date} • {trip.time}
        </p>
      </div>
      <div className="w-8"></div>
    </header>
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
          Route Information
        </h2>
        <div className="space-y-3 text-base">
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin size={18} className="mr-2.5" /> Route
            </span>
            <span className="font-semibold">{trip.route}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock size={18} className="mr-2.5" /> Duration
            </span>
            <span className="font-semibold">{trip.duration}</span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold my-4 text-gray-800 dark:text-white">
        Events on This Trip
      </h2>
      <div className="space-y-3">
        {trip.events.length > 0 ? (
          trip.events.map((event, index) => (
            <div
              key={index}
              className={`border-l-4 rounded-r-lg p-4 ${
                event.severity === "high"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
              }`}
            >
              <div className="flex items-start">
                <div className="p-1.5 bg-white dark:bg-gray-700 rounded-full mr-3 mt-1">
                  <AlertTriangle
                    className={`w-6 h-6 ${
                      event.severity === "high"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                    {event.type}
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {event.details}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold text-lg text-green-800 dark:text-green-200">
              No events on this trip. Great job!
            </p>
          </div>
        )}
      </div>
    </main>
  </div>
);

const WeeklyPerformanceReview = ({ data }) => {
  const [view, setView] = useState("summary"); // 'summary' or 'trip-details'
  const [selectedTripInfo, setSelectedTripInfo] = useState(null);

  const handleSelectTrip = (trip, day) => {
    setSelectedTripInfo({ trip, day });
    setView("trip-details");
  };

  if (view === "trip-details" && selectedTripInfo) {
    return (
      <TripDetailsView
        trip={selectedTripInfo.trip}
        day={selectedTripInfo.day}
        onBack={() => setView("summary")}
      />
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="flex-shrink-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h1 className="font-bold text-xl">Weekly Performance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.period}
          </p>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white flex items-center">
            <Trophy size={22} className="mr-2.5 text-yellow-500" />
            Top Achievement
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {data.topAchievement.description}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
          <SafetyBarChart
            title="Overall Weekly Safety"
            data={data.dailyOverallSafety}
          />
        </div>

        {data.days.map((dayData) => (
          <DayAccordion
            key={dayData.day}
            dayData={dayData}
            onTripSelect={handleSelectTrip}
          />
        ))}

        <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-400 rounded-r-lg p-4 mt-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white flex items-center">
            <Lightbulb size={22} className="mr-2.5 text-gray-500" />
            Tips for Next Week
          </h2>
          <div className="space-y-3">
            {data.focusAreas.map((item, index) => (
              <div key={index}>
                <h4 className="font-semibold text-base text-gray-700 dark:text-gray-200">
                  {item.type}
                </h4>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {item.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const PhoneMockup = ({ children }) => {
  const time = useMemo(
    () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    []
  );
  return (
    <div className="bg-gray-800 border-gray-900 border-[14px] rounded-[60px] shadow-2xl overflow-hidden relative w-full max-w-[375px] h-[812px] mx-auto">
      <div className="absolute top-0 left-0 right-0 h-11 bg-gray-900/50 backdrop-blur-sm z-30 flex justify-between items-center px-8 text-white font-sans text-sm font-medium">
        <div>{time}</div>
        <div className="w-40 h-8 bg-black rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2"></div>
        <div className="flex items-center space-x-2">
          <Signal size={16} /> <Wifi size={16} /> <BatteryCharging size={20} />
        </div>
      </div>
      <div className="w-full h-full bg-white pt-11 dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  return (
    <div className="bg-gray-200 dark:bg-black min-h-screen flex items-center justify-center p-4 font-sans">
      <PhoneMockup>
        <WeeklyPerformanceReview data={weeklyDriverData} />
      </PhoneMockup>
    </div>
  );
}
