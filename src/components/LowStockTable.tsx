import React from 'react';

const LowStockTable = () => {
  const lowStockItems = [
    {
      code: '2676T',
      product: 'Saree',
      quantity: '09'
    },
    {
      code: '2676T',
      product: 'Leggings',
      quantity: '10'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Low Stock</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lowStockItems.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;