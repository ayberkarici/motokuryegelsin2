'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AdminAuthCheck } from '@/components/admin/auth-check'
import { LayoutDashboard, MapPin, FileText, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't wrap login page with layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/locations', icon: MapPin, label: 'İlçe & Mahalleler' },
    { href: '/admin/blog', icon: FileText, label: 'Blog Yönetimi' },
  ]

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-slate-900 border-slate-800 text-slate-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
              <h1 className="text-xl font-bold text-white">Moto Kurye Admin</h1>
              <p className="text-sm text-slate-400 mt-1">Yönetim Paneli</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-800">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start gap-3 border-slate-700 text-slate-300 hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                <LogOut className="h-5 w-5" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="lg:ml-64 min-h-screen">
          <div className="p-8">
            {children}
          </div>
        </main>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </AdminAuthCheck>
  )
}
