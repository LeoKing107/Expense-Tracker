import Dashboard from '@/src/components/Dashboard';
import ExpenseList from '@/src/components/ExpenseList';
import expensesData from '@/src/assets/data/expenses.json'
import { Expense } from '@/src/types/Expense';

export default function HomePage() {
  const expenses: Expense[] = expensesData.expenses;

  return (
    <div className="container mx-auto p-4">
      <Dashboard expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}