export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">TaskMate</h3>
                        <p className="text-gray-300 text-sm">
                            La tua app personale per gestire le attività quotidiane in modo semplice ed efficace.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold">Link Utili</h4>
                        <nav className="space-y-2">
                            <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                                Termini di Servizio
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                                Contatti
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                                Supporto
                            </a>
                        </nav>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold">Contatti</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Email: info@taskmate.com</p>
                            <p>Telefono: +39 123 456 7890</p>
                            <p>Indirizzo: Via Roma 123, Milano</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-300 text-sm">© {currentYear} TaskMate. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    )
}
