import type { ReactNode } from 'react'

type PageHeadingProps = {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
}

export default function PageHeading({ eyebrow, title, description, children }: PageHeadingProps) {
  return <div className="page-heading">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    {children && <div className="heading-actions">{children}</div>}
  </div>
}
