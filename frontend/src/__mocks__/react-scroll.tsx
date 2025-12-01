export const Link = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => <a href={`#${to}`}>{children}</a>;
export const Element = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
