"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import TaskFilters from "../components/TaskFilters"
import Footer from "../components/Footer"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Mock data iniziali
  const mockTasks = [
    {
      id: 1,
      title: "Completare il progetto TaskMate",
      description: "Sviluppare tutte le funzionalità richieste per la web app",
      completed: false,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "Studiare React Hooks",
      description: "Approfondire useState, useEffect e custom hooks",
      completed: true,
      createdAt: new Date("2024-01-10"),
    },
    {
      id: 3,
      title: "Fare la spesa",
      description: "Comprare ingredienti per la cena di domani",
      completed: false,
      createdAt: new Date("2024-01-20"),
    },
  ]

  useEffect(() => {
    const savedTasks = localStorage.getItem("taskmate-tasks")
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }))
      setTasks(parsedTasks)
    } else {
      setTasks(mockTasks)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("taskmate-tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title)
    }
    return b.createdAt - a.createdAt // più recenti prima
  })

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Aggiungi Nuova Attività</h2>
              <TaskForm onAddTask={addTask} />
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
              <TaskFilters
                  filter={filter}
                  setFilter={setFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  tasksCount={{
                    total: tasks.length,
                    completed: tasks.filter((t) => t.completed).length,
                    pending: tasks.filter((t) => !t.completed).length,
                  }}
              />
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Le Tue Attività
                <span className="text-sm font-normal text-gray-500 ml-2">
                ({sortedTasks.length}{" "}
                  {filter === "all" ? "totali" : filter === "completed" ? "completate" : "da completare"})
              </span>
              </h2>
              <TaskList tasks={sortedTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
            </section>
          </div>
        </main>

        <Footer />
      </div>
  )
}
