import { useEffect, useState } from 'react';
import CompanySelector from './UI/CompanySelector';
import Loader from './UI/Loader';
import NotFound from './UI/NotFound';
import CompanyInfoItem from './CompanyInfoItem';
import { CompanyInfo } from '../types';

interface CompanyInfoWidgetProps {
  ticker: string;
  onTickerChange?: (ticker: string) => void;
}

const CompanyInfoWidget: React.FC<CompanyInfoWidgetProps> = ({
  ticker,
  onTickerChange,
}) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableTickers, setAvailableTickers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch('http://localhost:3001/companies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies data');
        }

        const companies = await response.json();

        const tickers = companies.map((company: CompanyInfo) => company.ticker);

        setAvailableTickers(tickers);

        if (
          (!ticker || !tickers.includes(ticker)) &&
          tickers.length > 0 &&
          onTickerChange
        ) {
          onTickerChange(tickers[0]);
        }
      } catch (error) {
        console.error('Error fetching tickers:', error);
        setError('Failed to load companies data. Please try again later.');
      }
    };

    fetchTickers();
  }, [ticker, onTickerChange]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (!ticker) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3001/companies?ticker=${ticker}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch company data for ticker ${ticker}`);
        }

        const companies = await response.json();

        if (companies && companies.length > 0) {
          setCompanyInfo(companies[0] as CompanyInfo);
        } else {
          setError(`Company with ticker ${ticker} not found`);
          setCompanyInfo(null);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('Failed to load company data. Please try again later.');
        setCompanyInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, [ticker]);

  const handleTickerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onTickerChange) {
      onTickerChange(e.target.value);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound message={error} />;
  }

  if (!companyInfo) {
    return <NotFound />;
  }

  const companyInfoItems = [
    { label: 'Ticker', value: companyInfo.ticker },
    { label: 'Name', value: companyInfo.name },
    { label: 'Legal Name', value: companyInfo.legal_name },
    { label: 'Stock Exchange', value: companyInfo.stock_exchange },
    { label: 'Short Description', value: companyInfo.short_description },
    { label: 'Business Address', value: companyInfo.business_address },
    { label: 'Business Phone', value: companyInfo.business_phone_no },
    { label: 'Entity Legal Form', value: companyInfo.entity_legal_form },
    { label: 'Employees', value: companyInfo.employees },
    { label: 'Web', value: companyInfo.company_url },
  ];

  return (
    <div className="h-full overflow-auto bg-white p-4">
      <CompanySelector
        ticker={ticker}
        handleTickerChange={handleTickerChange}
        availableTickers={availableTickers}
      />

      <div className="company-info">
        <h2 className="text-xl font-bold mb-2">Company Info</h2>

        {companyInfoItems.map((item, index) => (
          <CompanyInfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoWidget;
