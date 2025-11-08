import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Users, BookOpen, LogOut, Plus } from "lucide-react";

const ProfessorDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
        loadCourses(user.id);
      }
    });
  }, [navigate]);

  const loadCourses = async (userId: string) => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("professor_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading courses",
        description: error.message,
      });
    } else {
      setCourses(data || []);
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
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Professor Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
            <Button onClick={() => navigate("/professor/create-course")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{courses.length}</CardTitle>
                <CardDescription>Active Courses</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Chat Analytics</CardTitle>
                <CardDescription>Query attendance data</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="gradient">
                  Open Chat
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">QR Codes</CardTitle>
                <CardDescription>Generate & manage</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Manage your courses and generate QR codes</CardDescription>
            </CardHeader>
            <CardContent>
              {courses.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No courses yet. Create your first course to get started!
                  </p>
                  <Button onClick={() => navigate("/professor/create-course")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <Card key={course.id}>
                      <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.code}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>Semester: {course.semester || "N/A"}</p>
                          <p>Year: {course.year || "N/A"}</p>
                          <Button className="w-full mt-4" size="sm">
                            <QrCode className="w-4 h-4 mr-2" />
                            Generate QR Code
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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

export default ProfessorDashboard;
