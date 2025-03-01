'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddExpenseForm: React.FC = () => {
  const [form, setForm] = useState({
    date: '',
    amount: 0,
    category: '',
    description: '',
  });

  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date || !form.amount || form.amount <= 0 || !form.category.trim()) {
      alert('Please fill out the date, amount, and category fields correctly.');
      return;
    }


    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const newExpense = await response.json();
        console.log('Expense added:', newExpense);
        alert('Expense added successfully!');

        
        setForm({
          date: '',
          amount: 0,
          category: '',
          description: '',
        });

        
        router.push('/'); 
      } else {
        console.error('Error adding expense:', response.statusText);
        alert('Failed to add expense.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="p-6 bg-blue-600 text-white rounded-t-lg">
          <p className="text-2xl font-bold">Add New Expense</p>
          <p className="text-lg mt-2">Fill out the form below to add a new expense.</p>
        </header>
        <main className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col justify-between space-y-6 text-lg font-bold">
            <div>
              <label className="block text-gray-700  mb-2">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700  mb-2">Amount</label>
              <input
                type="number"
                value={form.amount || 0}
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700  mb-2">Category</label>
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700  mb-2">Description</label>
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
              Add Expense
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddExpenseForm;