import { Eyebrow } from "@/components/eyebrow";

export function SectionHeading({ index, label, title, emphasis, body }: {
  index: string;
  label: string;
  title: string;
  emphasis: string;
  body: string;
}) {
  return (
    <div className="section-heading">
      <div><Eyebrow>{index} — {label}</Eyebrow><h2>{title}<br /><em>{emphasis}</em></h2></div>
      <p>{body}</p>
    </div>
  );
}
