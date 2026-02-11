import { getCurrentUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { checkDatabaseHealth } from '@atlaspress/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Database, FileText, Users, BarChart3, TrendingUp, Clock, Activity } from 'lucide-react'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const dbHealth = await checkDatabaseHealth()

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with enhanced hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
            Welcome back, {user.name || user.email}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 text-pretty">
            Here's what's happening with your content today
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            View Activity
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* System Status Alert */}
      <Card className="border-l-4 border-l-success">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-full">
                <Database className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">All Systems Operational</h3>
                <p className="text-sm text-muted-foreground">
                  Database health: {dbHealth.status} • Last checked: {new Date(dbHealth.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <Badge variant="success" className="ml-4">
              Healthy
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 interactive-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Articles</CardTitle>
            <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-foreground">1,234</div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                12%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 interactive-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <div className="p-1.5 bg-success/10 rounded-md group-hover:bg-success/20 transition-colors">
              <Users className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-foreground">89</div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              from last week
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 interactive-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
            <div className="p-1.5 bg-info/10 rounded-md group-hover:bg-info/20 transition-colors">
              <BarChart3 className="h-4 w-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-foreground">45.2K</div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                18%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 interactive-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session</CardTitle>
            <div className="p-1.5 bg-warning/10 rounded-md group-hover:bg-warning/20 transition-colors">
              <Clock className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-foreground">4m 32s</div>
              <div className="flex items-center text-sm text-warning">
                <TrendingUp className="h-3 w-3 mr-1" />
                2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates across your workspace
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6" role="feed" aria-label="Recent activity list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 group" role="article" aria-busy="true" aria-label="Loading activity item">
                <Skeleton className="h-12 w-12 rounded-full loading-skeleton" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 loading-skeleton" />
                  <Skeleton className="h-3 w-1/2 loading-skeleton" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-20 rounded-md loading-skeleton" />
                  <Skeleton className="h-6 w-6 rounded loading-skeleton" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground" role="status">
            <p>No recent activity to display</p>
            <p className="mt-1">New updates will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
