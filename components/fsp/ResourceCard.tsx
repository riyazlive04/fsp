import type { FspResource } from "@/data/resources";
import { resourceCategories } from "@/data/resources";
import { Arrow } from "@/components/ui/Arrow";

export function ResourceCard({ resource }: { resource: FspResource }) {
  const category = resourceCategories.find((c) => c.id === resource.category);
  const body = (
    <>
      <span className="flex items-center justify-between gap-4">
        <span className="eyebrow text-navy">{category?.label}</span>
        {resource.type && <span className="text-xs font-semibold text-muted">{resource.type}</span>}
      </span>
      <span>
        <span className="block text-xl font-semibold leading-tight tracking-tight">{resource.title}</span>
        {resource.description && <span className="mt-2 block text-sm text-muted">{resource.description}</span>}
      </span>
      <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em]">
        {resource.access === "members" ? <span className="text-muted">Members</span> : <span />}
        {resource.href && <Arrow className="text-navy transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      </span>
    </>
  );
  const cls = "group flex h-full min-h-56 flex-col justify-between gap-6 bg-white p-6 transition-colors hover:bg-paper";
  return resource.href ? (
    <a href={resource.href} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
