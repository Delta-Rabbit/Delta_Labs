import React, { useState } from 'react';
import { DeltaButton, DeltaInput, DeltaTextarea, DeltaDropdown } from '../../../../../../../components/theme';

interface SupplementFormProps {
  onBack: () => void;
}

export const SupplementForm: React.FC<SupplementFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Video',
    section: '',
    url: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { ...formData, uploadedFile });
    onBack(); // Go back after value (mock)
  };

  const categoryOptions = [
      { value: 'Video', label: 'Video' },
      { value: 'Book', label: 'Book' },
      { value: 'Article', label: 'Article' },
      { value: 'Paper', label: 'Paper' }
  ];

  const sectionOptions = [
      { value: 'Chapter 1', label: 'Chapter 1: Kinematics' },
      { value: 'Chapter 2', label: 'Chapter 2: Forces' },
      { value: 'Chapter 3', label: 'Chapter 3: Energy' }
  ];

  return (
    <div className="w-full max-w-4xl font-primary animate-fadeIn">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-8 p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Title */}
        <DeltaInput
            label="Content title"
            helperText="Choose a title that represents your content"
            placeholder="Course introduction"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
        />

        {/* Description */}
        <DeltaTextarea
            label="Insert Description"
            helperText="State a detailed description on this topic"
            placeholder="Lorem ipsum..."
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        {/* Category */}
        <DeltaDropdown
            label="Select category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => setFormData({...formData, category: value})}
            helperText="Choose the category for the uploaded material"
        />

        {/* Upload File */}
        <div className="space-y-2">
            <label className="block text-left text-sm font-medium text-gray-400 mb-1">
                Upload material
            </label>
            <p className="text-sm text-gray-500 mb-2">Choose the course material</p>
            <div className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg bg-white">
                 <label className="cursor-pointer">
                    <span className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors">
                        Choose file
                    </span>
                    <input type="file" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                </label>
                <span className="text-gray-500 text-sm">{uploadedFile ? uploadedFile.name : 'No file chosen'}</span>
            </div>
        </div>

        {/* URL */}
        <DeltaInput
            label="Attach URL"
            helperText="Attach a link/ url"
            placeholder="Put your link here"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
        />

         {/* Section Selector */}
         <DeltaDropdown
            // label="Select Section" // Design just showed "Select section" placeholder roughly
            placeholder="Select section"
            options={sectionOptions}
            value={formData.section}
            onChange={(value) => setFormData({...formData, section: value})}
            className="w-fit min-w-[200px]"
         />
        
        {/* Footer Actions */}
        <div className="flex justify-end pt-8">
             <DeltaButton 
                variant="primary" 
                type="submit"
                className="bg-[#174A5F] hover:bg-[#123644] text-white px-8 h-12 rounded-lg font-medium"
            >
                Save Supplement
            </DeltaButton>
        </div>

      </form>
    </div>
  );
};
