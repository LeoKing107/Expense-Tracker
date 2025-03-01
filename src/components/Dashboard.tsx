"use client";

import { Expense } from "@/src/types/Expense";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  expenses: Expense[];
}

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const categorizedExpenses = useMemo(() => {
    const result: Record<string, Record<string, number>> = {};

    expenses.forEach((expense) => {
      if (!result[expense.category]) {
        result[expense.category] = {};
      }
      result[expense.category][expense.date] =
        (result[expense.category][expense.date] || 0) + expense.amount;
    });

    return result;
  }, [expenses]);

  const chartData = useMemo(() => {
    const allDates = Array.from(
      new Set(expenses.map((expense) => expense.date))
    ).sort();

    const datasets = Object.entries(categorizedExpenses).map(
      ([category, dateData]) => ({
        label: category,
        data: allDates.map((date) => dateData[date] || 0), // Fill in 0 if no data for a date
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random colors
        backgroundColor: "rgba(0, 0, 0, 0)",
      })
    );

    return {
      labels: allDates,
      datasets,
    };
  }, [categorizedExpenses, expenses]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => a.category.localeCompare(b.category));
  }, [expenses]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="p-6 bg-blue-600 text-white rounded-t-lg">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-lg mt-2">Get insights into your spending habits</p>
        </header>
        <main className="p-6">
          <section className="mb-6">
            <p className="text-2xl font-semibold text-gray-800">
              Spending by Category (Multi-Line Chart)
            </p>
            <div className="mt-4 mb-2">
              <Line data={chartData} />
            </div>
          </section>
          <section className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Expenses Sorted by Category
            </h3>
            <ul className="space-y-4 mt-4">
              {sortedExpenses.map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center bg-gray-50 p-4 shadow-sm rounded-md border border-gray-200"
                >
                  <span className="text-gray-700 font-medium">
                    {expense.date} - {expense.category}: {expense.description}
                  </span>
                  <span className="text-blue-500 font-semibold">
                    ${expense.amount?.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
