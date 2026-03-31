'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Barcode, X } from 'lucide-react';

interface SearchBarProps {
  onSearchChange: (query: string) => void;
  onBarcodeChange: (query: string) => void;
}

export function SearchBar({ onSearchChange, onBarcodeChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleBarcodeChange = useCallback((value: string) => {
    setBarcodeQuery(value);
    onBarcodeChange(value);
  }, [onBarcodeChange]);

  const clearSearch = () => {
    setSearchQuery('');
    onSearchChange('');
  };

  const clearBarcode = () => {
    setBarcodeQuery('');
    onBarcodeChange('');
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      {/* Product name search */}
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-9"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Barcode search */}
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Barcode className="h-4 w-4" />
        </div>
        <Input
          placeholder="Search by barcode..."
          value={barcodeQuery}
          onChange={(e) => handleBarcodeChange(e.target.value)}
          className="pl-10 pr-9"
        />
        {barcodeQuery && (
          <button
            onClick={clearBarcode}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
