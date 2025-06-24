import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

interface Product {
  id: number;
  productNo: string;
  category: string;
  image?: string;
}

const Advertisement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      productNo: '01',
      category: 'Mens',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      id: 2,
      productNo: '02',
      category: 'Women',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      id: 3,
      productNo: '03',
      category: 'Kids',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      id: 4,
      productNo: '04',
      category: 'Others',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    }
  ]);

  const handleEdit = (id: number) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,
      productNo: String(products.length + 1).padStart(2, '0'),
      category: 'New Category',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    };
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Advertisement</h1>
          <p className="text-gray-600 mt-1">Manage your product advertisements</p>
        </div>
        
        <button 
          onClick={handleAddProduct}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Products</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Product No. : {product.productNo}</h3>
                
                <div className="mb-4">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={`Product ${product.productNo}`}
                      className="w-24 h-24 object-cover rounded-lg mx-auto"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Product Category</p>
                  <p className="font-medium text-gray-900">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available for advertisement.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Advertisement;