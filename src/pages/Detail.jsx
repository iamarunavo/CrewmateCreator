import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Detail() {
  const { id } = useParams()
  const [cm, setCm] = useState(null)

  useEffect(() => {
    supabase
      .from('crew_mates')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) return alert(error.message)
        setCm(data)
      })
  }, [id])

  if (!cm) return <p>Loading…</p>

  return (
    <div className="detail-page">
      <h2>Crewmate: {cm.name}</h2>
      <p><strong>Color:</strong> {cm.color}</p>
      <p><strong>Speed:</strong> {cm.speed_mph} mph</p>
      {/* 1. Edit link */}
      <Link to={`/crew/${id}/edit`}>
        <button>✏️ Edit this Crewmate</button>
      </Link>
    </div>
  )
}
