"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Bike } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-blue-600">
              <Bike size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-600">MotoKuryeGelsin</h1>
              <p className="text-xs text-gray-500">İstanbul Moto Kurye Hizmeti</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              İletişim
            </Link>
            <Link 
              href="/kurye-cagir" 
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Kurye Çağır
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col space-y-1 p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-4 space-y-4 border-t">
            <Link href="/" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/hakkimizda" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
              İletişim
            </Link>
            <Link 
              href="/kurye-cagir" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Kurye Çağır
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header