import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock matchMedia for next-themes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Next.js router
vi.mock('@/lib/utils', () => ({
  cn: vi.fn(),
  slugify: vi.fn(),
  formatDate: vi.fn(),
  formatTime: vi.fn(),
  truncate: vi.fn(),
  debounce: vi.fn(),
  throttle: vi.fn(),
  generateId: vi.fn(),
}))

// Mock Next.js image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, priority, ...rest } = props
    return `<img ${Object.entries(rest).map(([k, v]) => `${k}="${v}"`).join(' ')} />`
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api'
