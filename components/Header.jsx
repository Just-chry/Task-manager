"use client"

import { useState } from "react"
import { Menu, X, CheckSquare } from "lucide-react"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo e nome app */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <CheckSquare className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">TaskMate</h1>
                    </div>

                    {/* Menu desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                            Home
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                            Profilo
                        </a>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Logout
                        </button>
                    </nav>

                    {/* Menu mobile button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <nav className="py-4 space-y-2">
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                            >
                                Profilo
                            </a>
                            <div className="px-4 py-2">
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Logout
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
