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


  if (crew === null) return <p>Loading gallery…</p>


  if (error) return (
    <div className="gallery-page">
      <h2>Your Crewmate Gallery!</h2>
      <p style={{ color: 'tomato' }}>Error loading crewmates: {error.message}</p>
    </div>
  )


  if (crew.length === 0) {
    return (
      <div className="gallery-page">
        <h2>Your Crewmate Gallery!</h2>
        <p>You haven’t made a crewmate yet!</p>
        <Link to="/create">Create one here!</Link>
      </div>
    )
  }


  return (
    <div className="gallery-page">
      <h2>Your Crewmate Gallery!</h2>
      <ul>
  {crew.map(c => (
    <li key={c.id} className="gallery-item">
      
      <Link to={`/crew/${c.id}`} className="item-link">
        {c.name} – {c.color}, {c.speed_mph} mph
      </Link>

      
      <Link to={`/crew/${c.id}/edit`}>
        <button className="btn-small">Edit</button>
      </Link>
    </li>
  ))}
    </ul>
    </div>
  )
}
