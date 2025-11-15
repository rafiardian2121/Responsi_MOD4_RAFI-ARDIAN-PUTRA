import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LogWorkout from "./pages/LogWorkout";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import { useState, useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      console.log("✅ beforeinstallprompt event fired");

      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log("❌ No deferredPrompt available");
      return;
    }

    console.log("📱 Showing install prompt");
    deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;
    console.log("User choice:", choice.outcome);

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLanding && (
        <Navigation showInstall={showInstall} handleInstall={handleInstall} />
      )}
      <div className={!isLanding ? "pb-20 md:pt-20 md:pb-0" : ""}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log" element={<LogWorkout />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
