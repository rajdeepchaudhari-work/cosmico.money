"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "./ui/input";
import { Loader2, MapPin } from "lucide-react";

interface NominatimResult {
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (parts: {
    address1: string;
    city: string;
    state: string;
    postalCode: string;
  }) => void;
  placeholder?: string;
  countryCode?: string;
}

const AddressAutocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder = "Start typing your address...",
  countryCode = "gb",
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: query,
          format: "json",
          addressdetails: "1",
          limit: "6",
          countrycodes: countryCode,
        });
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?${params}`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [countryCode]
  );

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 400);
    return () => clearTimeout(debounceRef.current);
  }, [value, fetchSuggestions]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (result: NominatimResult) => {
    const a = result.address;
    const streetParts = [a.house_number, a.road].filter(Boolean);
    const address1 =
      streetParts.join(" ") || result.display_name.split(",")[0].trim();
    const city = a.city || a.town || a.village || a.suburb || "";
    const state = a.county || a.state_district || a.state || "";
    const postalCode = a.postcode || "";

    onChange(address1);
    onSelect({ address1, city, state, postalCode });
    setShowDropdown(false);
    setSuggestions([]);
  };

  const streetLabel = (result: NominatimResult) => {
    const a = result.address;
    const street = [a.house_number, a.road].filter(Boolean).join(" ");
    return street || result.display_name.split(",")[0].trim();
  };

  const cityLabel = (result: NominatimResult) => {
    const parts = result.display_name.split(",").slice(1, 4).map((s) => s.trim());
    return parts.filter(Boolean).join(", ");
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="input-class pr-8"
          autoComplete="off"
        />
        {isLoading ? (
          <Loader2
            size={14}
            className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        ) : (
          <MapPin
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
          />
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelect(s)}
              className="flex items-start gap-2 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
            >
              <MapPin size={13} className="mt-0.5 shrink-0 text-gray-400" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {streetLabel(s)}
                </p>
                <p className="text-xs text-gray-400 truncate">{cityLabel(s)}</p>
              </div>
            </li>
          ))}
          <li className="px-3 py-1.5 text-center">
            <span className="text-10 text-gray-300">© OpenStreetMap contributors</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
