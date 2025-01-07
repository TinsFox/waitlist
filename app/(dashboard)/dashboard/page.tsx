"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  ListChecks,
  Mail,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface WaitlistStats {
  totalUsers: number
  activeUsers: number
  conversionRate: number
  averageWaitTime: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<WaitlistStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const fetchStats = async () => {
      try {
        // 这里应该是实际的API调用
        // const response = await fetch('/api/dashboard/stats')
        // const data = await response.json()

        // 模拟数据
        const mockData = {
          totalUsers: 1234,
          activeUsers: 892,
          conversionRate: 76.5,
          averageWaitTime: "3.5 days",
        }

        setStats(mockData)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Invite Users
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Users Card */}
        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats?.totalUsers}</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  +12.5%
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats?.activeUsers}</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  +5.2%
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversion Rate Card */}
        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {stats?.conversionRate}%
                </div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  +2.1%
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Average Wait Time Card */}
        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Wait Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {stats?.averageWaitTime}
                </div>
                <div className="text-xs text-red-500 flex items-center gap-1">
                  +0.8%
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              // 加载状态的骨架屏
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))
            ) : (
              // 这里可以添加实际的活动列表
              <div className="text-sm text-muted-foreground">
                No recent activity to display
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
