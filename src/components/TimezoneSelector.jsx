const TIMEZONES = [
  { label: 'Local Time', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: 'New York (EST/EDT)', value: 'America/New_York' },
  { label: 'London (GMT/BST)', value: 'Europe/London' },
  { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
  { label: 'Dubai (GST)', value: 'Asia/Dubai' },
]

function TimezoneSelector({ selected, onChange }) {
  return (
    <select
      className="timezone-selector"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {TIMEZONES.map((tz) => (
        <option key={tz.value} value={tz.value}>
          {tz.label}
        </option>
      ))}
    </select>
  )
}

export default TimezoneSelector