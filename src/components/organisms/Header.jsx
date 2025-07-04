import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Header = ({ onMobileMenuToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-white shadow-elevation-1 border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="small"
            onClick={onMobileMenuToggle}
            className="lg:hidden mr-3"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">EstateHub</h1>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span>Agent Dashboard</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/site" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="small">
              <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
          </Link>

          <div className="relative">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <ApperIcon name="Bell" className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-elevation-2 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-primary">Notifications</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New inquiry received</p>
                      <p className="text-xs text-gray-500">Modern Downtown Apartment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Property view milestone</p>
                      <p className="text-xs text-gray-500">Luxury Villa reached 100 views</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Site customization saved</p>
                      <p className="text-xs text-gray-500">Your changes are now live</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header