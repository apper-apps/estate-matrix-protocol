import mockInquiries from '@/services/mockData/inquiries.json'

const InquiryService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...mockInquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const inquiry = mockInquiries.find(i => i.Id === id)
    if (!inquiry) {
      throw new Error('Inquiry not found')
    }
    return { ...inquiry }
  },

  async create(inquiryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const maxId = Math.max(...mockInquiries.map(i => i.Id), 0)
    const newInquiry = {
      ...inquiryData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    
    mockInquiries.push(newInquiry)
    return { ...newInquiry }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = mockInquiries.findIndex(i => i.Id === id)
    if (index === -1) {
      throw new Error('Inquiry not found')
    }
    
    mockInquiries.splice(index, 1)
    return { success: true }
  }
}

export default InquiryService