import { useState } from 'react'
import { toast } from 'react-toastify'
import FormField from '@/components/molecules/FormField'
import ImageUpload from '@/components/molecules/ImageUpload'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PropertyForm = ({ property, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    type: property?.type || 'apartment',
    price: property?.price || '',
    location: property?.location || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    squareFeet: property?.squareFeet || '',
    description: property?.description || '',
    images: property?.images || [],
    features: property?.features || [],
    status: property?.status || 'available'
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [newFeature, setNewFeature] = useState('')

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ]

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'rented', label: 'Rented' },
    { value: 'pending', label: 'Pending' }
  ]

  const steps = [
    { title: 'Basic Information', icon: 'Info' },
    { title: 'Property Details', icon: 'Home' },
    { title: 'Images', icon: 'Image' },
    { title: 'Features & Status', icon: 'CheckSquare' }
  ]

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImagesChange = (images) => {
    setFormData(prev => ({ ...prev, images }))
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title || !formData.price || !formData.location) {
      toast.error('Please fill in all required fields')
      return
    }

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    onSubmit(formData)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <FormField
              label="Property Title *"
              name="title"
              value={formData.title}
              onChange={handleFieldChange}
              placeholder="e.g., Modern Downtown Apartment"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="select"
                label="Property Type *"
                name="type"
                value={formData.type}
                onChange={handleFieldChange}
                options={propertyTypes}
              />
              
              <FormField
                type="number"
                label="Price per Month *"
                name="price"
                value={formData.price}
                onChange={handleFieldChange}
                placeholder="e.g., 2500"
              />
            </div>
            
            <FormField
              label="Location *"
              name="location"
              value={formData.location}
              onChange={handleFieldChange}
              placeholder="e.g., Downtown, City Name"
            />
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                type="number"
                label="Bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleFieldChange}
                placeholder="e.g., 2"
              />
              
              <FormField
                type="number"
                label="Bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleFieldChange}
                placeholder="e.g., 1.5"
              />
              
              <FormField
                type="number"
                label="Square Feet"
                name="squareFeet"
                value={formData.squareFeet}
                onChange={handleFieldChange}
                placeholder="e.g., 1200"
              />
            </div>
            
            <FormField
              type="textarea"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFieldChange}
              rows={6}
              placeholder="Describe the property, its features, and neighborhood..."
            />
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Property Images</h3>
              <ImageUpload
                images={formData.images}
                onImagesChange={handleImagesChange}
                maxImages={10}
              />
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Property Features</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button type="button" onClick={addFeature} size="small">
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-gray-500 hover:text-error"
                    >
                      <ApperIcon name="X" className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <FormField
              type="select"
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleFieldChange}
              options={statusOptions}
            />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <ApperIcon name={step.icon} className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${index <= currentStep ? 'text-primary' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? 'bg-secondary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-elevation-1 p-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ApperIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ApperIcon name="ChevronRight" className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" loading={loading}>
                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                {property ? 'Update Property' : 'Create Property'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm