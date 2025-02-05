"use client"

import { Line } from "recharts";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { transformTransactions } from "@/lib/getChartData";
import { useUser } from "@/context/useContext";
import { LineChartIcon } from "lucide-react";


export const ExpenseChart = () => {
   const { transactions } = useUser()
   const data = transformTransactions(transactions)
  
  return <>
  {
    data.length == 0 ? 
    ( <Card className="p-6 h-[400px] mb-8">
      <div className="h-full flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur animate-pulse" />
          <div className="relative bg-card rounded-full p-4">
            <LineChartIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          No Transaction Data Yet
        </h3>
        <p className="text-muted-foreground text-center max-w-[250px]">
          Start adding your transactions to see your financial insights come to life!
        </p>
      </div>
    </Card>
    ):
    
    (
      <Card className="p-6 h-[400px] mb-8 animate-fade-in">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#2E7D32"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#C62828"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#1976D2"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    )
  }
  </>
}