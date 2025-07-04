import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PublicHeader from '@/components/organisms/PublicHeader'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import SearchBar from '@/components/molecules/SearchBar'
import PropertyFilter from '@/components/molecules/PropertyFilter'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import PropertyService from '@/services/api/PropertyService'
import SiteSettingsService from '@/services/api/SiteSettingsService'

const PublicSite = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [siteSettings, setSiteSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [propertiesData, settingsData] = await Promise.all([
        PropertyService.getAll(),
        SiteSettingsService.getSettings()
      ])
      
      const availableProperties = propertiesData.filter(p => p.status === 'available')
      setProperties(availableProperties)
      setFilteredProperties(availableProperties)
      setSiteSettings(settingsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = properties

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type)
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms))
    }
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseFloat(filters.maxPrice))
    }

    setFilteredProperties(filtered)
  }, [properties, filters])

  const handleSearch = ({ term, filters: searchFilters }) => {
    let filtered = properties

    // Apply search term
    if (term) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(term.toLowerCase()) ||
        property.location.toLowerCase().includes(term.toLowerCase()) ||
        property.description.toLowerCase().includes(term.toLowerCase())
      )
    }

    // Apply search filters
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) {
        if (key === 'type') {
          filtered = filtered.filter(property => property.type === value)
        } else if (key === 'bedrooms') {
          filtered = filtered.filter(property => property.bedrooms >= parseInt(value))
        } else if (key === 'minPrice') {
          filtered = filtered.filter(property => property.price >= parseFloat(value))
        } else if (key === 'maxPrice') {
          filtered = filtered.filter(property => property.price <= parseFloat(value))
        }
      }
    })

    setFilteredProperties(filtered)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const searchFilters = [
    {
      key: 'type',
      options: [
        { value: '', label: 'All Types' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' }
      ]
    },
    {
      key: 'bedrooms',
      options: [
        { value: '', label: 'Any Bedrooms' },
        { value: '1', label: '1+ Bedrooms' },
        { value: '2', label: '2+ Bedrooms' },
        { value: '3', label: '3+ Bedrooms' },
        { value: '4', label: '4+ Bedrooms' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader siteSettings={siteSettings} />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-20 px-4 sm:px-6 lg:px-8"
          style={{
            background: `linear-gradient(135deg, ${siteSettings.primaryColor || '#1E3A5F'}, ${siteSettings.secondaryColor || '#4B7BEC'})`
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {siteSettings.headerText || 'Find Your Dream Home'}
              </h1>
              <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
                Discover premium properties in the best locations. Your perfect home awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="large">
                  <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                  Browse Properties
                </Button>
                <Button variant="outline" size="large" className="bg-white bg-opacity-20 text-white border-white hover:bg-white hover:text-gray-900">
                  <ApperIcon name="Phone" className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Properties Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                Featured Properties
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our carefully selected properties that offer the best value and lifestyle.
              </p>
            </motion.div>

            <SearchBar
              onSearch={handleSearch}
              filters={searchFilters}
              placeholder="Search properties by location, type, or keywords..."
            />

            <PropertyFilter
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />

            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
              error={error}
              onRetry={loadData}
              isPublic={true}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                  Why Choose {siteSettings.businessName || 'Us'}?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-accent to-info rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Local Knowledge</h3>
                      <p className="text-gray-600">Deep understanding of local markets and neighborhoods.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-accent to-info rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Personalized Service</h3>
                      <p className="text-gray-600">Tailored solutions to meet your unique needs and preferences.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-accent to-info rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Proven Track Record</h3>
                      <p className="text-gray-600">Years of successful transactions and satisfied clients.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-lg text-white">
                  <h3 className="text-2xl font-bold mb-2">{properties.length}+</h3>
                  <p className="text-sm opacity-90">Properties Listed</p>
                </div>
                <div className="bg-gradient-to-br from-accent to-info p-6 rounded-lg text-white">
                  <h3 className="text-2xl font-bold mb-2">98%</h3>
                  <p className="text-sm opacity-90">Client Satisfaction</p>
                </div>
                <div className="bg-gradient-to-br from-success to-green-400 p-6 rounded-lg text-white">
                  <h3 className="text-2xl font-bold mb-2">24/7</h3>
                  <p className="text-sm opacity-90">Support Available</p>
                </div>
                <div className="bg-gradient-to-br from-warning to-yellow-400 p-6 rounded-lg text-white">
                  <h3 className="text-2xl font-bold mb-2">5+</h3>
                  <p className="text-sm opacity-90">Years Experience</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with our expert team today. We're here to help you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  <ApperIcon name="Phone" className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" size="large">
                  <ApperIcon name="MessageSquare" className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="large">
                  <ApperIcon name="Mail" className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            {siteSettings.footerText || '© 2024 Premium Real Estate. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default PublicSite