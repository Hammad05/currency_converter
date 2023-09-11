import { RoutePath } from 'src/app/app-routing.module';

export type Link = {
  label: string;
  url: string;
  params?: Record<string, string>;
};

export type Config = {
  defaultNavLinks: Link[];
  popularCurrencyCodes: string[];
};

export const config: Config = {
  defaultNavLinks: [
    {
      label: 'EUR USD Details',
      url: 'details',
      params: {
        from: 'EUR',
        to: 'USD',
        title: 'EUR - Euro to USD - Dollars',
      },
    },
    {
      label: 'USD GBP Details',
      url: 'details',
      params: {
        from: 'USD',
        to: 'GBP',
        title: 'USD - Dollars to GBP - Pounds',
      },
    },
  ],
  popularCurrencyCodes: [
    'EUR',
    'USD',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CNY',
    'HKD',
    'NZD',
  ],
};
