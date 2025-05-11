import { Timeline } from "@/components/ui/timeline";
import projects from "@/lib/projects";
import { BottomDock } from "@/components/sections/dock";
import { ExpandableChatDemo } from "@/components/ui/expandable-chat-demo";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find(
    (p) =>
      p.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") === slug
  );
  if (!project) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  const data = project.logs
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((log) => ({
      title: log.date,
      content: (
        <div className="text-sm text-secondary-foreground mb-4">
          {log.note}
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