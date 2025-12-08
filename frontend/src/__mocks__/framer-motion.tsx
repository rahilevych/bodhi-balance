export const motion = {
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props}>{children}</li>
  ),
  nav: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <nav {...props}>{children}</nav>
  ),
};
