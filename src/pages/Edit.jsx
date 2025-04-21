import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Edit() {
  const { id } = useParams()
  const nav    = useNavigate()


  const [name, setName]   = useState('')
  const [speed, setSpeed] = useState('')
  const [color, setColor] = useState('Red')


  useEffect(() => {
    supabase
      .from('crew_mates')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) return alert(error.message)
        setName(data.name)
        setSpeed(data.speed_mph)
        setColor(data.color)
      })
  }, [id])


  const handleUpdate = async e => {
    e.preventDefault()
    const { error } = await supabase
      .from('crew_mates')
      .update({ name, speed_mph: speed, color })
      .eq('id', id)

    if (error) return alert(error.message)
    nav('/gallery')    
  }


  const handleDelete = async () => {
    if (!window.confirm('Really delete this crewmate?')) return
    const { error } = await supabase
      .from('crew_mates')
      .delete()
      .eq('id', id)

    if (error) return alert(error.message)
    nav('/gallery')
  }

  return (
    <div className="edit-page">
      <h2>Update Your Crewmate</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
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

        <button type="submit">Save Changes</button>
      </form>

      <button
        onClick={handleDelete}
        style={{ marginTop: '1rem', background: 'tomato' }}
      >
        Delete Crewmate
      </button>
    </div>
  )
}
