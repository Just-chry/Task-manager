"use client"

import { Filter, SortAsc } from "lucide-react"

export default function TaskFilters({ filter, setFilter, sortBy, setSortBy, tasksCount }) {
    const filterOptions = [
        { value: "all", label: "Tutti", count: tasksCount.total },
        { value: "pending", label: "Da completare", count: tasksCount.pending },
        { value: "completed", label: "Completati", count: tasksCount.completed },
    ]

    const sortOptions = [
        { value: "date", label: "Data creazione" },
        { value: "alphabetical", label: "Alfabetico" },
    ]

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                <Filter className="h-5 w-5" />
                <span>Filtri e Ordinamento</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Filtra per stato</label>
                    <div className="flex flex-wrap gap-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFilter(option.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === option.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {option.label}
                                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/20">{option.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        <SortAsc className="h-4 w-4 inline mr-2" />
                        Ordina per
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
