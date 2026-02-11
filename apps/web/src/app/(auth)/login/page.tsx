import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Sign in to AtlasPress X
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <form method="POST" action="/api/auth/signin/github" className="w-full">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
