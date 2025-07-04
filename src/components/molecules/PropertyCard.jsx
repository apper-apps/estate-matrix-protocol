import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";
import { formatPrice } from "@/utils/formatters";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const PropertyCard = ({ property, onEdit, onDelete, isPublic = false }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success'
      case 'rented': return 'error'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  const handleEdit = () => {
    if (onEdit && typeof onEdit === 'function') {
      onEdit(property.Id)
    }
  }

  const handleDelete = () => {
    if (onDelete && typeof onDelete === 'function') {
      onDelete(property.Id)
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
          src={property?.images?.[0] || '/api/placeholder/400/300'}
          alt={property?.title || 'Property'}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
<Badge variant="gradient" className="text-white font-bold">
            {formatPrice(property?.price || 0)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant={getStatusColor(property?.status)}>
            {property?.status || 'unknown'}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{property?.title || 'No title'}</h3>
        <p className="text-gray-600 mb-4">{property?.address || 'No address'}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <ApperIcon name="bed" size={16} />
            {property?.bedrooms || 0} bed
          </span>
          <span className="flex items-center gap-1">
            <ApperIcon name="bath" size={16} />
            {property?.bathrooms || 0} bath
          </span>
          <span className="flex items-center gap-1">
            <ApperIcon name="square-feet" size={16} />
            {property?.sqft || 0} sqft
          </span>
        </div>
        
        <div className="flex gap-2">
          {isPublic ? (
            <Link 
              to={`/property/${property?.Id}`}
              className="flex-1"
            >
              <Button variant="primary" className="w-full">
                View Details
              </Button>
            </Link>
          ) : (
            <>
              {onEdit && (
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={handleEdit}
                >
                  <ApperIcon name="edit" size={16} />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="danger" 
                  onClick={handleDelete}
                >
                  <ApperIcon name="trash" size={16} />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Default props for defensive programming
PropertyCard.defaultProps = {
  onEdit: null,
  onDelete: null,
  isPublic: false
}

export default PropertyCard