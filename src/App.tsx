import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import Atlas from './routes/Atlas'
import EntryDetail from './routes/EntryDetail'
import Search from './routes/Search'
import NotFound from './routes/NotFound'
import Sources from './routes/Sources'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/atlas/:slug" element={<EntryDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
