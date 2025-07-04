import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  color = 'primary',
  className = '' 
}) => {
  const colors = {
    primary: 'from-primary to-secondary',
    accent: 'from-accent to-info',
    success: 'from-success to-green-400',
    warning: 'from-warning to-yellow-400',
    error: 'from-error to-red-400'
  }

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-gray-500'
  }

  return (
    <motion.div
      className={`card p-6 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-3xl font-bold gradient-text mb-2">{value}</p>
          
          {trend && (
            <div className="flex items-center">
              <ApperIcon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                className={`w-4 h-4 mr-1 ${trendColors[trend]}`} 
              />
              <span className={`text-sm ${trendColors[trend]}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full bg-gradient-to-r ${colors[color]}`}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard