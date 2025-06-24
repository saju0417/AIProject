import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';

interface ExpenseItem {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: 'Paid' | 'Unpaid';
  notes: string;
}

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<ExpenseItem, 'id'>) => void;
  editingExpense: ExpenseItem | null;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingExpense
}) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: 0,
    category: '',
    status: 'Unpaid' as const,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Office',
    'Marketing',
    'Equipment',
    'Utilities',
    'Materials',
    'Logistics',
    'Training',
    'Software',
    'Maintenance',
    'Travel',
    'Other'
  ];

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: editingExpense.date,
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
        status: editingExpense.status,
        notes: editingExpense.notes
      });
    } else {
      const today = new Date().toLocaleDateString('en-GB');
      setFormData({
        date: today,
        description: '',
        amount: 0,
        category: '',
        status: 'Unpaid',
        notes: ''
      });
    }
    setErrors({});
  }, [editingExpense, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date.split('/').reverse().join('-')}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const formattedDate = date.toLocaleDateString('en-GB');
                    setFormData(prev => ({ ...prev, date: formattedDate }));
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                    errors.date ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount (Rs.) *
              </label>
              <div className="relative">
                <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                    errors.amount ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                errors.description ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter expense description"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                  errors.category ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              placeholder="Additional notes or comments"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-8"
            >
              {editingExpense ? 'Update' : 'Add'} Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;