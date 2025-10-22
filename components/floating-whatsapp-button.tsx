'use client'

import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    const phoneNumber = '+905416955234'
    const message = encodeURIComponent('Merhaba, motokurye hizmeti hakkında bilgi almak istiyorum.')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Pulse animation keyframes */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(0.95);
            opacity: 1;
          }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}</style>

      <button
        onClick={handleClick}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="WhatsApp ile iletişime geç"
      >
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full pulse-ring opacity-75"></div>
        
        {/* Main button */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          WhatsApp ile iletişime geç
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
        </div>
      </button>
    </>
  )
}
