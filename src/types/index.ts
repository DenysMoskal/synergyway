export interface CompanyInfo {
  id: string;
  ticker: string;
  name: string;
  lei: string;
  legal_name: string;
  stock_exchange: string;
  sic: number;
  short_description: string;
  long_description: string;
  ceo: string;
  company_url: string;
  business_address: string;
  mailing_address: string;
  business_phone_no: string;
  employees: number;
  entity_legal_form: string;
  entity_status: string;
  sector: string;
  industry_category: string;
  industry_group: string;
  [key: string]: string | number | boolean | null;
}
