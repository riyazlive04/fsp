/** Route-level enter transition (opacity only, so pinned sections are unaffected). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
