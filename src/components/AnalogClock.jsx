import { useState, useEffect } from 'react'

function AnalogClock({ timezone }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  // Get time components adjusted for the selected timezone
  const timeString = time.toLocaleTimeString('en-US', {
    hour12: false,
    timeZone: timezone,
  })
  const [hoursStr, minutesStr, secondsStr] = timeString.split(':')

  const seconds = parseInt(secondsStr, 10)
  const minutes = parseInt(minutesStr, 10)
  const hours = parseInt(hoursStr, 10) % 12

  const secondAngle = seconds * 6
  const minuteAngle = minutes * 6 + seconds * 0.1
  const hourAngle = hours * 30 + minutes * 0.5

  return (
    <div className="analog-clock">
      <svg viewBox="0 0 200 200" className="clock-face">
        <circle cx="100" cy="100" r="95" className="clock-border" />

        {[...Array(12)].map((_, i) => {
          const angle = i * 30
          const x1 = 100 + 85 * Math.sin((angle * Math.PI) / 180)
          const y1 = 100 - 85 * Math.cos((angle * Math.PI) / 180)
          const x2 = 100 + 75 * Math.sin((angle * Math.PI) / 180)
          const y2 = 100 - 75 * Math.cos((angle * Math.PI) / 180)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="clock-marker" />
          )
        })}

        <line
          x1="100" y1="100" x2="100" y2="55"
          className="hand hour-hand"
          transform={`rotate(${hourAngle}, 100, 100)`}
        />
        <line
          x1="100" y1="100" x2="100" y2="35"
          className="hand minute-hand"
          transform={`rotate(${minuteAngle}, 100, 100)`}
        />
        <line
          x1="100" y1="100" x2="100" y2="25"
          className="hand second-hand"
          transform={`rotate(${secondAngle}, 100, 100)`}
        />

        <circle cx="100" cy="100" r="4" className="clock-center" />
      </svg>
    </div>
  )
}

export default AnalogClock