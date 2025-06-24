import React, { useState } from 'react';
import { Search, Plus, Eye, Edit2, ChevronDown } from 'lucide-react';
import ProductModal from '../components/ProductModal';

interface Product {
  id: number;
  slNo: string;
  postedOn: string;
  productCode: string;
  category: string;
  subCategory: string;
  product: string;
  price: string;
  gst: string;
  status: 'Active' | 'Inactive';
}

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Inactive' | 'Out of Stock'>('Active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const activeProducts: Product[] = [
    {
      id: 1,
      slNo: '01',
      postedOn: '10/11/2023',
      productCode: '001',
      category: 'Men',
      subCategory: 'T-shirt',
      product: 'Men Printed Polo...',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 2,
      slNo: '02',
      postedOn: '12/11/2023',
      productCode: '002',
      category: 'Men',
      subCategory: 'T-shirt',
      product: 'Men Printed Rou...',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 3,
      slNo: '03',
      postedOn: '05/11/2023',
      productCode: '003',
      category: 'Men',
      subCategory: 'Shirt',
      product: 'Formal Shirt',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 4,
      slNo: '04',
      postedOn: '05/11/2023',
      productCode: '004',
      category: 'Men',
      subCategory: 'Shirt',
      product: 'Casual Shirt',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 5,
      slNo: '05',
      postedOn: '09/11/2023',
      productCode: '005',
      category: 'Men',
      subCategory: 'Pant',
      product: 'Black Track Pants',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 6,
      slNo: '06',
      postedOn: '05/11/2023',
      productCode: '006',
      category: 'Women',
      subCategory: 'Saree',
      product: 'Cotton Blend Saree',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 7,
      slNo: '07',
      postedOn: '04/11/2023',
      productCode: '007',
      category: 'women',
      subCategory: 'Kurthi',
      product: 'Anarkali Kurta',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 8,
      slNo: '08',
      postedOn: '29/10/2023',
      productCode: '008',
      category: 'Women',
      subCategory: 'Shall',
      product: 'Chiffon Shall',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 9,
      slNo: '09',
      postedOn: '28/10/2023',
      productCode: '009',
      category: 'Kids',
      subCategory: 'T-shirt',
      product: 'Pure Cotton T Shirt',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    },
    {
      id: 10,
      slNo: '10',
      postedOn: '26/10/2023',
      productCode: '010',
      category: 'Kids',
      subCategory: 'Shorts',
      product: 'Shorts',
      price: 'Rs.100',
      gst: '10%',
      status: 'Active'
    }
  ];

  const inactiveProducts: Product[] = [
    {
      id: 11,
      slNo: '01',
      postedOn: '10/11/2023',
      productCode: '008',
      category: 'Men',
      subCategory: 'T-shirt',
      product: 'Men Printed Polo...',
      price: 'Rs.100',
      gst: '10%',
      status: 'Inactive'
    },
    {
      id: 12,
      slNo: '02',
      postedOn: '12/11/2023',
      productCode: '018',
      category: 'Men',
      subCategory: 'T-shirt',
      product: 'Men Printed Rou...',
      price: 'Rs.100',
      gst: '10%',
      status: 'Inactive'
    },
    {
      id: 13,
      slNo: '03',
      postedOn: '05/11/2023',
      productCode: '022',
      category: 'Men',
      subCategory: 'Shirt',
      product: 'Formal Shirt',
      price: 'Rs.100',
      gst: '10%',
      status: 'Inactive'
    },
    {
      id: 14,
      slNo: '04',
      postedOn: '05/11/2023',
      productCode: '028',
      category: 'Men',
      subCategory: 'Shirt',
      product: 'Casual Shirt',
      price: 'Rs.100',
      gst: '10%',
      status: 'Inactive'
    },
    {
      id: 15,
      slNo: '05',
      postedOn: '09/11/2023',
      productCode: '034',
      category: 'Men',
      subCategory: 'Pant',
      product: 'Black Track Pants',
      price: 'Rs.100',
      gst: '10%',
      status: 'Inactive'
    }
  ];

  const getCurrentProducts = () => {
    if (activeTab === 'Active') return activeProducts;
    if (activeTab === 'Inactive') return inactiveProducts;
    return [];
  };

  const filteredProducts = getCurrentProducts().filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Product Details</h1>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex space-x-1">
              {(['Active', 'Inactive', 'Out of Stock'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : 'inactive'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-48 text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="btn-secondary flex items-center space-x-2">
                  <span>Filters</span>
                </button>
                
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>All</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sl. no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted on
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GST
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.slNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.postedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.productCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.subCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.gst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${product.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetails;