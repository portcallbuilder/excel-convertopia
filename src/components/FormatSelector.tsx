
import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Format {
  id: string;
  name: string;
  extension: string;
  icon: JSX.Element;
  description: string;
}

interface FormatSelectorProps {
  formats: Format[];
  onSelect: (format: Format) => void;
  selectedFormat: Format | null;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
  formats,
  onSelect,
  selectedFormat,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Select Output Format</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {formats.map((format) => (
          <div
            key={format.id}
            className={cn(
              "format-card border rounded-lg p-4 cursor-pointer overflow-hidden",
              format.id === selectedFormat?.id ? "is-selected" : ""
            )}
            onClick={() => onSelect(format)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-secondary rounded-lg mr-3">
                {format.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{format.name}</p>
                <p className="text-xs text-muted-foreground">{format.extension}</p>
              </div>
              {format.id === selectedFormat?.id && (
                <div className="ml-auto bg-primary rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {format.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;
