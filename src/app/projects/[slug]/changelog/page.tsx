import { Timeline } from "@/components/ui/timeline";
import { supabase } from "@/lib/supabase";
import { BottomDock } from "@/components/sections/dock";
import { ExpandableChatDemo } from "@/components/ui/expandable-chat-demo";
import { TimelineAttachments } from "@/components/ui/TimelineAttachments";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // fetch project by slug from Supabase
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, title, summary")
    .eq("slug", slug)
    .single();
  if (projectError || !project) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  // fetch logs with attachments
  const { data: logs, error: logsError } = await supabase
    .from("project_logs")
    .select("log_date, note, project_log_attachments(id, url, type, caption)")
    .eq("project_id", project.id)
    .order("log_date", { ascending: false });
  const logsList = logs ?? [];
  if (logsError) {
    console.error(logsError);
  }

  const data = logsList.map((log) => ({
    title: log.log_date,
    content: (
      <div className="text-sm text-secondary-foreground mb-4">
        <p>{log.note}</p>
        {log.project_log_attachments?.length > 0 && (
          <TimelineAttachments attachments={log.project_log_attachments} />
        )}
      </div>
    ),
  }));

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <Timeline
          data={data}
          title={`${project.title} Changelog`}
          description={project.summary}
        />
      </div>
      <BottomDock />
      <ExpandableChatDemo />
    </>
  );
} 