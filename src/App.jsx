import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home    from './pages/Home'
import Create  from './pages/Create'
import Gallery from './pages/Gallery'
import Detail  from './pages/Detail'
import Edit    from './pages/Edit'

export default function App() {
  return (
    <BrowserRouter>
      <aside>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/gallery">Gallery</Link>
      </aside>
      <main>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/create"  element={<Create />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/crew/:id"      element={<Detail />} />
          <Route path="/crew/:id/edit" element={<Edit />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
