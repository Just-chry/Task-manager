import "./globals.css"

export const metadata = {
    title: "TaskMate - Gestione Attività Personali",
    description: "App per gestire le tue attività quotidiane in modo semplice ed efficace",
}

export default function RootLayout({ children }) {
    return (
        <html lang="it">
        <body className="antialiased">{children}</body>
        </html>
    )
}
