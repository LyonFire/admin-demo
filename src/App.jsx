import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLayout from './layouts/AdminLayout'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')

  if (!user) {
    if (page === 'register') return <Register onGoLogin={() => setPage('login')} />
    return <Login onLogin={setUser} onGoRegister={() => setPage('register')} />
  }

  return (
    <Routes>
      <Route path="/*" element={<AdminLayout user={user} onLogout={() => setUser(null)} />} />
    </Routes>
  )
}
