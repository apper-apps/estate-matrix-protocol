import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import InquiryService from '@/services/api/InquiryService'
import PropertyService from '@/services/api/PropertyService'

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedInquiry, setSelectedInquiry] = useState(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [inquiriesData, propertiesData] = await Promise.all([
        InquiryService.getAll(),
        PropertyService.getAll()
      ])
      
      setInquiries(inquiriesData)
      setProperties(propertiesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getPropertyTitle = (propertyId) => {
    const property = properties.find(p => p.Id === propertyId)
    return property?.title || 'Unknown Property'
  }

  const handleDelete = async (inquiryId) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await InquiryService.delete(inquiryId)
        toast.success('Inquiry deleted successfully')
        loadData()
      } catch (err) {
        toast.error('Failed to delete inquiry')
      }
    }
  }

  const handleReply = (inquiry) => {
    const subject = `RE: Inquiry about ${getPropertyTitle(inquiry.propertyId)}`
    const body = `Hi ${inquiry.name},\n\nThank you for your inquiry about ${getPropertyTitle(inquiry.propertyId)}.\n\nBest regards,\nYour Real Estate Team`
    
    window.open(`mailto:${inquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  if (loading) {
    return <Loading type="table" />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  if (inquiries.length === 0) {
    return (
      <Empty
        title="No inquiries yet"
        description="When visitors contact you about your properties, their inquiries will appear here."
        icon="MessageSquare"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Inquiries</h1>
          <p className="text-gray-600 mt-2">Manage customer inquiries and leads</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="accent">
            {inquiries.length} Total
          </Badge>
          <Badge variant="success">
            {inquiries.filter(i => 
              new Date(i.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length} This Week
          </Badge>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {inquiries.map((inquiry, index) => (
            <motion.div
              key={inquiry.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-info rounded-full flex items-center justify-center">
                      <ApperIcon name="User" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                      <p className="text-sm text-gray-600">{inquiry.email}</p>
                    </div>
                  </div>
                  
                  <div className="ml-13 space-y-2">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Building" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{getPropertyTitle(inquiry.propertyId)}</span>
                    </div>
                    
                    {inquiry.phone && (
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Phone" className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{inquiry.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-13 mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Message:</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{inquiry.message}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="small"
                    onClick={() => handleReply(inquiry)}
                  >
                    <ApperIcon name="Reply" className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => window.open(`tel:${inquiry.phone}`)}
                    disabled={!inquiry.phone}
                  >
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(inquiry.Id)}
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Inquiries