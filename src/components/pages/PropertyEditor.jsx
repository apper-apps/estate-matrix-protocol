import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import PropertyForm from "@/components/organisms/PropertyForm";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import PropertyService from "@/services/api/PropertyService";

function PropertyEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const isEditing = Boolean(id)

  const loadProperty = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await PropertyService.getById(parseInt(id))
      setProperty(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isEditing) {
      loadProperty()
    }
  }, [id, isEditing])

  const handleSubmit = async (formData) => {
    try {
      setSaving(true)
      
      if (isEditing) {
        await PropertyService.update(parseInt(id), formData)
        toast.success('Property updated successfully!')
      } else {
        await PropertyService.create(formData)
        toast.success('Property created successfully!')
      }
      
      navigate('/properties')
    } catch (err) {
      toast.error(isEditing ? 'Failed to update property' : 'Failed to create property')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadProperty} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/properties')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update your property information' : 'Create a new property listing'}
          </p>
        </div>
      </div>

      {/* Form */}
      <PropertyForm
        property={property}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  )
}

export default PropertyEditor