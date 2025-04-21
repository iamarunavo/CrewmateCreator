// src/pages/Create.jsx
import { useState } from 'react'
import { supabase }   from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [name, setName]   = useState('')
  const [speed, setSpeed] = useState('')
  const [color, setColor] = useState('Red')
  const nav = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const { error } = await supabase
      .from('crew_mates')
      .insert([{ name, speed_mph: speed, color }])
    if (error) return alert(error.message)
    nav('/gallery')
  }

  return (
    <div className="create-page">
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Speed (mph):
          <input
            type="number"
            step="0.1"
            value={speed}
            onChange={e => setSpeed(e.target.value)}
            required
          />
        </label>

        <fieldset>
          <legend>Color</legend>
          {['Red','Green','Blue','Purple','Yellow','Orange','Pink','Rainbow']
            .map(c => (
              <label key={c}>
                <input
                  type="radio"
                  name="color"
                  value={c}
                  checked={color === c}
                  onChange={() => setColor(c)}
                />
                {c}
              </label>
            ))}
        </fieldset>

        <button type="submit">Create Crewmate</button>
      </form>
    </div>
  )
}
