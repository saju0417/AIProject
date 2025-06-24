import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Trash2, Upload } from 'lucide-react';

interface ColorSizeVariant {
  id: number;
  color: string;
  size: string;
  quantity: number;
  images: string[];
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
  variants: ColorSizeVariant[];
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  editingProduct?: Product | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct
}) => {
  const [formData, setFormData] = useState({
    productCode: '254',
    category: 'Mens',
    subCategory: 'Shirt',
    productName: 'Printed Formal Shirt',
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
    }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        productCode: editingProduct.productCode,
        category: editingProduct.category,
        subCategory: editingProduct.subCategory,
        productName: editingProduct.productName,
        productType: editingProduct.productType,
        price: editingProduct.price,
        gst: editingProduct.gst
      });
      setVariants(editingProduct.variants);
    } else {
      setFormData({
        productCode: '254',
        category: 'Mens',
        subCategory: 'Shirt',
        productName: 'Printed Formal Shirt',
        productType: 'Western Wear',
        price: 'Rs. 1,000',
        gst: '10%'
      });
      setVariants([
        {
          id: 1,
          color: '#8B0000',
          size: 'S',
          quantity: 10,
          images: []
        }
      ]);
    }
    setErrors({});
  }, [editingProduct, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
    if (variants.length > 1) {
      setVariants(prev => prev.filter(variant => variant.id !== id));
    }
  };

  const handleImageUpload = (variantId: number, files: FileList | null) => {
    if (files) {
      const imageUrls: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            imageUrls.push(e.target.result as string);
            if (imageUrls.length === files.length) {
              setVariants(prev => prev.map(variant => 
                variant.id === variantId 
                  ? { ...variant, images: [...variant.images, ...imageUrls] }
                  : variant
              ));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productCode.trim()) {
      newErrors.productCode = 'Product code is required';
    }
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!formData.subCategory.trim()) {
      newErrors.subCategory = 'Sub category is required';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        variants
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                  errors.productCode ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.productCode && <p className="text-red-500 text-xs mt-1">{errors.productCode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category
                <button type="button" className="ml-2 text-emerald-600 text-xs hover:text-emerald-700">
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
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                  errors.subCategory ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.subCategory && <p className="text-red-500 text-xs mt-1">{errors.subCategory}</p>}
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
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                  errors.productName ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
                <button type="button" className="ml-2 text-emerald-600 text-xs hover:text-emerald-700">
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
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
                  errors.price ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
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
                type="button"
                onClick={addVariant}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                Add More
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-2">Colour</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Add Quantity</div>
                <div className="col-span-5">
                  <button type="button" className="text-emerald-600 hover:text-emerald-700 text-xs">
                    Change to Numbers
                  </button>
                </div>
                <div className="col-span-1">
                  <button type="button" className="text-red-500 hover:text-red-700 text-xs">
                    Delete
                  </button>
                </div>
              </div>

              {variants.map((variant) => (
                <div key={variant.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <input
                      type="color"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
                      className="w-12 h-8 rounded border border-gray-200 cursor-pointer"
                    />
                  </div>
                  
                  <div className="col-span-2">
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
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={variant.quantity}
                      onChange={(e) => handleVariantChange(variant.id, 'quantity', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  
                  <div className="col-span-5">
                    <div className="flex items-center space-x-2">
                      {variant.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="w-8 h-8 rounded overflow-hidden">
                          <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(variant.id, e.target.files)}
                          className="hidden"
                        />
                        <div className="w-20 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 hover:border-gray-400 transition-colors">
                          Upload Image
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={variants.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="btn-primary px-8"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;