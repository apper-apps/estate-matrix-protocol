import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const PropertyCard = ({ property, onEdit, onDelete, isPublic = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success'
      case 'rented': return 'error'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  return (
    <motion.div
      className="property-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img
          src={property.images[0] || '/api/placeholder/400/300'}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="gradient" className="text-white font-bold">
            {formatPrice(property.price)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant={getStatusColor(property.status)}>
            {property.status}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
          {property.location}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
            {property.bedrooms} beds
          </span>
          <span className="flex items-center">
            <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
            {property.bathrooms} baths
          </span>
          <span className="flex items-center">
            <ApperIcon name="Square" className="w-4 h-4 mr-1" />
            {property.squareFeet} sqft
          </span>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{property.description}</p>
        
        {!isPublic ? (
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="small"
              onClick={() => onEdit(property.Id)}
              className="flex-1"
            >
              <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="danger" 
              size="small"
              onClick={() => onDelete(property.Id)}
              className="flex-1"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link 
              to={`/site/property/${property.Id}`}
              className="flex-1"
            >
              <Button variant="primary" size="small" className="w-full">
                View Details
              </Button>
            </Link>
            <Button variant="secondary" size="small">
              <ApperIcon name="Heart" className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PropertyCard