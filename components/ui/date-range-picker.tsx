import React from 'react';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: DateRangePickerProps) {
  // Format the date for display (YYYY-MM)
  const formatDateForInput = (date: string | null | undefined) => {
    if (!date) return '';

    // Handle both YYYY-MM-DD and YYYY formats
    if (date.includes('-')) {
      // If it's already a full date (YYYY-MM-DD), just use the year and month
      const [year, month] = date.split('-');
      return `${year}-${month}`;
    } else {
      // If it's just a year (YYYY), add -01 for month input compatibility
      return `${date}-01`;
    }
  };

  // Handle date change while preserving the full date format
  const handleStartDateChange = (value: string) => {
    if (!value) {
      onStartDateChange('');
      return;
    }

    // If the value is just a year (YYYY), convert to YYYY-01-01
    if (!value.includes('-')) {
      onStartDateChange(`${value}-01-01`);
    } else {
      // If it's already a full date, keep it as is
      onStartDateChange(value);
    }
  };

  const handleEndDateChange = (value: string) => {
    if (!value) {
      onEndDateChange('');
      return;
    }

    // If the value is just a year (YYYY), convert to YYYY-01-01
    if (!value.includes('-')) {
      onEndDateChange(`${value}-01-01`);
    } else {
      // If it's already a full date, keep it as is
      onEndDateChange(value);
    }
  };

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex-1 sm:mr-2">
          <Label htmlFor="start-date" className="text-sm font-medium">
            Start Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="start-date"
            type="month"
            value={formatDateForInput(startDate)}
            onChange={(e) => handleStartDateChange(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>
        <div className="flex-1 sm:ml-2">
          <Label htmlFor="end-date" className="text-sm font-medium">
            End Date
          </Label>
          <Input
            id="end-date"
            type="month"
            value={formatDateForInput(endDate)}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="mt-1 w-full"
            placeholder="In progress"
          />
        </div>
      </div>
    </div>
  );
}
