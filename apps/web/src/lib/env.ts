import { z, type ZodError } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.string().url().optional().default('http://localhost:3000/api'),
  DATABASE_URL: z.string().min(1).optional().default('postgresql://localhost:5432/atlaspress_dev'),
  GITHUB_CLIENT_ID: z.string().min(1).optional().default('test_github_client_id'),
  GITHUB_CLIENT_SECRET: z.string().min(1).optional().default('test_github_client_secret'),
  // NextAuth v5 beta uses AUTH_SECRET instead of NEXTAUTH_SECRET
  AUTH_SECRET: z.string().min(1).optional().default('test_nextauth_secret_for_development_only'),
  AUTH_URL: z.string().url().optional(),
  // Legacy support
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
})

export const env = (() => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('⚠️ Using default environment values due to validation error:', error)
    return {
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
      NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
      DATABASE_URL: 'postgresql://localhost:5432/atlaspress_dev',
      GITHUB_CLIENT_ID: 'test_github_client_id',
      GITHUB_CLIENT_SECRET: 'test_github_client_secret',
      AUTH_SECRET: 'test_nextauth_secret_for_development_only',
      AUTH_URL: undefined,
      NEXTAUTH_SECRET: undefined,
      NEXTAUTH_URL: undefined,
    }
  }
})()

export function validateEnv() {
  try {
    envSchema.parse(process.env)
    return { success: true }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Environment validation failed:')
    if (error && typeof error === 'object' && 'flatten' in error) {
      // eslint-disable-next-line no-console
      console.error((error as ZodError).flatten().fieldErrors)
    }
    return { success: false, error: error as ZodError | unknown }
  }
}
