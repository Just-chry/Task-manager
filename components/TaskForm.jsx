"use client"

import { useState } from "react"
import { Plus, AlertCircle } from "lucide-react"

export default function TaskForm({ onAddTask }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "Il titolo è obbligatorio"
        } else if (formData.title.trim().length < 3) {
            newErrors.title = "Il titolo deve essere di almeno 3 caratteri"
        }

        if (formData.description.trim().length > 200) {
            newErrors.description = "La descrizione non può superare i 200 caratteri"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const newErrors = validateForm()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSubmitting(false)
            return
        }

        // Simula un piccolo delay per UX
        await new Promise((resolve) => setTimeout(resolve, 300))

        onAddTask({
            title: formData.title.trim(),
            description: formData.description.trim(),
        })

        // Reset form
        setFormData({ title: "", description: "" })
        setErrors({})
        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo titolo */}
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Titolo *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.title ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Inserisci il titolo dell'attività"
                        maxLength={100}
                    />
                    {errors.title && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.title}</span>
                        </div>
                    )}
                </div>

                {/* Campo descrizione */}
                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descrizione
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                            errors.description ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Descrizione opzionale dell'attività"
                        maxLength={200}
                    />
                    <div className="flex justify-between items-center">
                        {errors.description && (
                            <div className="flex items-center space-x-2 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.description}</span>
                            </div>
                        )}
                        <span className="text-sm text-gray-500 ml-auto">{formData.description.length}/200</span>
                    </div>
                </div>
            </div>

            {/* Pulsante submit */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    <Plus className="h-5 w-5" />
                    <span>{isSubmitting ? "Aggiungendo..." : "Aggiungi Attività"}</span>
                </button>
            </div>
        </form>
    )
}
