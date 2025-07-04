import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import PropertyFilter from '@/components/molecules/PropertyFilter'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import ApperIcon from '@/components/ApperIcon'
import PropertyService from '@/services/api/PropertyService'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const navigate = useNavigate()

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await PropertyService.getAll()
      setProperties(data)
      setFilteredProperties(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  useEffect(() => {
    let filtered = properties

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type)
    }
    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status)
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
  }, [properties, searchTerm, filters])

  const handleEdit = (propertyId) => {
    navigate(`/properties/edit/${propertyId}`)
  }

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await PropertyService.delete(propertyId)
        toast.success('Property deleted successfully')
        loadProperties()
      } catch (err) {
        toast.error('Failed to delete property')
      }
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Properties</h1>
          <p className="text-gray-600 mt-2">Manage your property listings</p>
        </div>
        <Link to="/properties/new">
          <Button>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-elevation-1 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredProperties.length} of {properties.length} properties
          </div>
        </div>
      </div>

      {/* Filters */}
      <PropertyFilter
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {/* Properties Grid */}
      <PropertyGrid
        properties={filteredProperties}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={loadProperties}
      />
    </div>
  )
}

export default Properties