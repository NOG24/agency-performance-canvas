
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building } from 'lucide-react';

// Mock data for companies
const MOCK_COMPANIES = [
  { id: '1', name: 'NOG Performance', logo: '/placeholder.svg' },
  { id: '2', name: 'NOG Agency', logo: '/placeholder.svg' },
  { id: '3', name: 'Performance Master', logo: '/placeholder.svg' },
];

export const CompanySelector: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState(MOCK_COMPANIES[0].id);

  // In a real app, this would update contexts and reload relevant data
  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value);
    // Would trigger data refresh here
  };

  return (
    <div className="flex items-center gap-2">
      <Building className="h-4 w-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground mr-2">Empresa:</p>
      <Select value={selectedCompany} onValueChange={handleCompanyChange}>
        <SelectTrigger className="h-8 w-[180px] text-sm">
          <SelectValue placeholder="Selecione a empresa" />
        </SelectTrigger>
        <SelectContent>
          {MOCK_COMPANIES.map((company) => (
            <SelectItem key={company.id} value={company.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img src={company.logo} alt={company.name} className="h-4 w-4" />
                <span>{company.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
