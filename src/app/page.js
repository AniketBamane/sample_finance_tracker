"use client";
import { StatCard } from "@/components/StatCard";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { ExpenseChart } from "@/components/ExpenseChart";
import { useUser } from "@/context/useContext";
import Header from "@/components/Header";

const Index = () => {
  const { transactions, setTransactions } = useUser();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpenses;

  console.log(transactions)

  const handleAddTransaction = (data) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...data,
      date: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-neutral-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Income" amount={totalIncome} type="income" />
          <StatCard title="Total Expenses" amount={totalExpenses} type="expense" />
          <StatCard title="Total Savings" amount={savings} type="savings" />
        </div>

        <ExpenseChart />

        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Add Transaction</h2>
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
