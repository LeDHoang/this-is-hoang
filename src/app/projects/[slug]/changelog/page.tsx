import { Timeline } from "@/components/ui/timeline";
import { supabase } from "@/lib/supabase";
import { BottomDock } from "@/components/sections/dock";
import { ExpandableChatDemo } from "@/components/ui/expandable-chat-demo";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {log.project_log_attachments.map((att) => (
              <div key={att.id}>
                {att.type === "image" ? (
                  <img src={att.url} alt={att.caption} className="max-w-full h-auto rounded" />
                ) : (
                  <a href={att.url} target="_blank" rel="noopener noreferrer">
                    {att.caption}
                  </a>
                )}
              </div>
            ))}
          </div>
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