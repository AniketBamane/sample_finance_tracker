"use client"
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";




export const TransactionList = ({ transactions }) => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "income" ? "default" : "outline"}
          onClick={() => setFilter("income")}
        >
          Income
        </Button>
        <Button
          variant={filter === "expense" ? "default" : "outline"}
          onClick={() => setFilter("expense")}
        >
          Expenses
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTransactions.length == 0 ? 
          <TableRow>
          <TableCell colSpan={3} className="text-center text-green-600 my-2">
            No transactions found!
          </TableCell>
        </TableRow>
          : paginatedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date.split("T")[0]}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell
                className={cn(
                  "text-right font-medium",
                  transaction.type === "income" ? "text-success" : "text-expense"
                )}
              >
                {transaction.type === "income" ? "+" : "-"}
                ₹ {transaction.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
         
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};