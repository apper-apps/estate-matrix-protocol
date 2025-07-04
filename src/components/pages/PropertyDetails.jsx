import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import PublicHeader from '@/components/organisms/PublicHeader'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import FormField from '@/components/molecules/FormField'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import PropertyService from '@/services/api/PropertyService'
import SiteSettingsService from '@/services/api/SiteSettingsService'
import InquiryService from '@/services/api/InquiryService'

const PropertyDetails = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [siteSettings, setSiteSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [propertyData, settingsData] = await Promise.all([
        PropertyService.getById(parseInt(id)),
        SiteSettingsService.getSettings()
      ])
      
      setProperty(propertyData)
      setSiteSettings(settingsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  const handleContactFormChange = (name, value) => {
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)
      
      await InquiryService.create({
        propertyId: property.Id,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message
      })
      
      toast.success('Your inquiry has been sent successfully!')
      setShowContactForm(false)
      setContactForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      toast.error('Failed to send inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader siteSettings={siteSettings} />
        <Loading />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader siteSettings={siteSettings} />
        <Error message={error || 'Property not found'} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader siteSettings={siteSettings} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/site" 
            className="text-gray-600 hover:text-primary transition-colors"
          >
            ← Back to Properties
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
              <div className="relative h-96">
                <img
                  src={property.images[currentImageIndex] || '/api/placeholder/800/600'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? property.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ApperIcon name="ChevronLeft" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === property.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ApperIcon name="ChevronRight" className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-4 left-4">
                  <Badge variant="gradient" className="text-white font-bold text-lg">
                    {formatPrice(property.price)}
                  </Badge>
                </div>
              </div>
              
              {property.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-secondary' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-lg shadow-elevation-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                </div>
                <Badge variant="success">
                  {property.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ApperIcon name="Bed" className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ApperIcon name="Bath" className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ApperIcon name="Square" className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Square Feet</p>
                  <p className="font-semibold">{property.squareFeet}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ApperIcon name="Home" className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold capitalize">{property.type}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {property.features && property.features.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-3">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <ApperIcon name="Check" className="w-4 h-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-elevation-1 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-primary mb-4">Interested in this property?</h2>
              
              <div className="space-y-3 mb-6">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowContactForm(true)}
                >
                  <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2" />
                  Send Inquiry
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`tel:${siteSettings.phone || '+1234567890'}`)}
                >
                  <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`https://wa.me/${siteSettings.whatsapp || '1234567890'}`)}
                >
                  <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>

              {showContactForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t pt-6"
                >
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <FormField
                      label="Name *"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      placeholder="Your full name"
                    />
                    
                    <FormField
                      type="email"
                      label="Email *"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      placeholder="your@email.com"
                    />
                    
                    <FormField
                      type="tel"
                      label="Phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      placeholder="Your phone number"
                    />
                    
                    <FormField
                      type="textarea"
                      label="Message *"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      placeholder="I'm interested in this property..."
                      rows={4}
                    />
                    
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        loading={submitting}
                        className="flex-1"
                      >
                        Send Message
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PropertyDetails