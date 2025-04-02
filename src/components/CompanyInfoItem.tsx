import React from 'react';

interface CompanyInfoItemProps {
  label: string;
  value: string | number | null;
}

const CompanyInfoItem: React.FC<CompanyInfoItemProps> = ({ label, value }) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="font-semibold">{label}</div>
      <div>{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
  );
};

export default CompanyInfoItem;
