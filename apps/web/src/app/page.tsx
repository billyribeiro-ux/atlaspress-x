import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            AtlasPress X
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Enterprise Publishing and Content Operations Platform
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/auth/signin">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for Enterprise Teams
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              World-class publishing workflows, enterprise SEO, scalable performance, 
              governance and auditability, and growth analytics.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Workspace & RBAC</CardTitle>
                <CardDescription>
                  Workspace isolation with granular permissions and enterprise-grade security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support for complex organizational structures with role-based access control.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Editorial Workflow Engine</CardTitle>
                <CardDescription>
                  Custom workflows with approval chains and SLA management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Streamline content creation with configurable approval processes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Content Studio</CardTitle>
                <CardDescription>
                  Block editor with structured content and reusable templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create rich content experiences with our intuitive block-based editor.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise SEO</CardTitle>
                <CardDescription>
                  Comprehensive SEO tools with automated optimization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Maximize your content's reach with advanced SEO capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Phase 0 Complete: Architecture, Domain Model, Folder Structure, ADRs ✅
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Phase 1 In Progress: Bootstrapping + Toolchain + CI + pnpm Scripts
          </p>
        </div>
      </main>
    </div>
  )
}
