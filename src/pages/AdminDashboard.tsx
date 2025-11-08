import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Users, BarChart3, LogOut, Mail } from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalProfessors: 0,
    totalCourses: 0,
    totalAttendance: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
        loadStats();
      }
    });
  }, [navigate]);

  const loadStats = async () => {
    // Load students
    const { count: studentCount } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "student");

    // Load professors
    const { count: professorCount } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "professor");

    // Load courses
    const { count: courseCount } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true });

    // Load attendance records
    const { count: attendanceCount } = await supabase
      .from("attendance_records")
      .select("*", { count: "exact", head: true });

    setStats({
      totalStudents: studentCount || 0,
      totalProfessors: professorCount || 0,
      totalCourses: courseCount || 0,
      totalAttendance: attendanceCount || 0,
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-soft">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <QrCode className="w-6 h-6 text-primary" />
            <span>AttendTrack</span>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Institution-wide attendance oversight and analytics
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{stats.totalStudents}</CardTitle>
                <CardDescription>Total Students</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{stats.totalProfessors}</CardTitle>
                <CardDescription>Total Professors</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{stats.totalCourses}</CardTitle>
                <CardDescription>Active Courses</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{stats.totalAttendance}</CardTitle>
                <CardDescription>Check-ins</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chat Analytics</CardTitle>
                <CardDescription>
                  Query attendance data with natural language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ask questions like:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• "List students below 75% attendance"</li>
                  <li>• "Show low attendance in Computer Science"</li>
                  <li>• "Generate bar chart of average attendance"</li>
                </ul>
                <Button className="w-full" variant="gradient">
                  Open Chat Interface
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Automation</CardTitle>
                <CardDescription>
                  Send bulk emails to students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Target students by:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Attendance percentage</li>
                  <li>• Year and course</li>
                  <li>• Custom filters</li>
                </ul>
                <Button className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-Time Analytics</CardTitle>
              <CardDescription>
                Generate charts and reports on demand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Bar Chart
                </Button>
                <Button variant="outline" className="h-20">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Pie Chart
                </Button>
                <Button variant="outline" className="h-20">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Line Chart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
