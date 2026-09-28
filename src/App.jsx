import './App.css'
import WorldClockCard from './components/WorldClockCard'
import Alarm from './components/Alarm'

const WORLD_CITIES = [
  { label: 'Local Time', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: 'New York', timezone: 'America/New_York' },
  { label: 'London', timezone: 'Europe/London' },
  { label: 'Mumbai', timezone: 'Asia/Kolkata' },
  { label: 'Tokyo', timezone: 'Asia/Tokyo' },
  { label: 'Sydney', timezone: 'Australia/Sydney' },
]

function App() {
  return (
    <div className="app">
      <div className="student-credit">Mohammed Ayman Siddiqui · CS-H · Roll 13 · PRN 12414007</div>
      <h1>World Clock Dashboard</h1>
      <Alarm />
      <div className="clock-grid">
        {WORLD_CITIES.map((city) => (
          <WorldClockCard
            key={city.label}
            label={city.label}
            timezone={city.timezone}
          />
        ))}
      </div>
    </div>
  )
}

export default App