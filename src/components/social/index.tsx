import type { ReactNode } from "react";

interface Props {
  url: string;
  children: ReactNode;
}

const Social = ({ url, children }: Props) => {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

export default Social