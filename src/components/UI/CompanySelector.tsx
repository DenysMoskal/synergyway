import { FC } from 'react';

interface CompanySelectorProps {
  ticker: string;
  handleTickerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableTickers: string[];
}

const CompanySelector: FC<CompanySelectorProps> = ({
  ticker,
  handleTickerChange,
  availableTickers,
}) => {
  return (
    <div className="mb-4 flex items-center">
      <label
        htmlFor="ticker-select"
        className="block text-sm font-medium text-gray-700 mb-1 w-fit mr-2"
      >
        Select Company:
      </label>
      <select
        id="ticker-select"
        value={ticker}
        onChange={handleTickerChange}
        className="block w-60 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        {availableTickers.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanySelector;
