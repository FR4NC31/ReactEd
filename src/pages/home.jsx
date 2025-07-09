// src/App.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Circle = ({ size, top, left, delay }) => (
  <div
    className="absolute rounded-full border-2 border-cyan-400/30 animate-ping"
    style={{ width: size, height: size, top, left, animationDelay: delay }}
  ></div>
);

const Modal = ({ title, fields, visible, onClose, onSubmit }) => {
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
    onSubmit(inputs);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg w-96 border border-cyan-400/30 shadow-lg">
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
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
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

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg border border-red-400 w-96 text-center">
        <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-400 px-4 py-2 rounded text-black hover:bg-red-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const SuccessModal = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#02010a] text-white p-6 rounded-lg border border-green-400 w-96 text-center">
        <h2 className="text-xl font-bold text-green-400 mb-4">Success</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-400 px-4 py-2 rounded text-black hover:bg-green-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
    } catch {
      setError('Incorrect email or password.');
    }
  };

  const handleRegister = async ([email, username, password, confirmPassword]) => {
    if (!email || !username || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'Student', userCredential.user.uid), {
        username,
        email,
        uid: userCredential.user.uid
      });
      localStorage.setItem('username', username);
      setShowRegister(false);
      setSuccess('Successfully registered!');
      signOut(auth); // Stay logged out after registration
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already exists.');
      } else {
        setError('Registration failed.');
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem('username');
  };

  return (
    <div className="min-h-screen w-full font-sans bg-[#02010a] text-white overflow-hidden relative">
      <div className="absolute w-full h-full">
        <Circle size="100px" top="40%" left="45%" delay="0s" />
        <Circle size="120px" top="55%" left="30%" delay="1s" />
        <Circle size="140px" top="20%" left="60%" delay="2s" />
        <Circle size="80px" top="70%" left="70%" delay="3s" />
        <Circle size="110px" top="35%" left="75%" delay="4s" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl tracking-[0.3em] mb-6 text-cyan-300 animate-pulse">
          ReactEd
        </h1>

        {user && (
          <p className="mb-6 text-lg">
            Welcome <span className="text-cyan-300 font-semibold">{username}</span>!
          </p>
        )}

        {user ? (
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            <button
              onClick={() => navigate('/lesson')}
              className="border-2 border-cyan-400 px-8 py-3 rounded-full text-lg hover:bg-cyan-400 hover:text-black transition"
            >
              ▶ Play
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="border-2 border-cyan-400 px-8 py-3 rounded-full text-lg hover:bg-cyan-400 hover:text-black transition"
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={handleLogout}
              className="border-2 border-red-400 px-8 py-3 rounded-full text-lg hover:bg-red-400 hover:text-black transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            <button
              onClick={() => setShowLogin(true)}
              className="border-2 border-cyan-400 px-8 py-3 rounded-full text-lg hover:bg-cyan-400 hover:text-black transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="border-2 border-cyan-400 px-8 py-3 rounded-full text-lg hover:bg-cyan-400 hover:text-black transition"
            >
              Register
            </button>
          </div>
        )}
      </div>

      <Modal
        title="Login"
        fields={[
          { placeholder: 'Email', type: 'email' },
          { placeholder: 'Password', type: 'password' }
        ]}
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onSubmit={handleLogin}
      />

      <Modal
        title="Register"
        fields={[
          { placeholder: 'Email', type: 'email' },
          { placeholder: 'Username', type: 'text' },
          { placeholder: 'Password', type: 'password' },
          { placeholder: 'Confirm Password', type: 'password' }
        ]}
        visible={showRegister}
        onClose={() => setShowRegister(false)}
        onSubmit={handleRegister}
      />

      <ErrorModal message={error} onClose={() => setError('')} />
      <SuccessModal message={success} onClose={() => setSuccess('')} />
    </div>
  );
}

export default App;
