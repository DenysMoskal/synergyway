import { useEffect, useState } from 'react';
import companiesData from '../api/companies-lookup.json';
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

  useEffect(() => {
    const tickers = companiesData.map((company) => company.ticker);
    setAvailableTickers(tickers);

    if (
      (!ticker || !tickers.includes(ticker)) &&
      tickers.length > 0 &&
      onTickerChange
    ) {
      onTickerChange(tickers[0]);
    }
  }, [ticker, onTickerChange]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (!ticker) return;

      setLoading(true);
      try {
        const company = companiesData.find(
          (company) => company.ticker === ticker
        );

        await new Promise((resolve) => setTimeout(resolve, 300));

        if (company) {
          setCompanyInfo(company as CompanyInfo);
        } else {
          console.error(`Company with ticker ${ticker} not found`);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
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
