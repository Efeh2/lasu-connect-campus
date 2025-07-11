
import React from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => (
  <div className={cn("p-6 border rounded-lg", className)}>
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6 mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

interface DashboardSkeletonProps {
  className?: string;
}

export const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({ className }) => (
  <div className={cn("space-y-6", className)}>
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

interface FormSkeletonProps {
  fields?: number;
  className?: string;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({ fields = 4, className }) => (
  <div className={cn("space-y-6", className)}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    <Skeleton className="h-10 w-32" />
  </div>
);

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => (
  <div className={cn("space-y-4", className)}>
    <div className="grid grid-cols-4 gap-4 p-4 border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 w-full" />
        ))}
      </div>
    ))}
  </div>
);
