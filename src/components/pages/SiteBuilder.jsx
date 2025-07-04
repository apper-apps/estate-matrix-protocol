import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import SiteSettingsService from '@/services/api/SiteSettingsService'

const SiteBuilder = () => {
  const [settings, setSettings] = useState({
    businessName: '',
    logo: '',
    primaryColor: '#1E3A5F',
    secondaryColor: '#4B7BEC',
    headerText: '',
    footerText: '',
    layout: 'modern'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await SiteSettingsService.getSettings()
      setSettings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleFieldChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSettings(prev => ({ ...prev, logo: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await SiteSettingsService.updateSettings(settings)
      toast.success('Site settings saved successfully!')
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const presetColors = [
    { name: 'Navy Blue', primary: '#1E3A5F', secondary: '#4B7BEC' },
    { name: 'Forest Green', primary: '#2D5016', secondary: '#4CAF50' },
    { name: 'Royal Purple', primary: '#4A148C', secondary: '#9C27B0' },
    { name: 'Crimson Red', primary: '#B71C1C', secondary: '#F44336' },
    { name: 'Charcoal Gray', primary: '#37474F', secondary: '#607D8B' }
  ]

  const layoutOptions = [
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Classic' },
    { value: 'minimal', label: 'Minimal' }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadSettings} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Site Builder</h1>
          <p className="text-gray-600 mt-2">Customize your property website's appearance</p>
        </div>
        <div className="flex gap-3">
          <a 
            href="/site" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="outline">
              <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
          </a>
          <Button onClick={handleSave} loading={saving}>
            <ApperIcon name="Save" className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Information */}
          <div className="bg-white rounded-lg shadow-elevation-1 p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Business Information</h2>
            <div className="space-y-4">
              <FormField
                label="Business Name"
                name="businessName"
                value={settings.businessName}
                onChange={handleFieldChange}
                placeholder="Your Real Estate Business"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  {settings.logo && (
                    <img 
                      src={settings.logo} 
                      alt="Logo" 
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Upload Logo
                  </label>
                </div>
              </div>

              <FormField
                label="Header Text"
                name="headerText"
                value={settings.headerText}
                onChange={handleFieldChange}
                placeholder="Find Your Dream Home"
              />

              <FormField
                label="Footer Text"
                name="footerText"
                value={settings.footerText}
                onChange={handleFieldChange}
                placeholder="© 2024 Your Real Estate Business. All rights reserved."
              />
            </div>
          </div>

          {/* Color Scheme */}
          <div className="bg-white rounded-lg shadow-elevation-1 p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Color Scheme</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleFieldChange('primaryColor', e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => handleFieldChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleFieldChange('secondaryColor', e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => handleFieldChange('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preset Color Schemes
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {presetColors.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        handleFieldChange('primaryColor', preset.primary)
                        handleFieldChange('secondaryColor', preset.secondary)
                      }}
                      className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Layout Options */}
          <div className="bg-white rounded-lg shadow-elevation-1 p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Layout</h2>
            <FormField
              type="select"
              label="Layout Style"
              name="layout"
              value={settings.layout}
              onChange={handleFieldChange}
              options={layoutOptions}
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-elevation-1 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-primary mb-4">Live Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <motion.div
                className="h-64 bg-gradient-to-r p-4"
                style={{
                  backgroundImage: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`
                }}
                animate={{ 
                  background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})` 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  {settings.logo ? (
                    <img 
                      src={settings.logo} 
                      alt="Logo" 
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded flex items-center justify-center">
                      <ApperIcon name="Building2" className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-white font-bold text-lg">
                    {settings.businessName || 'Your Business'}
                  </span>
                </div>
                
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {settings.headerText || 'Find Your Dream Home'}
                  </h3>
                  <div className="bg-white bg-opacity-20 rounded p-3">
                    <div className="text-sm opacity-90">Property Card Preview</div>
                  </div>
                </div>
              </motion.div>
              
              <div className="p-4 bg-gray-50 text-xs text-gray-600">
                {settings.footerText || '© 2024 Your Business. All rights reserved.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteBuilder