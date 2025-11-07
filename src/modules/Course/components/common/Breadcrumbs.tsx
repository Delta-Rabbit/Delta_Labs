/**
 * Delta Labs Breadcrumbs Component
 * Reusable breadcrumbs for Course module using theme tokens
 */

import React from 'react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-text-secondary font-primary">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-text-tertiary">/</span>
          )}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-text-primary transition-colors transition-normal ease-ease font-primary"
            >
              {item.label}
            </button>
          ) : (
            <span className={`font-primary ${item.isActive ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

