// src/pages/Gallery.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link }     from 'react-router-dom'

export default function Gallery() {
  const [crew, setCrew]   = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCrew() {
      console.log('🔍 Gallery: fetching crew…')
      const { data, error } = await supabase
        .from('crew_mates')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📥 Gallery result:', { data, error })
      if (error) {
        setError(error)
        setCrew([])
      } else {
        setCrew(data)
      }
    }

    fetchCrew()
  }, [])

  // 1️⃣ Show loading state
  if (crew === null) return <p>Loading gallery…</p>

  // 2️⃣ Show error if any
  if (error) return (
    <div className="gallery-page">
      <h2>Your Crewmate Gallery!</h2>
      <p style={{ color: 'tomato' }}>Error loading crewmates: {error.message}</p>
    </div>
  )

  // 3️⃣ Empty state
  if (crew.length === 0) {
    return (
      <div className="gallery-page">
        <h2>Your Crewmate Gallery!</h2>
        <p>You haven’t made a crewmate yet!</p>
        <Link to="/create">Create one here!</Link>
      </div>
    )
  }

  // 4️⃣ Normal list
  return (
    <div className="gallery-page">
      <h2>Your Crewmate Gallery!</h2>
      <ul>
  {crew.map(c => (
    <li key={c.id} className="gallery-item">
      {/* Detail link */}
      <Link to={`/crew/${c.id}`} className="item-link">
        {c.name} – {c.color}, {c.speed_mph} mph
      </Link>

      {/* Edit button */}
      <Link to={`/crew/${c.id}/edit`}>
        <button className="btn-small">Edit</button>
      </Link>
    </li>
  ))}
    </ul>
    </div>
  )
}
