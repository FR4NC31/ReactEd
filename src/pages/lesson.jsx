import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

import ParticleBackground from './components/ParticleBackground';

import UnlockSound from '../assets/unlock.mp3';
import ErrorSound from '../assets/error.mp3';
import ClickSound from '../assets/click.mp3';

import Lesson1Img from '../assets/lesson1.png';
import Lesson2Img from '../assets/lesson2.png';
import Lesson3Img from '../assets/lesson3.png';
import Lesson4Img from '../assets/lesson4.png';
import Lesson5Img from '../assets/lesson5.png';

const Lesson = () => {
  const [progress, setProgress] = useState({});
  const [animateUnlock, setAnimateUnlock] = useState(false);
  const navigate = useNavigate();

  const unlockAudio = useRef(new Audio(UnlockSound));
  const errorAudio = useRef(new Audio(ErrorSound));
  const clickAudio = useRef(new Audio(ClickSound));

  const lessonImages = {
    1: Lesson1Img,
    2: Lesson2Img,
    3: Lesson3Img,
    4: Lesson4Img,
    5: Lesson5Img,
  };

  useEffect(() => {
    const fetchProgress = async () => {
      const username = localStorage.getItem('username');
      if (!username) return;

      try {
        const querySnapshot = await getDocs(collection(db, 'StudentProgress'));
        let userDoc = null;

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.username === username) {
            userDoc = data;
          }
        });

        if (userDoc) {
          setProgress(userDoc);
          if (userDoc.lesson2?.unlocked && !userDoc.lesson2?.glowPlayed) {
            setAnimateUnlock(true);
            unlockAudio.current.play().catch(() => {});
            setTimeout(() => setAnimateUnlock(false), 3000);
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    fetchProgress();
  }, []);

  const lessons = [
    { id: 1, title: 'Lesson 1: Signs of a Chemical Reaction' },
    { id: 2, title: 'Lesson 2: Acids, Bases, and Indicators' },
    { id: 3, title: 'Lesson 3: Types of Chemical Reactions' },
    { id: 4, title: 'Lesson 4: Impact of Reactions on Our World' },
    { id: 5, title: 'Lesson 5: Law of Conservation of Mass' },
  ];

  const handleClick = (lesson) => {
    const prevKey = `lesson${lesson.id - 1}`;
    const isUnlocked = lesson.id === 1 || progress[prevKey]?.completed;

    if (isUnlocked) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
      setTimeout(() => navigate(`/lesson/${lesson.id}`), 300);
    } else {
      errorAudio.current.play().catch(() => {});
      const card = document.getElementById(`card-${lesson.id}`);
      if (card) {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 600);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#02010a] text-white px-4 py-10 overflow-hidden">
      <ParticleBackground />

      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2 rounded-full z-20"
      >
        ← Home
      </button>

      <h1 className="text-4xl font-bold text-center text-cyan-300 mb-10 z-10 relative">
        🧪 Choose Your Lesson
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto z-10 relative">
        {lessons.map((lesson) => {
          const lessonKey = `lesson${lesson.id}`;
          const prevKey = `lesson${lesson.id - 1}`;
          const isUnlocked = lesson.id === 1 || progress[prevKey]?.completed;
          const isCompleted = progress[lessonKey]?.completed;
          const score = progress[lessonKey]?.score ?? null;
          const animate = animateUnlock && lesson.id === 2;

          return (
            <div
              key={lesson.id}
              id={`card-${lesson.id}`}
              onClick={() => handleClick(lesson)}
              className={`cursor-pointer border border-cyan-400 rounded-xl shadow-xl overflow-hidden transition hover:scale-105
                ${isUnlocked ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5'}
                ${animate ? 'animate-pulse-glow' : ''}
              `}
            >
              <div
                className="h-40 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${lessonImages[lesson.id]})`,
                  filter: isUnlocked ? 'brightness(1)' : 'brightness(0.5)',
                }}
              >
                {/* Removed lock icon */}
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-cyan-200 mb-1">{lesson.title}</h2>
                {isCompleted && <div className="text-green-400 text-sm">✅ Completed</div>}
                {score !== null && (
                  <div className="text-yellow-300 text-sm mt-1">⭐ Score: {score}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <audio ref={unlockAudio} src={UnlockSound} preload="auto" />
      <audio ref={errorAudio} src={ErrorSound} preload="auto" />
      <audio ref={clickAudio} src={ClickSound} preload="auto" />

      <style>{`
        .shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 1.5s infinite ease-in-out;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(0,255,255,0.4); }
          50% { box-shadow: 0 0 20px rgba(0,255,255,0.8); }
        }
      `}</style>
    </div>
  );
};

export default Lesson;
