import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

interface StockItem {
  id: number;
  slNo: string;
  productCode: string;
  category: string;
  subCategory: string;
  product: string;
  updatedOn: string;
  availableQty: number;
}

interface Product {
  id: number;
  productCode: string;
  category: string;
  subCategory: string;
  productName: string;
  productType: string;
  price: string;
  gst: string;
  variants: any[];
}

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const stockItems: StockItem[] = [
    {
      id: 1,
      slNo: '01',
      productCode: '001',
      category: 'Men',
      subCategory: 'T-shirt',
      product: 'Men Printed Polo...',
      updatedOn: '07/12/2023',
      availableQty: 80
    },
    {
      id: 2,
      slNo: '02',
      productCode: '002',
      category: 'Men',
      subCategory: 'T-shirt',
      product: 'Men Printed Rou...',
      updatedOn: '07/12/2023',
      availableQty: 100
    },
    {
      id: 3,
      slNo: '03',
      productCode: '003',
      category: 'Men',
      subCategory: 'Shirt',
      product: 'Formal Shirt',
      updatedOn: '07/12/2023',
      availableQty: 200
    },
    {
      id: 4,
      slNo: '04',
      productCode: '004',
      category: 'Men',
      subCategory: 'Shirt',
      product: 'Casual Shirt',
      updatedOn: '07/12/2023',
      availableQty: 250
    },
    {
      id: 5,
      slNo: '05',
      productCode: '005',
      category: 'Men',
      subCategory: 'Pant',
      product: 'Black Track Pants',
      updatedOn: '07/12/2023',
      availableQty: 300
    },
    {
      id: 6,
      slNo: '06',
      productCode: '006',
      category: 'Women',
      subCategory: 'Saree',
      product: 'Cotton Blend Saree',
      updatedOn: '07/12/2023',
      availableQty: 350
    },
    {
      id: 7,
      slNo: '07',
      productCode: '007',
      category: 'women',
      subCategory: 'Kurthi',
      product: 'Anarkali Kurta',
      updatedOn: '07/12/2023',
      availableQty: 400
    },
    {
      id: 8,
      slNo: '08',
      productCode: '008',
      category: 'Women',
      subCategory: 'Shall',
      product: 'Chiffon Shall',
      updatedOn: '07/12/2023',
      availableQty: 450
    },
    {
      id: 9,
      slNo: '09',
      productCode: '009',
      category: 'Kids',
      subCategory: 'T-shirt',
      product: 'Pure Cotton T Shirt',
      updatedOn: '07/12/2023',
      availableQty: 500
    },
    {
      id: 10,
      slNo: '10',
      productCode: '010',
      category: 'Kids',
      subCategory: 'Shorts',
      product: 'Shorts',
      updatedOn: '07/12/2023',
      availableQty: 550
    },
    {
      id: 11,
      slNo: '11',
      productCode: '011',
      category: 'Kids',
      subCategory: 'vest',
      product: 'Vest For Baby',
      updatedOn: '07/12/2023',
      availableQty: 600
    },
    {
      id: 12,
      slNo: '12',
      productCode: '012',
      category: 'Women',
      subCategory: 'Blouse',
      product: 'Round Neck Blouse',
      updatedOn: '07/12/2023',
      availableQty: 650
    },
    {
      id: 13,
      slNo: '13',
      productCode: '013',
      category: 'Accessories',
      subCategory: 'Belt',
      product: 'Belts',
      updatedOn: '07/12/2023',
      availableQty: 700
    },
    {
      id: 14,
      slNo: '14',
      productCode: '014',
      category: 'Accessories',
      subCategory: 'Kerchief',
      product: 'Hand kerchief',
      updatedOn: '07/12/2023',
      availableQty: 750
    },
    {
      id: 15,
      slNo: '15',
      productCode: '015',
      category: 'Kids',
      subCategory: 'T-shirt',
      product: 'Printed T-shirts',
      updatedOn: '07/12/2023',
      availableQty: 800
    }
  ];

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productCode.includes(searchTerm);
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: products.length + 1
    };
    setProducts(prev => [...prev, newProduct]);
    setIsAddProductModalOpen(false);
    
    // Show success message
    alert('Product added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Stocks</h1>
        </div>
        
        <button 
          onClick={handleAddProduct}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Category:</span>
                <div className="relative">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="All">All</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

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
                  Updated On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available Qty.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.slNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.productCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.subCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.updatedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.availableQty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Add More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stock items found matching your search.</p>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default Stocks;