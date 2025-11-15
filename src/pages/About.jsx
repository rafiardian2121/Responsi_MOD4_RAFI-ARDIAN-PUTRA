import { Users, Target, Zap } from "lucide-react";

export default function About() {
  const profile = {
    name: "Rafi Ardian Putra",
    nim: "21120123140122",
    group: "17",
  };

  const features = [
    {
      icon: Target,
      title: "Simple & Focused",
      desc: "Interface yang mudah dan fokus pada tracking workout",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      desc: "Performa cepat dengan teknologi modern",
    },
    {
      icon: Users,
      title: "User Friendly",
      desc: "Dirancang untuk semua level fitness",
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">About</h1>
        <p className="text-gray-600">Profil & Tentang Aplikasi</p>
      </div>

      {/* About App */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Workout Tracker</h2>
        <p className="text-blue-50 leading-relaxed">
          Workout Tracker adalah aplikasi latihan fisik berbasis PWA yang
          dirancang untuk membantu kamu mencatat dan memantau progres latihan
          harian dengan mudah. Aplikasi ini dapat digunakan secara offline dan
          menyimpan data secara lokal untuk kemudahan akses kapan saja.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg w-fit mb-4">
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Profile Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Profil</h2>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700 w-24">Nama</span>
            <span className="text-gray-800">{profile.name}</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700 w-24">NIM</span>
            <span className="text-gray-800">{profile.nim}</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700 w-24">Kelompok</span>
            <span className="text-gray-800">{profile.group}</span>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Workout Tracker • Built with React + Vite
        </p>
      </div>
    </div>
  );
}
