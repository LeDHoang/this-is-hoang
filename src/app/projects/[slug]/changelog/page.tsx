import { Timeline } from "@/components/ui/timeline";
import { supabase } from "@/lib/supabase";
import { BottomDock } from "@/components/sections/dock";
import { ExpandableChatDemo } from "@/components/ui/expandable-chat-demo";
import { TimelineAttachments } from "@/components/ui/TimelineAttachments";
import { projects as staticProjects } from "@/lib/projects";

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
      <div className="max-w-4xl mx-auto p-6">
        <Timeline
          data={data}
          title={`${projectTitle} Changelog`}
          description={projectSummary}
        />
      </div>
      <BottomDock />
      <ExpandableChatDemo />
    </>
  );
} 