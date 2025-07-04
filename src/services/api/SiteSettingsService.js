import mockSiteSettings from '@/services/mockData/siteSettings.json'

const SiteSettingsService = {
  async getSettings() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { ...mockSiteSettings }
  },

  async updateSettings(settings) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    Object.assign(mockSiteSettings, settings)
    return { ...mockSiteSettings }
  }
}

export default SiteSettingsService