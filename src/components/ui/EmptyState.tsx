type EmptyStateProps = { children: string }

export default function EmptyState({ children }: EmptyStateProps) {
  return <div className="panel catalog-message">{children}</div>
}
