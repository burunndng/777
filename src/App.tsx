import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import SephirothList from './routes/SephirothList'
import SephiraDetail from './routes/SephiraDetail'
import Triads from './routes/Triads'
import CorrespondenceTable from './routes/CorrespondenceTable'
import Search from './routes/Search'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sephiroth" element={<SephirothList />} />
        <Route path="/sephiroth/:number" element={<SephiraDetail />} />
        <Route path="/triads" element={<Triads />} />
        <Route path="/table" element={<CorrespondenceTable />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  )
}
