import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Settings = () => {
  const [settings, setSettings] = useState({
    businessName: 'Premium Real Estate',
    email: 'contact@premiumrealestate.com',
    phone: '+1 (555) 123-4567',
    address: '123 Real Estate Ave, City, State 12345',
    website: 'https://premiumrealestate.com',
    whatsapp: '+1 (555) 123-4567',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    notifications: {
      emailInquiries: true,
      smsInquiries: false,
      propertyUpdates: true,
      marketingEmails: true
    }
  })

  const [saving, setSaving] = useState(false)

  const handleFieldChange = (name, value) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setSettings(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully!')
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and business settings</p>
        </div>
        <Button onClick={handleSave} loading={saving}>
          <ApperIcon name="Save" className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-elevation-1 p-6"
        >
          <h2 className="text-xl font-bold text-primary mb-4">Business Information</h2>
          <div className="space-y-4">
            <FormField
              label="Business Name"
              name="businessName"
              value={settings.businessName}
              onChange={handleFieldChange}
            />
            
            <FormField
              type="email"
              label="Email Address"
              name="email"
              value={settings.email}
              onChange={handleFieldChange}
            />
            
            <FormField
              type="tel"
              label="Phone Number"
              name="phone"
              value={settings.phone}
              onChange={handleFieldChange}
            />
            
            <FormField
              label="Business Address"
              name="address"
              value={settings.address}
              onChange={handleFieldChange}
            />
            
            <FormField
              label="Website URL"
              name="website"
              value={settings.website}
              onChange={handleFieldChange}
            />
            
            <FormField
              type="tel"
              label="WhatsApp Number"
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleFieldChange}
              hint="Include country code for international numbers"
            />
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-elevation-1 p-6"
        >
          <h2 className="text-xl font-bold text-primary mb-4">Social Media</h2>
          <div className="space-y-4">
            <FormField
              label="Facebook URL"
              name="socialMedia.facebook"
              value={settings.socialMedia.facebook}
              onChange={handleFieldChange}
              placeholder="https://facebook.com/yourbusiness"
            />
            
            <FormField
              label="Instagram URL"
              name="socialMedia.instagram"
              value={settings.socialMedia.instagram}
              onChange={handleFieldChange}
              placeholder="https://instagram.com/yourbusiness"
            />
            
            <FormField
              label="Twitter URL"
              name="socialMedia.twitter"
              value={settings.socialMedia.twitter}
              onChange={handleFieldChange}
              placeholder="https://twitter.com/yourbusiness"
            />
            
            <FormField
              label="LinkedIn URL"
              name="socialMedia.linkedin"
              value={settings.socialMedia.linkedin}
              onChange={handleFieldChange}
              placeholder="https://linkedin.com/company/yourbusiness"
            />
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-elevation-1 p-6"
        >
          <h2 className="text-xl font-bold text-primary mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Inquiries</h3>
                <p className="text-sm text-gray-600">Receive emails when customers inquire about properties</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailInquiries}
                  onChange={(e) => handleFieldChange('notifications.emailInquiries', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">SMS Inquiries</h3>
                <p className="text-sm text-gray-600">Receive text messages for urgent inquiries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.smsInquiries}
                  onChange={(e) => handleFieldChange('notifications.smsInquiries', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Property Updates</h3>
                <p className="text-sm text-gray-600">Get notified about property status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.propertyUpdates}
                  onChange={(e) => handleFieldChange('notifications.propertyUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                <p className="text-sm text-gray-600">Receive tips and updates about real estate marketing</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketingEmails}
                  onChange={(e) => handleFieldChange('notifications.marketingEmails', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-elevation-1 p-6"
        >
          <h2 className="text-xl font-bold text-primary mb-4">Account Actions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">Download all your property and inquiry data</p>
              </div>
              <Button variant="outline" size="small">
                <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Backup Settings</h3>
                <p className="text-sm text-gray-600">Create a backup of your current settings</p>
              </div>
              <Button variant="outline" size="small">
                <ApperIcon name="Archive" className="w-4 h-4 mr-2" />
                Backup
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
              <Button variant="danger" size="small">
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings