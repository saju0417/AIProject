import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import TextileModal from '../components/TextileModal';

interface TextileItem {
  id: number;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  quantity: number;
  price: number;
  image?: string;
}

const Textile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TextileItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [textiles, setTextiles] = useState<TextileItem[]>([
    {
      id: 1,
      name: 'Cotton Fabric',
      category: 'Cotton',
      status: 'active',
      quantity: 150,
      price: 25.99
    },
    {
      id: 2,
      name: 'Silk Blend',
      category: 'Silk',
      status: 'active',
      quantity: 75,
      price: 45.50
    },
    {
      id: 3,
      name: 'Wool Yarn',
      category: 'Wool',
      status: 'pending',
      quantity: 200,
      price: 18.75
    },
    {
      id: 4,
      name: 'Linen Fabric',
      category: 'Linen',
      status: 'inactive',
      quantity: 50,
      price: 32.00
    },
    {
      id: 5,
      name: 'Polyester Blend',
      category: 'Synthetic',
      status: 'active',
      quantity: 300,
      price: 15.25
    }
  ]);

  const filteredTextiles = textiles.filter(textile =>
    textile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    textile.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: TextileItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this textile?')) {
      setTextiles(textiles.filter(item => item.id !== id));
    }
  };

  const handleSave = (data: Omit<TextileItem, 'id'>) => {
    if (editingItem) {
      setTextiles(textiles.map(item => 
        item.id === editingItem.id 
          ? { ...data, id: editingItem.id }
          : item
      ));
    } else {
      const newItem = {
        ...data,
        id: Math.max(...textiles.map(t => t.id)) + 1
      };
      setTextiles([...textiles, newItem]);
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'status-badge';
    switch (status) {
      case 'active':
        return `${baseClasses} status-active`;
      case 'inactive':
        return `${baseClasses} status-inactive`;
      case 'pending':
        return `${baseClasses} status-pending`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Textile Management</h1>
          <p className="text-gray-600 mt-1">Manage your textile inventory and products</p>
        </div>
        
        <button 
          onClick={handleAddNew}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Textile</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search textiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Total: {filteredTextiles.length} items</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTextiles.map((textile) => (
                <tr key={textile.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{textile.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{textile.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(textile.status)}>
                      {textile.status.charAt(0).toUpperCase() + textile.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{textile.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${textile.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(textile)}
                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(textile.id)}
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

        {filteredTextiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No textiles found matching your search.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredTextiles.length} of {textiles.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <TextileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingItem={editingItem}
      />
    </div>
  );
};

export default Textile;