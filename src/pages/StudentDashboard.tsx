import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Calendar, BarChart3, LogOut } from "lucide-react";

const StudentDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
        loadAttendance(user.id);
      }
    });
  }, [navigate]);

  const loadAttendance = async (userId: string) => {
    const { data, error } = await supabase
      .from("attendance_records")
      .select(`
        *,
        courses:course_id (
          name,
          code
        )
      `)
      .eq("student_id", userId)
      .order("checked_in_at", { ascending: false })
      .limit(10);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading attendance",
        description: error.message,
      });
    } else {
      setAttendanceRecords(data || []);
    }
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
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {attendanceRecords.length}
                </CardTitle>
                <CardDescription>Total Check-ins</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Scan QR</CardTitle>
                <CardDescription>Check in to class</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => navigate("/student/scan")}>
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">History</CardTitle>
                <CardDescription>View all records</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your latest check-ins</CardDescription>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No attendance records yet. Scan a QR code to check in!
                </p>
              ) : (
                <div className="space-y-4">
                  {attendanceRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div>
                        <p className="font-medium">{record.courses?.name || "Unknown Course"}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.courses?.code || ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(record.checked_in_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(record.checked_in_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
