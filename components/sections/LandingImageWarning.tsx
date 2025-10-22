import Image from 'next/image'
import React from 'react'

interface LandingImageWarningProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const LandingImageWarning: React.FC<LandingImageWarningProps> = ({ src, alt, width = 600, height = 400, className = '' }) => {
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="mb-2">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className + ' rounded-xl shadow-lg object-cover'}
          priority
        />
      </div>
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm max-w-lg text-center border border-yellow-300">
        Uyarı: Bu görselin dosya boyutu büyük olabilir ve sayfa performansını olumsuz etkileyebilir. Daha iyi performans için görselleri optimize edin.
      </div>
    </div>
  )
}

export default LandingImageWarning
