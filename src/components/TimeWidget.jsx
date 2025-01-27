import { useState, useEffect } from "react";

const TimeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/\s+/g, " ");
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed left-8 top-14 p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl min-w-[200px] hover:bg-white/15 transition-all duration-300">
      <div className="text-5xl font-light tracking-tight mb-2">
        {formatTime(currentTime)}
      </div>
      <div className="text-base font-light opacity-90">
        {formatDate(currentTime)}
      </div>
    </div>
  );
};

export default TimeWidget;
