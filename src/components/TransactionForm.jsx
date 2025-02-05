"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export const TransactionForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSubmit({
      amount: parseFloat(amount),
      type,
      description,
    });

    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch md:items-end animate-fade-in">
      <div className="flex-1 space-y-4 md:space-y-2">
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Select value={type} onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-full md:w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full md:w-auto">Add Transaction</Button>
    </form>
  );
};