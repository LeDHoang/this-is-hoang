import { Timeline } from "@/components/ui/timeline";
import { supabase } from "@/lib/supabase";
import { BottomDock } from "@/components/sections/dock";
import { ExpandableChatDemo } from "@/components/ui/expandable-chat-demo";
import { TimelineAttachments } from "@/components/ui/TimelineAttachments";
import { projects as staticProjects } from "@/lib/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // Determine project and logs from Supabase or static fallback
  let projectTitle: string;
  let projectSummary: string;
  let logsList: Array<{ log_date: string; note: string; project_log_attachments?: any[] }> = [];

  // Try fetching project from Supabase
  const { data: dbProject, error: projectError } = await supabase
    .from("projects")
    .select("id, title, summary")
    .eq("slug", slug)
    .single();
  if (!projectError && dbProject) {
    projectTitle = dbProject.title;
    projectSummary = dbProject.summary;
    const { data: dbLogs, error: logsError } = await supabase
      .from("project_logs")
      .select("log_date, note, project_log_attachments(id, url, type, caption)")
      .eq("project_id", dbProject.id)
      .order("log_date", { ascending: true });
    logsList = dbLogs ?? [];
    if (logsError) {
      console.error(logsError);
    }
  } else {
    // Fallback for static projects (e.g., Web Design category)
    const staticProject = staticProjects.find((p) =>
      p.title.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "") === slug
    );
    if (!staticProject) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Project not found</h1>
        </div>
      );
    }
    projectTitle = staticProject.title;
    projectSummary = staticProject.summary;
    logsList = staticProject.logs.map((log) => ({
      log_date: log.date,
      note: log.note
    }));
  }

  const data = logsList.map((log) => ({
    title: log.log_date,
    content: (
      <div className="text-sm text-secondary-foreground mb-4">
        <p>{log.note}</p>
        {log.project_log_attachments && log.project_log_attachments.length > 0 && (
          <TimelineAttachments attachments={log.project_log_attachments!} />
        )}
      </div>
    ),
  }));

  return (
    <>
      <div className="container mx-auto px-4 py-8 pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto relative">
          <Link 
            href="/#projects" 
            className="absolute -top-12 left-0 inline-flex items-center gap-2 text-primary hover:underline mb-6 z-10 md:-top-14">
            <ArrowLeft size={16} /> Back to projects
          </Link>
          <div className="card-hover blog-post bg-black bg-opacity-50 p-8 rounded-lg">
            <Timeline
              data={data}
              title={`${projectTitle} Changelog`}
              description={projectSummary}
            />
          </div>
        </div>
      </div>
      <BottomDock />
      <ExpandableChatDemo />
    </>
  );
} 