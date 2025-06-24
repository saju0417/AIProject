import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronDown, Calendar, DollarSign } from 'lucide-react';
import ExpenseModal from '../components/ExpenseModal';

interface ExpenseItem {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: 'Paid' | 'Unpaid';
  notes: string;
}

const Expense = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      id: 1,
      date: '07/12/2023',
      description: 'Office Supplies',
      amount: 2500,
      category: 'Office',
      status: 'Paid',
      notes: 'Stationery and printing materials'
    },
    {
      id: 2,
      date: '06/12/2023',
      description: 'Marketing Campaign',
      amount: 15000,
      category: 'Marketing',
      status: 'Paid',
      notes: 'Social media advertising'
    },
    {
      id: 3,
      date: '05/12/2023',
      description: 'Equipment Purchase',
      amount: 45000,
      category: 'Equipment',
      status: 'Unpaid',
      notes: 'New sewing machines'
    },
    {
      id: 4,
      date: '04/12/2023',
      description: 'Utility Bills',
      amount: 8500,
      category: 'Utilities',
      status: 'Paid',
      notes: 'Electricity and water bills'
    },
    {
      id: 5,
      date: '03/12/2023',
      description: 'Raw Materials',
      amount: 32000,
      category: 'Materials',
      status: 'Unpaid',
      notes: 'Cotton and silk fabrics'
    },
    {
      id: 6,
      date: '02/12/2023',
      description: 'Transportation',
      amount: 5500,
      category: 'Logistics',
      status: 'Paid',
      notes: 'Delivery and shipping costs'
    },
    {
      id: 7,
      date: '01/12/2023',
      description: 'Staff Training',
      amount: 12000,
      category: 'Training',
      status: 'Paid',
      notes: 'Professional development workshop'
    },
    {
      id: 8,
      date: '30/11/2023',
      description: 'Software License',
      amount: 18000,
      category: 'Software',
      status: 'Unpaid',
      notes: 'Annual subscription renewal'
    }
  ]);

  const categories = ['All', 'Office', 'Marketing', 'Equipment', 'Utilities', 'Materials', 'Logistics', 'Training', 'Software'];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || expense.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: ExpenseItem) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const handleSave = (data: Omit<ExpenseItem, 'id'>) => {
    if (editingExpense) {
      setExpenses(expenses.map(expense => 
        expense.id === editingExpense.id 
          ? { ...data, id: editingExpense.id }
          : expense
      ));
    } else {
      const newExpense = {
        ...data,
        id: Math.max(...expenses.map(e => e.id)) + 1
      };
      setExpenses([...expenses, newExpense]);
    }
    setIsModalOpen(false);
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = filteredExpenses.filter(e => e.status === 'Paid').reduce((sum, expense) => sum + expense.amount, 0);
  const unpaidExpenses = filteredExpenses.filter(e => e.status === 'Unpaid').reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your business expenses</p>
        </div>
        
        <button 
          onClick={handleAddNew}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Rs. {totalExpenses.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Expenses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Rs. {paidExpenses.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Paid Expenses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Rs. {unpaidExpenses.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Unpaid Expenses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-64 text-sm"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Rs. {expense.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${expense.status === 'Paid' ? 'status-active' : 'status-inactive'}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {expense.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No expenses found matching your criteria.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredExpenses.length} of {expenses.length} expenses
            </div>
            <div className="text-sm font-medium text-gray-900">
              Total: Rs. {totalExpenses.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingExpense={editingExpense}
      />
    </div>
  );
};

export default Expense;