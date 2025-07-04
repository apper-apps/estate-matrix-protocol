import { motion } from 'framer-motion'

const Loading = ({ type = 'grid' }) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 animate-pulse" />
              </div>
              <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1 animate-pulse" />
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
        <div className="p-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 mb-6 animate-pulse" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse" />
                </div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-12">
      <motion.div
        className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default Loading