export function Icon({
  name,
}: {
  name: "arrow" | "chevron" | "plus" | "copy" | "check" | "code";
}) {
  const paths = {
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    plus: <path d="M12 5v14M5 12h14" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V4H4v12h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    code: <path d="m7 7-5 5 5 5m10-10 5 5-5 5m-4-14-2 18" />,
  };
  return (
    <svg
      className="ui-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
