import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const medals = ['🥇', '🥈', '🥉'];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Activity'));
        const scoreMap = new Map();

        querySnapshot.forEach(doc => {
          const { username, Score } = doc.data();
          const numericScore = parseInt(Score.split('/')[0]);
          if (!scoreMap.has(username)) {
            scoreMap.set(username, numericScore);
          } else {
            scoreMap.set(username, scoreMap.get(username) + numericScore);
          }
        });

        const sorted = Array.from(scoreMap.entries())
          .map(([username, total]) => ({ username, score: total }))
          .sort((a, b) => b.score - a.score);

        setLeaderboardData(sorted);
      } catch (error) {
        console.error('❌ Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#02010a] text-white font-sans flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-10 animate-pulse tracking-widest">
        🏆 Leaderboard
      </h1>

      <div className="w-full max-w-3xl">
        <table className="w-full table-auto border border-cyan-400/30 rounded-lg overflow-hidden bg-white/5 text-white">
          <thead className="bg-cyan-400 text-black">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr
                key={index}
                className={`border-t border-cyan-400/20 ${
                  index % 2 === 0 ? 'bg-white/10' : 'bg-white/5'
                }`}
              >
                <td className="py-3 px-4">
                  {index < 3 ? (
                    <span className="text-xl">{medals[index]}</span>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="py-3 px-4">{entry.username}</td>
                <td className="py-3 px-4">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-10 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
      >
        ← Back to Main Menu
      </button>
    </div>
  );
};

export default Leaderboard;
