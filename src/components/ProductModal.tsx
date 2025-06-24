import React, { useState } from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColorSizeVariant {
  id: number;
  color: string;
  size: string;
  quantity: number;
  images: string[];
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productCode: '254',
    category: 'Mens',
    subCategory: 'Shirt',
    productName: 'Plain Shirt',
    productType: 'Western Wear',
    price: 'Rs. 1,000',
    gst: '10%'
  });

  const [variants, setVariants] = useState<ColorSizeVariant[]>([
    {
      id: 1,
      color: '#8B0000',
      size: 'S',
      quantity: 10,
      images: []
    },
    {
      id: 2,
      color: '#8B0000',
      size: 'M',
      quantity: 10,
      images: []
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVariantChange = (id: number, field: string, value: string | number) => {
    setVariants(prev => prev.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ));
  };

  const addVariant = () => {
    const newVariant: ColorSizeVariant = {
      id: Date.now(),
      color: '#8B0000',
      size: 'S',
      quantity: 10,
      images: []
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const removeVariant = (id: number) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Code
              </label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category
                <button className="ml-2 text-emerald-600 text-xs hover:text-emerald-700">
                  Add New Category
                </button>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm appearance-none"
                >
                  <option>Mens</option>
                  <option>Womens</option>
                  <option>Kids</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Category
              </label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
                <button className="ml-2 text-emerald-600 text-xs hover:text-emerald-700">
                  Add New Product Type
                </button>
              </label>
              <div className="relative">
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm appearance-none"
                >
                  <option>Western Wear</option>
                  <option>Traditional Wear</option>
                  <option>Casual Wear</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST
            </label>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Available Colours, Sizes & Quantity.</h3>
              <button
                onClick={addVariant}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                Add More
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm font-medium text-gray-700">
                <div className="w-20">Colour</div>
                <div className="w-32">Size</div>
                <div className="w-32">Quantity</div>
                <div className="flex-1">
                  <button className="text-emerald-600 hover:text-emerald-700 text-xs">
                    Change to Numbers
                  </button>
                </div>
                <div className="w-20">
                  <button className="text-red-500 hover:text-red-700 text-xs">
                    Delete
                  </button>
                </div>
              </div>

              {variants.map((variant) => (
                <div key={variant.id} className="flex items-center space-x-4">
                  <div className="w-20">
                    <div
                      className="w-12 h-8 rounded border border-gray-200"
                      style={{ backgroundColor: variant.color }}
                    ></div>
                  </div>
                  
                  <div className="w-32">
                    <div className="relative">
                      <select
                        value={variant.size}
                        onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm appearance-none"
                      >
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>XXL</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="w-32">
                    <input
                      type="number"
                      value={variant.quantity}
                      onChange={(e) => handleVariantChange(variant.id, 'quantity', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 bg-red-900 rounded"></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-20">
                    <button
                      onClick={() => removeVariant(variant.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center space-x-4">
                <div className="w-20">
                  <div className="w-12 h-8 bg-red-900 rounded border border-gray-200"></div>
                </div>
                
                <div className="w-32">
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm appearance-none">
                      <option>M</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="w-32">
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                
                <div className="flex-1">
                  <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 transition-colors text-sm">
                    Upload Image
                  </button>
                </div>
                
                <div className="w-20"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Discard
          </button>
          <button className="btn-primary px-8">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;