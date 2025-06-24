import React, { useState } from 'react';
import { Star, Search, Filter, ChevronDown } from 'lucide-react';

interface Review {
  id: number;
  customerName: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      customerName: 'Ramesh',
      date: 'December 16, 2023',
      rating: 4,
      title: 'The Products I purchased was too good.',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin ex tempor, consectetur nulla. Pellentesque facilisis placerat nulla sagittis tempor. Vivamus quis justo pretium sed.',
      status: 'pending'
    },
    {
      id: 2,
      customerName: 'Suresh',
      date: 'December 16, 2023',
      rating: 4,
      title: 'The Products I purchased was too good.',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin ex tempor, consectetur nulla. Pellentesque facilisis placerat nulla sagittis tempor. Vivamus quis justo pretium sed.',
      status: 'pending'
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'All' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleApprove = (id: number) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, status: 'approved' as const } : review
    ));
  };

  const handleReject = (id: number) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, status: 'rejected' as const } : review
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and feedback</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
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
                <span className="text-sm text-gray-600">Status:</span>
                <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rating:</span>
                <div className="relative">
                  <select 
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="All">All</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {review.customerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <span className={getStatusBadge(review.status)}>
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-600">({review.rating}/5)</span>
              </div>

              <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{review.comment}</p>

              {review.status === 'pending' && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleReject(review.id)}
                    className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;