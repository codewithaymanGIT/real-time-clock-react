import AnalogClock from './AnalogClock'
import DigitalClock from './DigitalClock'

function WorldClockCard({ label, timezone }) {
  return (
    <div className="world-clock-card">
      <h3>{label}</h3>
      <AnalogClock timezone={timezone} />
      <DigitalClock timezone={timezone} />
    </div>
  )
}

export default WorldClockCard