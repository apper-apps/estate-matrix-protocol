import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
const ImageUpload = ({ images = [], onImagesChange, maxImages = 10 }) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (files) => {
    const newImages = Array.from(files).slice(0, maxImages - images.length)
    const imageUrls = newImages.map(file => URL.createObjectURL(file))
    onImagesChange([...images, ...imageUrls])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files)
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images]
    const [removed] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, removed)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver ? 'border-secondary bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <ApperIcon name="ImagePlus" className="w-6 h-6 text-gray-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700">Upload Property Images</h3>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop images here, or click to select files
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maximum {maxImages} images, JPG, PNG, or WebP
            </p>
          </div>
          
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={images.length >= maxImages}
          >
            <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
            Select Images
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                  {index > 0 && (
                    <button
                      onClick={() => moveImage(index, index - 1)}
                      className="p-1 bg-white rounded-full hover:bg-gray-100"
                    >
                      <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                    </button>
                  )}
                  
                  {index < images.length - 1 && (
                    <button
                      onClick={() => moveImage(index, index + 1)}
                      className="p-1 bg-white rounded-full hover:bg-gray-100"
                    >
                      <ApperIcon name="ChevronRight" className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeImage(index)}
                    className="p-1 bg-white rounded-full hover:bg-gray-100"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 text-error" />
                  </button>
                </div>
              </div>
              
              {index === 0 && (
                <div className="absolute top-2 left-2">
                  <Badge variant="primary" size="small">
                    Main
                  </Badge>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUpload