"use client"
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";



export const StatCard = ({ title, amount, type = "income", className }) => {
  const bgColor = {
    income: "bg-success-soft text-success",
    expense: "bg-expense-soft text-expense",
    savings: "bg-neutral-card text-primary",
  }[type];

  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:scale-[1.02] animate-fade-in",
      bgColor,
      className
    )}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">
      ₹ {amount.toLocaleString()}
      </p>
    </Card>
  );
};