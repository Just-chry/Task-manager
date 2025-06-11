"use client"

import { useState } from "react"
import { Check, Trash2, Calendar, AlertTriangle } from "lucide-react"

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const handleDeleteClick = (taskId) => {
        setDeleteConfirm(taskId)
    }

    const confirmDelete = (taskId) => {
        onDeleteTask(taskId)
        setDeleteConfirm(null)
    }

    const cancelDelete = () => {
        setDeleteConfirm(null)
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna attività trovata</h3>
                <p className="text-gray-500">Aggiungi una nuova attività per iniziare!</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                        task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                    }`}
                >
                    <div className="flex items-start space-x-4">
                        <button
                            onClick={() => onToggleTask(task.id)}
                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                task.completed ? "bg-green-600 border-green-600 text-white" : "border-gray-300 hover:border-blue-500"
                            }`}
                            aria-label={task.completed ? "Segna come non completato" : "Segna come completato"}
                        >
                            {task.completed && <Check className="h-4 w-4" />}
                        </button>
                        <div className="flex-1 min-w-0">
                            <h3
                                className={`text-lg font-semibold mb-2 ${
                                    task.completed ? "text-green-800 line-through" : "text-gray-900"
                                }`}
                            >
                                {task.title}
                            </h3>

                            {task.description && (
                                <p className={`text-sm mb-3 ${task.completed ? "text-green-700" : "text-gray-600"}`}>
                                    {task.description}
                                </p>
                            )}

                            <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Creato il {formatDate(task.createdAt)}</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            {deleteConfirm === task.id ? (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => confirmDelete(task.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                    >
                                        Conferma
                                    </button>
                                    <button
                                        onClick={cancelDelete}
                                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
                                    >
                                        Annulla
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleDeleteClick(task.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    aria-label="Elimina attività"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
            <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {task.completed ? (
                  <>
                      <Check className="h-3 w-3 mr-1" />
                      Completato
                  </>
              ) : (
                  <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Da completare
                  </>
              )}
            </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
