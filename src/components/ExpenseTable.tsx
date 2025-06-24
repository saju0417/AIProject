import React from 'react';

const ExpenseTable = () => {
  const expenses = [
    {
      slNo: '01',
      date: '10/11/2023',
      category: 'Plumbing',
      subCategory: 'Taps, Pipes, Joints',
      amount: 'Rs.1,000',
      status: 'Paid'
    },
    {
      slNo: '02',
      date: '12/11/2023',
      category: 'Painting',
      subCategory: 'Paint brush',
      amount: 'Rs.450',
      status: 'Unpaid'
    },
    {
      slNo: '03',
      date: '12/11/2023',
      category: 'Carpentry',
      subCategory: 'Wood',
      amount: 'Rs.6,000',
      status: 'Paid'
    },
    {
      slNo: '04',
      date: '11/11/2023',
      category: 'Transport',
      subCategory: 'Diesel',
      amount: 'Rs.600',
      status: 'Unpaid'
    },
    {
      slNo: '05',
      date: '11/11/2023',
      category: 'Electrical',
      subCategory: 'wires',
      amount: 'Rs.1300',
      status: 'Paid'
    }
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    return status === 'Paid' 
      ? `${baseClasses} bg-emerald-100 text-emerald-700`
      : `${baseClasses} bg-red-100 text-red-700`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Expense</h3>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            View All
          </button>
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
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.slNo} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.slNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.subCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(expense.status)}>
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;