import React, { useState } from 'react';
import { Dropdown, type DropdownOption } from '../../../../../../../components/theme/Dropdown/Dropdown';

interface AddResourcePageProps {
  onBack: () => void;
  onPublish: (data: any) => void;
}

export const AddResourcePage: React.FC<AddResourcePageProps> = ({ onBack, onPublish }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: 'used',
    isForRent: true,
    isForSale: false,
    price: '',
    dailyRate: '',
    weeklyRate: '',
    location: '',
  });

  const categoryOptions: DropdownOption[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books & Materials' },
    { value: 'lab', label: 'Lab Equipment' },
    { value: 'tools', label: 'Tools & Hardware' },
  ];

  const conditionOptions: DropdownOption[] = [
    { value: 'new', label: 'Brand New' },
    { value: 'like_new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'used', label: 'Used' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.category) return;
    onPublish(formData);
  };

  return (
    <div className="w-full font-primary py-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Resource</h1>
      </div>

      <div className="flex gap-8">
        {/* Left Column - Main Form */}
        <div className="flex-1 space-y-8">
          
          {/* Basic Info */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title *</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Graphic Design Tablet" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#174A5F]" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Dropdown 
                    label="Category *"
                    value={formData.category}
                    onChange={(val) => setFormData(prev => ({...prev, category: val}))}
                    options={categoryOptions}
                    placeholder="Select Category"
                  />
                </div>
                <div>
                  <Dropdown 
                    label="Condition"
                    value={formData.condition}
                    onChange={(val) => setFormData(prev => ({...prev, condition: val}))}
                    options={conditionOptions}
                    placeholder="Select Condition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Describe your resource..." 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#174A5F] resize-none" 
                />
              </div>
            </div>
          </section>

          {/* Pricing & Availability */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Availability & Pricing</h2>
            
            <div className="flex gap-6 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isForRent"
                  checked={formData.isForRent}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-[#174A5F] rounded focus:ring-[#174A5F]" 
                />
                <span className="font-medium text-gray-700">Available for Rent</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isForSale"
                  checked={formData.isForSale}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-[#174A5F] rounded focus:ring-[#174A5F]" 
                />
                <span className="font-medium text-gray-700">Available for Sale</span>
              </label>
            </div>

            <div className="space-y-4">
              {formData.isForRent && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
                  <h3 className="text-sm font-bold text-[#174A5F] mb-3 uppercase tracking-wider">Rental Rates (ETB)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Daily Rate</label>
                      <input 
                        type="number" 
                        name="dailyRate"
                        value={formData.dailyRate}
                        onChange={handleChange}
                        placeholder="0.00" 
                        className="w-full p-2.5 border border-gray-200 rounded-lg" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Weekly Rate (Optional)</label>
                      <input 
                        type="number" 
                        name="weeklyRate"
                        value={formData.weeklyRate}
                        onChange={handleChange}
                        placeholder="0.00" 
                        className="w-full p-2.5 border border-gray-200 rounded-lg" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.isForSale && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
                  <h3 className="text-sm font-bold text-[#174A5F] mb-3 uppercase tracking-wider">Selling Price (ETB)</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Total Price</label>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00" 
                      className="w-full p-2.5 border border-gray-200 rounded-lg" 
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Location */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Location</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <div className="relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location (e.g. AAiT Campus, 5 Kilo)" 
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#174A5F]" 
                />
              </div>
            </div>
          </section>

        </div>

        {/* Right Column - Images & Publish */}
        <div className="w-80 space-y-6">
          
          {/* Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Images</h2>
            
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-[#174A5F] hover:bg-[#174A5F]/5 transition-all cursor-pointer group mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white text-gray-400 group-hover:text-[#174A5F] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Click to upload</p>
              <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-gray-50 rounded-lg border border-gray-100"></div>
              ))}
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Publish</h2>
            <p className="text-sm text-gray-500 mb-6">
              Review your information before publishing. Once published, your resource will be visible to other students.
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-[#174A5F] text-white font-bold rounded-xl hover:bg-[#123644] transition-colors shadow-md"
              >
                Publish Resource
              </button>
              <button 
                onClick={onBack}
                className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
