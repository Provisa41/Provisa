export type VisaNewsItem = {
    id: string;
    countryId: string;
    date: string;
    title: string;
    summary: string;
    tag?: string;
};
export type VisaTypeInfo = {
    id: string;
    name: string;
    purpose: string;
    processing: string;
    documents: string[];
    notes?: string;
};
export type CountryInfo = {
    id: string;
    flag: string;
    name: string;
    region: string;
    summary: string;
    visaTypes: VisaTypeInfo[];
};
export declare const visaNews: VisaNewsItem[];
export declare const countries: CountryInfo[];
export declare function getCountry(id: string): CountryInfo | undefined;
export declare function getNews(countryId?: string): VisaNewsItem[];
export declare function formatCountryDocumentsHtml(country: CountryInfo): string;
export declare function formatNewsDigestHtml(limit?: number): string;
