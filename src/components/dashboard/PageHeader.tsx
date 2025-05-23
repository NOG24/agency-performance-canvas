
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div className={cn('flex flex-col md:flex-row items-start md:items-center md:justify-between mb-8', className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children && <div className="mt-4 md:mt-0 md:ml-auto">{children}</div>}
    </div>
  );
};

export default PageHeader;
