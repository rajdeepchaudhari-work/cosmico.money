"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TransactionsTable from "./TransactionsTable";
import { formatAmount } from "@/lib/utils";

const ROWS_PER_PAGE = 10;

const TransactionSearchTable = ({
  transactions,
  country,
}: {
  transactions: Transaction[];
  country?: string;
}) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return transactions;
    const q = query.toLowerCase();
    return transactions.filter((t) => {
      const name = t.name?.toLowerCase() ?? "";
      const category = t.category?.toLowerCase() ?? "";
      const amount = formatAmount(t.amount, country).toLowerCase();
      return name.includes(q) || category.includes(q) || amount.includes(q);
    });
  }, [transactions, query, country]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const currentTransactions = filtered.slice(start, start + ROWS_PER_PAGE);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search by name, category, or amount..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {currentTransactions.length > 0 ? (
        <TransactionsTable
          transactions={currentTransactions}
          country={country}
        />
      ) : (
        <p className="text-14 py-8 text-center text-gray-500">
          No transactions found.
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between gap-3">
          <Button
            size="lg"
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
          >
            <Image
              src="/icons/arrow-left.svg"
              alt="arrow"
              width={20}
              height={20}
              className="mr-2"
            />
            Prev
          </Button>
          <p className="text-14 flex items-center px-2">
            {currentPage} / {totalPages}
          </p>
          <Button
            size="lg"
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            Next
            <Image
              src="/icons/arrow-left.svg"
              alt="arrow"
              width={20}
              height={20}
              className="ml-2 -scale-x-100"
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionSearchTable;
