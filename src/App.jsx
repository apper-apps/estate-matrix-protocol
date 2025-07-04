import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import Properties from '@/components/pages/Properties'
import PropertyEditor from '@/components/pages/PropertyEditor'
import SiteBuilder from '@/components/pages/SiteBuilder'
import Inquiries from '@/components/pages/Inquiries'
import Settings from '@/components/pages/Settings'
import PublicSite from '@/components/pages/PublicSite'
import PropertyDetails from '@/components/pages/PropertyDetails'

function App() {
  return (
    <Routes>
      <Route path="/site" element={<PublicSite />} />
      <Route path="/site/property/:id" element={<PropertyDetails />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/new" element={<PropertyEditor />} />
        <Route path="properties/edit/:id" element={<PropertyEditor />} />
        <Route path="site-builder" element={<SiteBuilder />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App