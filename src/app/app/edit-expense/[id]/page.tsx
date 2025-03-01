'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  recurring?: boolean;
  tags?: string[];
}

const EditExpensePage = ({ params }: { params: { id: string } }) => {
  const { id }: any = React.use(params as any);
  const router = useRouter();

  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    date: '',
    amount: 0,
    category: '',
    description: '',
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch('/api/expenses');
        const data = await res.json();
        const foundExpense = data.expenses.find((exp: Expense) => exp.id === id);
        if (!foundExpense) {
          alert('Expense not found');
          router.push('/');
          return;
        }
        setExpense(foundExpense);
        setForm({
          date: foundExpense.date,
          amount: foundExpense.amount,
          category: foundExpense.category,
          description: foundExpense.description,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expense:', error);
      }
    };

    fetchExpense();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date || !form.amount || form.amount <= 0 || !form.category.trim()) {
      alert('Please fill out the date, amount, and category fields correctly.');
      return;
    }

    
    try {
      const response = await fetch('/api/expenses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...form }),
      });

      if (response.ok) {
        alert('Expense updated successfully!');
        router.push('/');
      } else {
        console.error('Error updating expense:', response.statusText);
        alert('Failed to update expense.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="p-6 bg-blue-600 text-white rounded-t-lg">
          <p className="text-2xl font-bold">Edit Expense</p>
          <p className="text-lg mt-2">Update the details of your expense below.</p>
        </header>
        <main className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Amount</label>
              <input
                type="number"
                value={form.amount || 0}
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 h-32 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Update Expense
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditExpensePage;
