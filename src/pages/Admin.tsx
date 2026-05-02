import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Login from '../components/admin/Login'
import Dashboard from '../components/admin/Dashboard'

export default function Admin() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#5F5E5A' }}>Cargando panel de administrador...</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', borderTop: '4px solid #D4537E' }}>
      {!session ? (
        <Login onLogin={() => {}} />
      ) : (
        <Dashboard onLogout={() => {}} />
      )}
    </div>
  )
}
