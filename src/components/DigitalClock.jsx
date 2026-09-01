import { useState, useEffect } from 'react'

function DigitalClock({ timezone }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: timezone,
  })

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone,
  })

  return (
    <div className="digital-clock">
      <p className="digital-time">{formattedTime}</p>
      <p className="digital-date">{formattedDate}</p>
    </div>
  )
}

export default DigitalClock