import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Lesson from "./pages/lesson"

import Lesson1 from "./pages/lessons/lesson1.jsx"
import Lesson2 from "./pages/lessons/lesson2.jsx"

import Activity1 from "./pages/activities/activity1.jsx"
import Activity2 from "./pages/activities/activity2.jsx"

import Leaderboard from "./pages/leaderboard.jsx"

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson" element={<Lesson />} />
      <Route path="/lesson/1" element={<Lesson1 />} />
      <Route path="/lesson/2" element={<Lesson2 />} />
      <Route path="/activity/1" element={<Activity1 />} />
      <Route path="/activity/2" element={<Activity2 />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
   </Router>
  )
}

export default App
