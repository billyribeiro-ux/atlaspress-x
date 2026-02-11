'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  LogOut,
  X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AppSidebarProps {
  open?: boolean
  onClose?: () => void
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Content',
    href: '/content',
    icon: FileText,
    children: [
      { name: 'Articles', href: '/content/articles' },
      { name: 'Pages', href: '/content/pages' },
      { name: 'Media', href: '/content/media' },
    ],
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

interface NavLinkProps {
  item: {
    name: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    children?: { name: string; href: string }[]
  }
  level?: number
  pathname: string
  onClose?: () => void
}

function NavLink({ item, level = 0, pathname, onClose }: NavLinkProps) {
  const isActive = pathname === item.href
  const hasChildren = item.children && item.children.length > 0
  const [isExpanded, setIsExpanded] = React.useState(
    item.children?.some((child) => pathname === child.href) ?? false
  )

  return (
    <div>
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          level > 0 && 'pl-9'
        )}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded)
          } else {
            onClose?.()
          }
        }}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        <span className="flex-1">{item.name}</span>
        {hasChildren && (
          <svg
            className={cn(
              'h-4 w-4 transition-transform',
              isExpanded && 'rotate-90'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </Link>

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavLink key={child.href} item={child} level={1} pathname={pathname} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  )
}

export function AppSidebar({ open = false, onClose }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform lg:hidden',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onClose={onClose} />
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-card border-r">
          <div className="flex h-16 items-center px-6 border-b">
            <h2 className="text-lg font-semibold">AtlasPress X</h2>
          </div>

          <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onClose={onClose} />
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
