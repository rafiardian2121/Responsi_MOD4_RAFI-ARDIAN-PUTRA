import { useState } from "react";
import { Plus, Trash2, Calendar, Clock } from 'lucide-react';

export default function LogWorkout() {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [logs, setLogs] = useState(JSON.parse(localStorage.getItem("workout_logs") || "[]"));

  const addWorkout = () => {
    if (!exercise || !duration) return alert("Lengkapi data latihan!");

    const newEntry = {
      id: Date.now(),
      exercise,
      duration: Number(duration),
      date,
    };

    const updatedLogs = [...logs, newEntry];
    localStorage.setItem("workout_logs", JSON.stringify(updatedLogs));
    setLogs(updatedLogs);

    setExercise("");
    setDuration("");
  };

  const deleteWorkout = (id) => {
    const updatedLogs = logs.filter(log => log.id !== id);
    localStorage.setItem("workout_logs", JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Log Latihan</h1>
        <p className="text-gray-600">Catat sesi latihanmu hari ini</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Latihan</label>
          <input
            type="text"
            placeholder="Push Up, Squat, Running..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (menit)</label>
          <input
            type="number"
            placeholder="30"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={addWorkout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Latihan</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-xl text-gray-800 mb-4">Riwayat Latihan</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada latihan tercatat</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{log.exercise}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{log.duration} menit</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{log.date}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteWorkout(log.id)}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
