'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/types/database'
import { useTour } from '@/components/onboarding'
import { NotificationCenter } from '@/components/notifications/NotificationCenter'

interface NavItem {
  href: string
  label: string
  icon: React.FC<{ className?: string }>
  roles: UserRole[]
  badge?: string
  tourId?: string
}

const navItems: NavItem[] = [
  // Cliente
  { href: '/dashboard', label: 'Mis Pedidos', icon: HomeIcon, roles: ['client'], tourId: 'dashboard' },
  { href: '/orders/new', label: 'Nuevo Pedido', icon: PlusIcon, roles: ['client'] },
  // Admin
  { href: '/admin', label: 'Panel de Pedidos', icon: CalendarViewIcon, roles: ['admin'], tourId: 'dashboard' },
  { href: '/admin/orders', label: 'Pedidos Web', icon: InboxIcon, roles: ['admin'] },
  { href: '/admin/users', label: 'Usuarios', icon: UsersIcon, roles: ['admin'] },
  { href: '/admin/analytics', label: 'Analytics', icon: ChartIcon, roles: ['admin'] },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { startTour } = useTour()
  const [userRole, setUserRole] = useState<UserRole>('client')
  const [userName, setUserName] = useState<string>('')
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserRole = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUserId(user.id)
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUserRole(profile.role as UserRole)
          setUserName(profile.full_name || user.email?.split('@')[0] || 'Usuario')
        }
      }
      setIsLoading(false)
    }

    fetchUserRole()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole))

  const getRoleBadge = (role: UserRole) => {
    const badges: Record<string, { label: string; color: string }> = {
      admin: { label: 'Admin', color: 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/30' },
      client: { label: 'Cliente', color: 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/30' },
    }
    return badges[role] ?? { label: role, color: 'bg-white/10 text-white/60 border border-white/20' }
  }

  const roleBadge = getRoleBadge(userRole)

  return (
    <aside
      data-tour="sidebar"
      className="fixed left-0 top-0 bottom-0 w-64 text-white flex flex-col z-40"
      style={{
        background: 'rgba(15, 12, 41, 0.80)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.07]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.3) 0%, rgba(0,180,220,0.2) 100%)',
              border: '1px solid rgba(0,212,255,0.35)',
            }}
          >
            <WashIcon className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h1 className="font-heading font-semibold text-base text-white/95">C&C Clean Express</h1>
            <p className="text-[11px] text-white/40">Lavandería Express</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div data-tour="user-profile" className="px-4 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white/90"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white/90">{userName}</p>
            <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full font-medium ${roleBadge.color}`}>
              {roleBadge.label}
            </span>
          </div>
          {/* Notifications */}
          {userId && (
            <NotificationCenter userId={userId} />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-white/10 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Navegación principal */}
            <div className="mb-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40 px-4 mb-2">
                {userRole === 'admin' ? 'Gestión' : 'Principal'}
              </p>
              {filteredNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' &&
                    item.href !== '/test-logistics' &&
                    pathname.startsWith(item.href))
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-tour={item.tourId}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${isActive
                        ? 'text-white border-l-2 border-cyan-400'
                        : 'text-white/60 hover:text-white/90'
                      }
                    `}
                    style={isActive ? {
                      background: 'rgba(0,212,255,0.12)',
                      borderLeft: '2px solid rgba(0,212,255,0.7)',
                    } : undefined}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = ''
                      }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs bg-secondary-500 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/[0.07] space-y-1">
        <button
          onClick={startTour}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white/90 transition-all duration-200"
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = '')}
        >
          <HelpIcon className="w-5 h-5" />
          <span className="font-medium">Tour de la App</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-red-300 transition-all duration-200"
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = '')}
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}

// Icons
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function CalendarViewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function CurrencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  )
}

function WashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
      <circle cx="12" cy="14" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 5h.01M8 5h.01" />
    </svg>
  )
}
