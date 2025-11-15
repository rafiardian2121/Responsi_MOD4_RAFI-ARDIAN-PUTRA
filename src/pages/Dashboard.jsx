import { Activity, Clock, TrendingUp, Calendar } from "lucide-react";

export default function Dashboard() {
  const logs = JSON.parse(localStorage.getItem("workout_logs") || "[]");

  const totalWorkout = logs.length;
  const totalDuration = logs.reduce((a, b) => a + Number(b.duration), 0);
  const avgDuration =
    totalWorkout > 0 ? Math.round(totalDuration / totalWorkout) : 0;

  const thisWeek = logs.filter((log) => {
    const logDate = new Date(log.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  }).length;

  const stats = [
    {
      icon: Activity,
      label: "Total Latihan",
      value: `${totalWorkout} sesi`,
      color: "bg-blue-500",
    },
    {
      icon: Clock,
      label: "Total Durasi",
      value: `${totalDuration} menit`,
      color: "bg-green-500",
    },
    {
      icon: TrendingUp,
      label: "Rata-rata",
      value: `${avgDuration} menit`,
      color: "bg-orange-500",
    },
    {
      icon: Calendar,
      label: "Minggu Ini",
      value: `${thisWeek} sesi`,
      color: "bg-purple-500",
    },
  ];

  const recentLogs = logs.slice(-5).reverse();

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Ringkasan aktivitas latihanmu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Latihan Terbaru
        </h2>
        {recentLogs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Belum ada latihan. Mulai catat latihanmu!
          </p>
        ) : (
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-800">{log.exercise}</p>
                  <p className="text-sm text-gray-500">{log.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {log.duration} menit
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
