import { useState, useEffect, useRef } from 'react'

const TIMEZONES = [
  { label: 'Local Time', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: 'New York', value: 'America/New_York' },
  { label: 'London', value: 'Europe/London' },
  { label: 'Mumbai', value: 'Asia/Kolkata' },
  { label: 'Tokyo', value: 'Asia/Tokyo' },
  { label: 'Sydney', value: 'Australia/Sydney' },
]

function Alarm() {
  const [alarmTime, setAlarmTime] = useState('')
  const [alarmTimezone, setAlarmTimezone] = useState(TIMEZONES[0].value)
  const [activeAlarm, setActiveAlarm] = useState(null)
  const [ringing, setRinging] = useState(false)
  const audioContextRef = useRef(null)
  const beepIntervalRef = useRef(null)

  useEffect(() => {
    if (!activeAlarm) return

    const checkInterval = setInterval(() => {
      const now = new Date()
      const currentTime = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: activeAlarm.timezone,
      })

      if (currentTime === activeAlarm.time && !ringing) {
        setRinging(true)
        playBeep()
      }
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [activeAlarm, ringing])

  const playBeep = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    const ctx = audioContextRef.current

    const beep = () => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator.type = 'sine'
      oscillator.frequency.value = 880
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.3)
    }

    beep()
    beepIntervalRef.current = setInterval(beep, 700)
  }

  const handleSetAlarm = () => {
    if (!alarmTime) return
    setActiveAlarm({ time: alarmTime, timezone: alarmTimezone })
    setRinging(false)
  }

  const handleCancelAlarm = () => {
    setActiveAlarm(null)
    setRinging(false)
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current)
      beepIntervalRef.current = null
    }
  }

  const timezoneLabel =
    TIMEZONES.find((tz) => tz.value === alarmTimezone)?.label || alarmTimezone

  return (
    <div className="alarm-panel">
      <h3>Alarm</h3>

      {!activeAlarm ? (
        <div className="alarm-controls">
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="alarm-input"
          />
          <select
            value={alarmTimezone}
            onChange={(e) => setAlarmTimezone(e.target.value)}
            className="alarm-select"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <button onClick={handleSetAlarm} className="alarm-btn set-btn">
            Set Alarm
          </button>
        </div>
      ) : (
        <div className="alarm-active">
          {ringing ? (
            <p className="alarm-ringing">⏰ Alarm ringing!</p>
          ) : (
            <p>
              Alarm set for <strong>{activeAlarm.time}</strong> (
              {timezoneLabel})
            </p>
          )}
          <button onClick={handleCancelAlarm} className="alarm-btn cancel-btn">
            {ringing ? 'Stop Alarm' : 'Cancel Alarm'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Alarm