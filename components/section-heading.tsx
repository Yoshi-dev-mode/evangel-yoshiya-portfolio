export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
