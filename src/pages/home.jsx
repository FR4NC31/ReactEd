// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FiEye, FiEyeOff, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import Logo1 from '../assets/logo1.png';
import clickSoundFile from '../assets/click.mp3';

// Modal for Login/Register
const Modal = ({ title, fields, visible, onClose, onSubmit, playClick, showForgot }) => {
  const [inputs, setInputs] = useState(Array(fields.length).fill(''));
  const [showPasswords, setShowPasswords] = useState(fields.map(() => false));

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const togglePassword = (index) => {
    setShowPasswords((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    onSubmit(inputs);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg w-11/12 max-w-md border border-cyan-400/30 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-cyan-300">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <input
                type={
                  field.type === 'password'
                    ? showPasswords[index]
                      ? 'text'
                      : 'password'
                    : field.type
                }
                placeholder={field.placeholder}
                value={inputs[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full border border-cyan-400/20 bg-transparent px-3 py-2 rounded text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-10"
                required
              />
              {field.type === 'password' && (
                <button
                  type="button"
                  onClick={() => togglePassword(index)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-200"
                >
                  {showPasswords[index] ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              )}
            </div>
          ))}
          {showForgot && (
            <p
              onClick={showForgot}
              className="text-sm text-cyan-400 hover:underline cursor-pointer text-right"
            >
              Forgot Password?
            </p>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="text-red-400 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-400 text-black px-4 py-2 rounded hover:bg-cyan-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Error Modal
const ErrorModal = ({ message, onClose, playClick }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg border border-red-400 w-11/12 max-w-md text-center">
        <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="bg-red-400 px-4 py-2 rounded text-black hover:bg-red-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Success Modal
const SuccessModal = ({ message, onClose, playClick }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg border border-green-400 w-11/12 max-w-md text-center">
        <h2 className="text-xl font-bold text-green-400 mb-4">Success</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="bg-green-400 px-4 py-2 rounded text-black hover:bg-green-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// Forgot Password Modal
const ForgotPasswordModal = ({ visible, onClose, playClick }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    playClick();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email.');
    } catch (err) {
      setMessage('Failed to send reset email. Check your email address.');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg border border-cyan-400 w-11/12 max-w-md text-center">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-cyan-400/20 bg-transparent px-3 py-2 rounded text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-cyan-400 text-black px-4 py-2 rounded hover:bg-cyan-300 w-full"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-cyan-300">{message}</p>}
        <button
          onClick={() => {
            playClick();
            onClose();
            setMessage('');
            setEmail('');
          }}
          className="mt-4 text-red-400 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main App
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const navigate = useNavigate();
  const clickSound = useRef(new Audio(clickSoundFile));

  const playClick = () => {
    if (soundOn) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'Student', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const name = docSnap.data().username || '';
          setUsername(name);
          localStorage.setItem('username', name);
        }
      } else {
        setUser(null);
        setUsername('');
        localStorage.removeItem('username');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async ([email, password]) => {
    if (!email || !password) return setError('Please fill in both fields.');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
    } catch {
      setError('Incorrect email or password.');
    }
  };

  const handleRegister = async ([email, username, password, confirmPassword]) => {
    if (!email || !username || !password || !confirmPassword)
      return setError('All fields are required.');
    if (password !== confirmPassword) return setError('Passwords do not match!');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'Student', userCredential.user.uid), {
        username,
        email,
        uid: userCredential.user.uid,
      });
      localStorage.setItem('username', username);
      setShowRegister(false);
      setSuccess('Successfully registered!');
      signOut(auth);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already exists.');
      } else {
        setError('Registration failed.');
      }
    }
  };

  const handleLogout = () => {
    playClick();
    signOut(auth);
    localStorage.removeItem('username');
  };

  return (
    <div className="min-h-screen w-full font-sans bg-[#02010a] text-white overflow-hidden relative">
      <ParticleBackground />

      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => {
            playClick();
            setSoundOn(!soundOn);
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-cyan-300"
        >
          {soundOn ? <FiVolume2 size={22} /> : <FiVolumeX size={22} />}
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <img src={Logo1} alt="App Logo" className="mx-auto mb-8 w-32 sm:w-40 object-contain" />
        {user && (
          <p className="mb-6 text-base sm:text-lg">
            Welcome <span className="text-cyan-300 font-semibold">{username}</span>!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {user ? (
            <>
              <button
                onClick={() => {
                  playClick();
                  navigate('/lesson');
                }}
                className="w-full px-6 py-3 rounded-full text-base sm:text-lg font-semibold border-2 border-cyan-400 bg-transparent hover:bg-cyan-400 hover:text-black transition"
              >
                ▶ Play
              </button>
              <button
                onClick={() => {
                  playClick();
                  navigate('/leaderboard');
                }}
                className="w-full px-6 py-3 rounded-full text-base sm:text-lg font-semibold border-2 border-cyan-400 bg-transparent hover:bg-cyan-400 hover:text-black transition"
              >
                🏆 Leaderboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-full text-base sm:text-lg font-semibold border-2 border-red-400 bg-transparent hover:bg-red-400 hover:text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  playClick();
                  setShowLogin(true);
                }}
                className="w-full px-6 py-3 rounded-full md:ml-30 text-base sm:text-lg font-semibold border-2 border-cyan-400 bg-transparent hover:bg-cyan-400 hover:text-black transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  playClick();
                  setShowRegister(true);
                }}
                className="w-full px-6 py-3 rounded-full md:ml-30 text-base sm:text-lg font-semibold border-2 border-cyan-400 bg-transparent hover:bg-cyan-400 hover:text-black transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Login"
        fields={[
          { placeholder: 'Email', type: 'email' },
          { placeholder: 'Password', type: 'password' },
        ]}
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onSubmit={handleLogin}
        playClick={playClick}
        showForgot={() => {
          setShowLogin(false);
          setShowForgotModal(true);
        }}
      />

      <Modal
        title="Register"
        fields={[
          { placeholder: 'Email', type: 'email' },
          { placeholder: 'Username', type: 'text' },
          { placeholder: 'Password', type: 'password' },
          { placeholder: 'Confirm Password', type: 'password' },
        ]}
        visible={showRegister}
        onClose={() => setShowRegister(false)}
        onSubmit={handleRegister}
        playClick={playClick}
      />

      <ErrorModal message={error} onClose={() => setError('')} playClick={playClick} />
      <SuccessModal message={success} onClose={() => setSuccess('')} playClick={playClick} />
      <ForgotPasswordModal
        visible={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        playClick={playClick}
      />
    </div>
  );
}

export default App;
