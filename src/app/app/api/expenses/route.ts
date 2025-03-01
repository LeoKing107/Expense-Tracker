import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'assets/data', 'expenses.json');

const readExpenses = () => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

const writeExpenses = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export async function GET() {
  const data = readExpenses();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = readExpenses();

  const newExpense = {
    ...body,
    id: Date.now().toString(), 
  };

  data.expenses.push(newExpense);
  writeExpenses(data);

  return NextResponse.json(newExpense);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updatedExpense } = body;

  const data = readExpenses();
  const expenseIndex = data.expenses.findIndex((expense: any) => expense.id === id);

  if (expenseIndex === -1) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  data.expenses[expenseIndex] = { ...data.expenses[expenseIndex], ...updatedExpense };
  writeExpenses(data);

  return NextResponse.json(data.expenses[expenseIndex]);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const data = readExpenses(); 
  const expenseIndex = data.expenses.findIndex((expense: any) => expense.id === id);

  if (expenseIndex === -1) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  data.expenses.splice(expenseIndex, 1); 
  writeExpenses(data); 

  return NextResponse.json({ message: 'Expense deleted successfully', id });
}