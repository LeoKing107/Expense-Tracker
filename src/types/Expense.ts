export interface Expense {
    id: string;
    date: string;
    amount: number;
    category: string;
    description: string;
    recurring?: boolean;
    tags?: string[];
}