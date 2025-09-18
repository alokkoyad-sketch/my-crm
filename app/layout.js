import './globals.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'satvin ayurveda',
  description: 'CRM Dashboard Demo',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
