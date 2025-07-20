import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Lesson from "./pages/lesson"

import Lesson1 from "./pages/lessons/lesson1.jsx"
import Lesson2 from "./pages/lessons/lesson2.jsx"
import Lesson3 from "./pages/lessons/lesson3.jsx"
import Lesson4 from "./pages/lessons/lesson4.jsx"
import Lesson5 from "./pages/lessons/lesson5.jsx"

import Activity1 from "./pages/activities/activity1.jsx"
import Activity2 from "./pages/activities/activity2.jsx"
import Activity3 from "./pages/activities/activity3.jsx"
import Activity4 from "./pages/activities/activity4.jsx"
import Activity5 from "./pages/activities/activity5.jsx"

import Leaderboard from "./pages/leaderboard.jsx"

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson" element={<Lesson />} />
      <Route path="/lesson/1" element={<Lesson1 />} />
      <Route path="/lesson/2" element={<Lesson2 />} />
      <Route path="/lesson/3" element={<Lesson3 />} />
      <Route path="/lesson/4" element={<Lesson4 />} />
      <Route path="/lesson/5" element={<Lesson5 />} />
      <Route path="/activity/1" element={<Activity1 />} />
      <Route path="/activity/2" element={<Activity2 />} />
      <Route path="/activity/3" element={<Activity3 />} />
      <Route path="/activity/4" element={<Activity4 />} />
      <Route path="/activity/5" element={<Activity5 />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
   </Router>
  )
}

export default App
