import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const PublicHeader = ({ siteSettings = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const {
    businessName = 'Premium Real Estate',
    logo = null,
    primaryColor = '#1E3A5F',
    headerText = 'Find Your Dream Home'
  } = siteSettings

  return (
    <header className="bg-white shadow-elevation-1 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/site" className="flex items-center space-x-3">
              {logo ? (
                <img src={logo} alt={businessName} className="h-8 w-8 object-cover rounded" />
              ) : (
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ApperIcon name="Building2" className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-xl font-bold" style={{ color: primaryColor }}>
                {businessName}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/site"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Properties
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="primary" size="small">
              <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <ApperIcon name={isMenuOpen ? 'X' : 'Menu'} className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/site"
                className="text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <a
                href="#about"
                className="text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4">
                <Button variant="primary" size="small" className="w-full">
                  <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default PublicHeader