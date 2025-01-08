import React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className = '', ...props }: TableProps) {
  return (
    <tr 
      className={`border-b border-dark-grey hover:bg-dark-grey/50 transition-colors ${className}`} 
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '', ...props }: TableProps) {
  return (
    <th 
      className={`h-12 px-4 text-left align-middle font-medium text-text-grey ${className}`} 
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = '', ...props }: TableProps) {
  return (
    <td 
      className={`p-4 align-middle ${className}`} 
      {...props}
    >
      {children}
    </td>
  );
}