import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, filters = [], placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState({})

  const handleSearch = () => {
    onSearch({
      term: searchTerm,
      filters: activeFilters
    })
  }

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-elevation-1 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <ApperIcon name="Search" className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        {filters.map((filter) => (
          <Select
            key={filter.key}
            options={filter.options}
            value={activeFilters[filter.key] || ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            className="w-full lg:w-48"
          />
        ))}
        
        <Button onClick={handleSearch} className="w-full lg:w-auto">
          <ApperIcon name="Search" className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchBar