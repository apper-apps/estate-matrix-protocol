import { motion } from 'framer-motion'
import PropertyCard from '@/components/molecules/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const PropertyGrid = ({ 
  properties = [], 
  loading = false, 
  error = null,
  onEdit,
  onDelete,
  onRetry,
  isPublic = false
}) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={onRetry}
      />
    )
  }

  if (properties.length === 0) {
    return (
      <Empty
        title={isPublic ? "No properties found" : "No properties yet"}
        description={isPublic ? "Try adjusting your search criteria" : "Start by adding your first property listing"}
        actionText={isPublic ? "Clear filters" : "Add Property"}
        onAction={isPublic ? onRetry : () => window.location.href = '/properties/new'}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PropertyCard
            property={property}
            onEdit={onEdit}
            onDelete={onDelete}
            isPublic={isPublic}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default PropertyGrid