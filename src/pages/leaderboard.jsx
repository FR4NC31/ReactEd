import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { FaMedal } from 'react-icons/fa';
import ParticleBackground from './components/ParticleBackground';
import TopScoreSound from '../assets/topscore.mp3';
import BackSound from '../assets/click.mp3';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const topScoreAudio = useRef(null);
  const backAudio = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username') || 'Guest';
      setCurrentUser(username);

      try {
        const snapshot = await getDocs(collection(db, 'StudentProgress'));
        const data = snapshot.docs.map((doc) => {
          const info = doc.data();
          const total = [
            info.lesson1?.score || 0,
            info.lesson2?.score || 0,
            info.lesson3?.score || 0,
            info.lesson4?.score || 0,
            info.lesson5?.score || 0
          ].reduce((sum, val) => sum + Number(val), 0);
          return {
            username: info.username || 'Unknown',
            totalScore: total
          };
        });

        const sorted = data.sort((a, b) => b.totalScore - a.totalScore);
        setUsers(sorted);

        // Attempt to play top score sound after slight delay
        setTimeout(() => {
          topScoreAudio.current?.play().catch(() => {
            console.warn('🔇 Top score sound blocked until user interacts.');
          });
        }, 600);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    backAudio.current.currentTime = 0;
    backAudio.current.play().catch(() => {});
    setTimeout(() => navigate('/'), 300);
  };

  const getMedal = (index) => {
    if (index === 0) return <FaMedal className="text-yellow-400" />;
    if (index === 1) return <FaMedal className="text-gray-300" />;
    if (index === 2) return <FaMedal className="text-orange-500" />;
    return index + 1;
  };

  return (
    <div className="relative min-h-screen bg-[#02010a] text-white font-sans overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-cyan-300 mb-8">
          🏆 Leaderboard
        </h1>

        <div className="overflow-x-auto max-w-4xl mx-auto shadow-xl border border-cyan-400 rounded-xl bg-white/10 backdrop-blur-md">
          <table className="w-full text-left table-auto">
            <thead className="bg-cyan-900 text-cyan-300">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Name</th>
                <th className="p-3">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b border-white/10 ${
                    user.username === currentUser
                      ? 'bg-cyan-800/40 font-semibold text-cyan-100'
                      : 'hover:bg-white/10'
                  } transition`}
                >
                  <td className="p-3 text-center">{getMedal(index)}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-full transition"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Sounds */}
      <audio ref={topScoreAudio} src={TopScoreSound} preload="auto" />
      <audio ref={backAudio} src={BackSound} preload="auto" />
    </div>
  );
};

export default Leaderboard;
