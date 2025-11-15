import { BarChart3, Calendar, Info, Activity, Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation({ showInstall, handleInstall }) {
  const location = useLocation();
  const currentPage = location.pathname;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { id: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "/log", icon: Activity, label: "Log" },
    { id: "/schedule", icon: Calendar, label: "Jadwal" },
    { id: "/about", icon: Info, label: "About" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:space-x-8 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <Link
                key={item.id}
                to={item.id}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}

          {showInstall && (
            <button
              onClick={handleInstall}
              className="mt-2 w-fit px-4 bg-blue-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
            >
              <Download size={20} />
              Install App
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
