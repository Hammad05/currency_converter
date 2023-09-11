export interface ConvertResponse {
  meta: {
    last_updated_at: Date;
  };
  data: Record<string, ConversionData>;
}

export interface ConversionData {
  code: string;
  value: number;
}

export interface GetSupportedCurrenciesResponse {
  data: Record<string, Currency>;
}

export interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export interface HistoricalRange {
  meta: {
    last_updated_at: Date;
  };
  data: Record<
    string,
    {
      code: string;
      value: number;
    }
  >;
}
