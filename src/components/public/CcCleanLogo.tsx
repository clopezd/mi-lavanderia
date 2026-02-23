import Link from 'next/link'

interface CcCleanLogoProps {
  className?: string
  iconSize?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function CcCleanLogo({ className = '', iconSize = 'md', onClick }: CcCleanLogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-base', sub: 'text-xs' },
    md: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-sm' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-base' },
  }
  const s = sizes[iconSize]

  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Water drop icon */}
      <svg
        className={`${s.icon} text-cyan-500 group-hover:text-cyan-600 transition-colors`}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Drop shape */}
        <path
          d="M16 3C16 3 6 13.5 6 20a10 10 0 0020 0C26 13.5 16 3 16 3z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bubble highlight */}
        <circle cx="12" cy="17" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="19" cy="14" r="1.2" fill="currentColor" fillOpacity="0.3" />
      </svg>

      {/* Text */}
      <div className="flex items-baseline gap-1 leading-none">
        <span className={`font-heading ${s.text} font-bold text-cyan-700 tracking-tight`}>
          C&amp;C
        </span>
        <span className={`font-heading ${s.sub} font-light text-gray-500 tracking-tight`}>
          Clean Express
        </span>
      </div>
    </Link>
  )
}
