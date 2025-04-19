import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes , Route} from "react-router-dom"
import Home from './pages/HomePage/Home'
import AddJob from './pages/AddJob/AddJob'
import JobDetails from './pages/JobDetails/JobDetails'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/job-details/:id" element={<JobDetails  />} />
    </Routes>
    </>
  )
}

export default App
