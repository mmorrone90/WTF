import React from 'react';
import { Globe } from 'lucide-react';

interface CountryData {
  country: string;
  percentage: string;
}

const countries: CountryData[] = [
  { country: "United States", percentage: "30%" },
  { country: "United Kingdom", percentage: "25%" },
  { country: "Germany", percentage: "20%" },
  { country: "France", percentage: "15%" },
  { country: "Japan", percentage: "10%" }
];

export default function TopCountries() {
  return (
    <div className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">Top Countries</h3>
      <div className="space-y-2">
        {countries.map(({ country, percentage }) => (
          <div key={country} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-text-grey" />
              <span>{country}</span>
            </div>
            <span className="font-bold">{percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
