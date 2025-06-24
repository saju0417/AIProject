import React, { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, Eye, Edit2, Package, Truck, CheckCircle, Clock, Printer, Download } from 'lucide-react';

interface Order {
  id: number;
  slNo: string;
  date: string;
  name: string;
  location: string;
  contactNumber: string;
  category: string;
  subCategory: string;
  products: string;
  quantity: number;
  price: number;
  status: 'Dispatched' | 'Cancelled' | 'Processing' | 'Delivered';
}

interface CustomerDetails {
  name: string;
  dateOfOrder: string;
  contactNumber: string;
  emailId: string;
  billingAddress: string;
}

interface ProductDetail {
  slNo: string;
  productCode: string;
  category: string;
  subCategory: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const orders: Order[] = [
    {
      id: 1,
      slNo: '01',
      date: '07/12/2023',
      name: 'Ramesh',
      location: 'Coimbatore',
      contactNumber: '99999 88888',
      category: 'Men',
      subCategory: 'T-shirt',
      products: 'Printed',
      quantity: 1,
      price: 100,
      status: 'Dispatched'
    },
    {
      id: 2,
      slNo: '02',
      date: '07/12/2023',
      name: 'Gokul',
      location: 'Madurai',
      contactNumber: '99999 88888',
      category: 'Women',
      subCategory: 'Saree',
      products: 'Cotton Saree',
      quantity: 2,
      price: 200,
      status: 'Dispatched'
    },
    {
      id: 3,
      slNo: '03',
      date: '07/12/2023',
      name: 'Ajith',
      location: 'Chennai',
      contactNumber: '99999 88888',
      category: 'Men',
      subCategory: 'Shirt',
      products: 'Casual Shirt',
      quantity: 1,
      price: 150,
      status: 'Dispatched'
    },
    {
      id: 4,
      slNo: '04',
      date: '07/12/2023',
      name: 'Arun',
      location: 'Teni',
      contactNumber: '99999 88888',
      category: 'Kids',
      subCategory: 'Shorts',
      products: 'Sports Shorts',
      quantity: 1,
      price: 80,
      status: 'Dispatched'
    },
    {
      id: 5,
      slNo: '05',
      date: '07/12/2023',
      name: 'Sherin',
      location: 'Nagercoil',
      contactNumber: '99999 88888',
      category: 'Men',
      subCategory: 'Shorts',
      products: 'Sports Shorts',
      quantity: 3,
      price: 300,
      status: 'Dispatched'
    }
  ];

  const customerDetails: CustomerDetails = {
    name: 'Ramesh',
    dateOfOrder: '07/12/2023',
    contactNumber: '+91 99999 88888, +91 99999 89898',
    emailId: 'ramesh@gmail.com',
    billingAddress: 'XYZ, ABCDE, Tambaram, Chennai, Tamil Nadu, India, 600 002'
  };

  const productDetails: ProductDetail[] = [
    {
      slNo: '01',
      productCode: '245',
      category: 'Men',
      subCategory: 'T-shirt',
      productName: 'Printed',
      size: 'M',
      color: '#8B0000',
      quantity: 1,
      price: 100
    },
    {
      slNo: '02',
      productCode: '103',
      category: 'Men',
      subCategory: 'Shirt',
      productName: 'Formals',
      size: '34',
      color: '#000080',
      quantity: 1,
      price: 100
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || order.category === categoryFilter;
    const matchesProduct = productFilter === 'All' || order.products.toLowerCase().includes(productFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesProduct;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'Dispatched':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'Cancelled':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'Processing':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'Delivered':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Dispatched':
        return <Truck className="w-4 h-4" />;
      case 'Cancelled':
        return <Clock className="w-4 h-4" />;
      case 'Processing':
        return <Package className="w-4 h-4" />;
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowCustomerDetails(true);
  };

  const handleGenerateInvoice = () => {
    setShowInvoice(true);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // Implement PDF download functionality
    console.log('Downloading invoice...');
  };

  const subtotal = productDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gstRate = 0.1; // 10%
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  if (showInvoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowInvoice(false)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Customer Details
          </button>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePrintInvoice}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button 
              onClick={handleDownloadInvoice}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invoice number : 62786457345</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <p className="text-gray-900">Shree Clothings</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Dispatch</label>
                <p className="text-gray-900">07/12/2023</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <p className="text-gray-900">+91 99999 88888</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <p className="text-gray-900">suhrasineets@gmail.com</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                <p className="text-gray-900">XYZ, ABCDE, Ugidigi, Thoothukudi, Tamil Nadu, India, 600 002</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <p className="text-gray-900">Ramesh</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Order</label>
                <p className="text-gray-900">07/12/2023</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <p className="text-gray-900">+91 99999 88888, +91 99999 89898</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <p className="text-gray-900">ramesh@gmail.com</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                <p className="text-gray-900">XYZ, ABCDE, Tambaram, Chennai, Tamil Nadu, India, 600 002</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. no.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colour</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productDetails.map((item) => (
                  <tr key={item.slNo} className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.slNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.productCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subCategory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="w-6 h-6 rounded border border-gray-200"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs. {item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-80 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal :</span>
                <span className="font-medium">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gst (10%) :</span>
                <span className="font-medium">Rs. {gst}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Total :</span>
                <span className="font-semibold">Rs. {total}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="btn-primary px-8">
              Save Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showCustomerDetails) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowCustomerDetails(false)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Orders
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <p className="text-gray-900">{customerDetails.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Order</label>
                <p className="text-gray-900">{customerDetails.dateOfOrder}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <p className="text-gray-900">{customerDetails.contactNumber}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <p className="text-gray-900">{customerDetails.emailId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                <p className="text-gray-900">{customerDetails.billingAddress}</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. no.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colour</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productDetails.map((item) => (
                  <tr key={item.slNo} className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.slNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.productCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subCategory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="w-6 h-6 rounded border border-gray-200"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs. {item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal :</span>
                <span className="font-medium">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gst (10%) :</span>
                <span className="font-medium">Rs. {gst}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total :</span>
                <span className="font-semibold">Rs. {total}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleGenerateInvoice}
              className="btn-primary"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Today</span>
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64 text-sm"
            />
          </div>
        </div>
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
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Product:</span>
                <div className="relative">
                  <select 
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="All">All</option>
                    <option value="Shirt">Shirt</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Saree">Saree</option>
                    <option value="Shorts">Shorts</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. no.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.slNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.subCategory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs. {order.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(order.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </div>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      >
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-900">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-900">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-900">
                4
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-900">
                5
              </button>
              <span className="text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;