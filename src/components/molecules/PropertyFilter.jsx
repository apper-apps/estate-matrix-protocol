import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import Input from '@/components/atoms/Input'

const PropertyFilter = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState(initialFilters)
  const [isExpanded, setIsExpanded] = useState(false)

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'rented', label: 'Rented' },
    { value: 'pending', label: 'Pending' }
  ]

  const bedroomOptions = [
    { value: '', label: 'Any Bedrooms' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    setFilters({})
    onFilterChange({})
  }

  return (
    <div className="bg-white rounded-lg shadow-elevation-1 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Filter Properties</h3>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ApperIcon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            className="w-4 h-4 mr-2" 
          />
          {isExpanded ? 'Hide' : 'Show'} Filters
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Property Type"
              options={propertyTypes}
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            />

            <Select
              label="Status"
              options={statusOptions}
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            />

            <Select
              label="Bedrooms"
              options={bedroomOptions}
              value={filters.bedrooms || ''}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Min Price"
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />

            <Input
              label="Max Price"
              type="number"
              placeholder="No limit"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="small"
              onClick={resetFilters}
            >
              <ApperIcon name="X" className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyFilter