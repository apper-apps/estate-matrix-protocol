import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatsCard from '@/components/molecules/StatsCard'
import PropertyCard from '@/components/molecules/PropertyCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import PropertyService from '@/services/api/PropertyService'
import InquiryService from '@/services/api/InquiryService'

const Dashboard = () => {
  const [properties, setProperties] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [propertiesData, inquiriesData] = await Promise.all([
        PropertyService.getAll(),
        InquiryService.getAll()
      ])
      
      setProperties(propertiesData)
      setInquiries(inquiriesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return <Loading type="grid" />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  const stats = [
    {
      title: 'Total Properties',
      value: properties.length,
      icon: 'Building',
      color: 'primary'
    },
    {
      title: 'Available Properties',
      value: properties.filter(p => p.status === 'available').length,
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'New Inquiries',
      value: inquiries.filter(i => 
        new Date(i.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      icon: 'MessageSquare',
      color: 'accent'
    },
    {
      title: 'Total Revenue',
      value: `$${properties.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}`,
      icon: 'DollarSign',
      color: 'warning'
    }
  ]

  const recentProperties = properties.slice(0, 3)
  const recentInquiries = inquiries.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/properties/new">
            <Button>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </Link>
          <Link to="/site" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-lg shadow-elevation-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Recent Properties</h2>
          <Link to="/properties">
            <Button variant="outline" size="small">
              View All
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        {recentProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map((property, index) => (
              <motion.div
                key={property.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ApperIcon name="Building" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No properties yet. Create your first listing!</p>
          </div>
        )}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-elevation-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Recent Inquiries</h2>
          <Link to="/inquiries">
            <Button variant="outline" size="small">
              View All
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        {recentInquiries.length > 0 ? (
          <div className="space-y-4">
            {recentInquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-accent to-info rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                  <p className="text-sm text-gray-600">{inquiry.email}</p>
                  <p className="text-sm text-gray-500 mt-1">{inquiry.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ApperIcon name="MessageSquare" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No inquiries yet. They'll appear here when visitors contact you!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard