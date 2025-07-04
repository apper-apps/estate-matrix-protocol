import mockProperties from '@/services/mockData/properties.json'

const PropertyService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockProperties]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const property = mockProperties.find(p => p.Id === id)
    if (!property) {
      throw new Error('Property not found')
    }
    return { ...property }
  },

  async create(propertyData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // Find the highest existing Id and add 1
    const maxId = Math.max(...mockProperties.map(p => p.Id), 0)
    const newProperty = {
      ...propertyData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    
    mockProperties.push(newProperty)
    return { ...newProperty }
  },

  async update(id, propertyData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const index = mockProperties.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    
    mockProperties[index] = {
      ...mockProperties[index],
      ...propertyData,
      Id: id // Ensure Id remains unchanged
    }
    
    return { ...mockProperties[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = mockProperties.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    
    mockProperties.splice(index, 1)
    return { success: true }
  }
}

export default PropertyService