import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DeliveryItem {
  id: number;
  slNo: string;
  date: string;
  invoiceNumber: string;
  name: string;
  location: string;
  contactNumber: string;
  products: number;
  price: number;
  trackingId: string;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Delivered';
}

interface TrackingDetails {
  invoiceNumber: string;
  customerName: string;
  trackNumber: string;
  deliveryPartner: string;
  trackLink: string;
}

const DeliveryTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<DeliveryItem | null>(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const deliveryItems: DeliveryItem[] = [
    {
      id: 1,
      slNo: '01',
      date: '07/12/2023',
      invoiceNumber: '62786457345',
      name: 'Ramesh',
      location: 'Coimbatore',
      contactNumber: '99999 88888',
      products: 2,
      price: 100,
      trackingId: 'Enter Track Id',
      status: 'Processing'
    },
    {
      id: 2,
      slNo: '02',
      date: '07/12/2023',
      invoiceNumber: '62786457346',
      name: 'Gokul',
      location: 'Madurai',
      contactNumber: '99999 88888',
      products: 2,
      price: 200,
      trackingId: 'Enter Track Id',
      status: 'Shipped'
    },
    {
      id: 3,
      slNo: '03',
      date: '07/12/2023',
      invoiceNumber: '62786457347',
      name: 'Ajith',
      location: 'Chennai',
      contactNumber: '99999 88888',
      products: 1,
      price: 150,
      trackingId: 'Enter Track Id',
      status: 'In Transit'
    },
    {
      id: 4,
      slNo: '04',
      date: '07/12/2023',
      invoiceNumber: '62786457348',
      name: 'Arun',
      location: 'Teni',
      contactNumber: '99999 88888',
      products: 4,
      price: 400,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 5,
      slNo: '05',
      date: '07/12/2023',
      invoiceNumber: '62786457349',
      name: 'Sherin',
      location: 'Nagercoil',
      contactNumber: '99999 88888',
      products: 3,
      price: 300,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 6,
      slNo: '06',
      date: '07/12/2023',
      invoiceNumber: '62786457350',
      name: 'Abish',
      location: 'Thenkasi',
      contactNumber: '99999 88888',
      products: 2,
      price: 200,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 7,
      slNo: '07',
      date: '07/12/2023',
      invoiceNumber: '62786457351',
      name: 'Akash',
      location: 'Tirupur',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 8,
      slNo: '08',
      date: '07/12/2023',
      invoiceNumber: '62786457352',
      name: 'Naveen',
      location: 'Erode',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 9,
      slNo: '09',
      date: '07/12/2023',
      invoiceNumber: '62786457353',
      name: 'Mani',
      location: 'Chennai',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 10,
      slNo: '10',
      date: '07/12/2023',
      invoiceNumber: '62786457354',
      name: 'Suresh',
      location: 'Madurai',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 11,
      slNo: '11',
      date: '07/12/2023',
      invoiceNumber: '62786457355',
      name: 'Abishek',
      location: 'Coimbatore',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 12,
      slNo: '12',
      date: '07/12/2023',
      invoiceNumber: '62786457356',
      name: 'Abi',
      location: 'Nagercoil',
      contactNumber: '99999 88888',
      products: 2,
      price: 200,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 13,
      slNo: '13',
      date: '07/12/2023',
      invoiceNumber: '62786457357',
      name: 'Vijay',
      location: 'Selam',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 14,
      slNo: '14',
      date: '07/12/2023',
      invoiceNumber: '62786457358',
      name: 'Ajith',
      location: 'Selam',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    },
    {
      id: 15,
      slNo: '15',
      date: '07/12/2023',
      invoiceNumber: '62786457359',
      name: 'Suriya',
      location: 'Selam',
      contactNumber: '99999 88888',
      products: 1,
      price: 100,
      trackingId: 'BLR5150653421',
      status: 'Delivered'
    }
  ];

  const trackingDetails: TrackingDetails = {
    invoiceNumber: '62786457345',
    customerName: 'Ramesh',
    trackNumber: 'BLR5150653421',
    deliveryPartner: 'Professional Couriers',
    trackLink: 'https://trackcourier.io/track-and-trace/professi...'
  };

  const filteredItems = deliveryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoiceNumber.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleTrackingClick = (item: DeliveryItem) => {
    setSelectedItem(item);
    setShowTrackingModal(true);
  };

  const handleSaveTracking = () => {
    setShowTrackingModal(false);
    setSelectedItem(null);
  };

  if (showTrackingModal && selectedItem) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowTrackingModal(false)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Delivery Tracking
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Delivery Tracking Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Number: {trackingDetails.invoiceNumber}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name: {trackingDetails.customerName}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="trackNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Track Number
              </label>
              <input
                type="text"
                id="trackNumber"
                defaultValue={trackingDetails.trackNumber}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="deliveryPartner" className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Partner
              </label>
              <input
                type="text"
                id="deliveryPartner"
                defaultValue={trackingDetails.deliveryPartner}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="trackLink" className="block text-sm font-medium text-gray-700 mb-2">
              Track link
            </label>
            <input
              type="text"
              id="trackLink"
              defaultValue={trackingDetails.trackLink}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 mt-8">
            <button
              onClick={() => setShowTrackingModal(false)}
              className="px-6 py-2 text-gray-600 hover:text-gray-700 font-medium transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSaveTracking}
              className="btn-primary px-8"
            >
              Save
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
          <h1 className="text-2xl font-semibold text-gray-900">Delivery Tracking</h1>
        </div>
        
        <div className="flex items-center space-x-4">
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. no.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedItems.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.slNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs. {item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.trackingId === 'Enter Track Id' ? (
                      <button
                        onClick={() => handleTrackingClick(item)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Enter Track Id
                      </button>
                    ) : (
                      <span className="text-gray-900">{item.trackingId}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No delivery items found matching your search.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                      currentPage === pageNumber
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-900"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;