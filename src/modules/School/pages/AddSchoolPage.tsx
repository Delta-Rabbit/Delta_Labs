'use client'

import { useState, useRef } from 'react'
import { CloudUpload, Plus, ChevronLeft, Trash2, Building2, Briefcase, ImageIcon, FolderOpen, Award as IdCard, GraduationCap, Box, Calendar, Users, Building, TrendingUp, FileText, Clock, Presentation, ChevronDown, PlusCircle } from 'lucide-react'
import TopBar from "../components/TopBar"

interface AddSchoolPageProps {
  onBack?: () => void
}

interface CustomField {
  id: number
  name: string
  value: string
}

interface AccessPermission {
  name: string
  icon: React.ReactNode
  status: string
}

interface Partner {
  id: number
  name: string
  ownership: string
}

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'default',
  className = '',
  ...props 
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'default' | 'icon' | 'sm'
  className?: string
  type?: 'button' | 'submit'
}) => {
  const baseStyles = 'flex items-center justify-center font-medium transition-colors focus:outline-none rounded-lg'
  
  const variants = {
    primary: 'bg-[#174a5f] text-white shadow-md',
    outline: 'border border-[#174a5f] text-[#174a5f]',
    ghost: 'text-[#174a5f]'
  }
  
  const sizes = {
    default: 'px-6 py-3 text-base',
    sm: 'px-4 py-2 text-sm',
    icon: 'h-8 w-8 p-0'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ 
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  ...props 
}: {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  className?: string
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white border border-[#dce5e9] rounded-lg focus:outline-none ${className}`}
      {...props}
    />
  )
}

const Select = ({ 
  children,
  value,
  onValueChange,
  ...props 
}: {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-[#dce5e9] rounded-lg focus:outline-none appearance-none hover:border-[#dce5e9]"
        style={{ backgroundColor: 'white', color: '#000000' }}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  )
}

const SelectTrigger = ({ children, className, ...props }: any) => (
  <div className={className} {...props}>
    {children}
  </div>
)

const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <span>{placeholder}</span>
)

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option 
    value={value} 
    style={{ 
      backgroundColor: 'white', 
      color: '#000000'
    }}
    className="hover:bg-white hover:text-[#000000]"
  >
    {children}
  </option>
)

export default function AddSchoolPage({ onBack }: AddSchoolPageProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [partnerCustomFields, setPartnerCustomFields] = useState<CustomField[]>([])
  const [leftPermissions, setLeftPermissions] = useState<Record<string, string>>({})
  const [rightPermissions, setRightPermissions] = useState<Record<string, string>>({})
  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, name: 'Leul Solomon', ownership: '35% Ownership' }
  ])
  const [schoolType, setSchoolType] = useState('sole')
  const [schoolLogo, setSchoolLogo] = useState<File | null>(null)
  const [schoolDocuments, setSchoolDocuments] = useState<File[]>([])

  const logoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      { id: Date.now(), name: '', value: '' }
    ])
  }

  const addPartnerCustomField = () => {
    setPartnerCustomFields([
      ...partnerCustomFields,
      { id: Date.now(), name: '', value: '' }
    ])
  }

  const updateCustomField = (id: number, field: 'name' | 'value', value: string) => {
    setCustomFields(
      customFields.map(cf => 
        cf.id === id ? { ...cf, [field]: value } : cf
      )
    )
  }

  const updatePartnerCustomField = (id: number, field: 'name' | 'value', value: string) => {
    setPartnerCustomFields(
      partnerCustomFields.map(cf => 
        cf.id === id ? { ...cf, [field]: value } : cf
      )
    )
  }

  const handleSaveAndContinue = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    } else if (step === 4) {
      setStep(5)
    }
  }

  const handleBackToStep1 = () => {
    setStep(1)
  }

  const handleBackToStep2 = () => {
    setStep(2)
  }

  const handleBackToStep3 = () => {
    setStep(3)
  }

  const handleBackToStep4 = () => {
    setStep(4)
  }

  const addPartner = () => {
    const newPartner = {
      id: Date.now(),
      name: '',
      ownership: '0% Ownership'
    }
    setPartners([...partners, newPartner])
    setStep(3)
  }

  const removePartner = (id: number) => {
    setPartners(partners.filter(p => p.id !== id))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSchoolLogo(file)
    }
  }

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSchoolDocuments(prev => [...prev, ...Array.from(files)])
    }
  }

  const removeDocument = (index: number) => {
    setSchoolDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleLogoClick = () => {
    logoInputRef.current?.click()
  }

  const handleDocumentClick = () => {
    documentInputRef.current?.click()
  }

  const handleBackClick = () => {
    if (step === 1) {
      onBack?.()
    } else {
      if (step === 2) handleBackToStep1()
      else if (step === 3) handleBackToStep2()
      else if (step === 4) handleBackToStep3()
      else if (step === 5) handleBackToStep4()
    }
  }

  const renderContent = () => {
    if (step === 5) {
      return (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-5 w-5 text-[#174a5f]" />
            </Button>
            <h1 className="text-2xl font-semibold text-[#000000]">
              Add New School
            </h1>
          </div>

          <div className="mb-12">
            <h2 className="text-lg font-semibold text-[#000000] mb-8">
              Partners
            </h2>

            <Button
              className="bg-[#174a5f] text-white px-6 h-12 rounded-md mb-8 gap-2"
              onClick={addPartner}
            >
              <PlusCircle className="h-5 w-5" />
              Add Owner
            </Button>

            <div className="space-y-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg border border-[#d9d9d9] p-6 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-base text-[#000000] mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-[#828282]">
                      {partner.ownership}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600"
                    onClick={() => removePartner(partner.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-[#174a5f] text-[#174a5f] px-8 h-12 rounded-md"
              onClick={handleBackToStep4}
            >
              Back
            </Button>
            <Button 
              className="bg-[#174a5f] text-white px-8 h-12 rounded-md"
              onClick={onBack}
            >
              Done
            </Button>
          </div>
        </div>
      )
    }

    if (step === 4) {
      const leftColumnPermissions: AccessPermission[] = [
        { name: 'Root Department', icon: <Building2 className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Class', icon: <Briefcase className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Project Management', icon: <ImageIcon className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Online course modules', icon: <FolderOpen className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Staff and Teacher', icon: <IdCard className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Student management', icon: <GraduationCap className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Academic Management', icon: <Box className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
      ]

      const rightColumnPermissions: AccessPermission[] = [
        { name: 'Timetable and Scheduling', icon: <Calendar className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Parent Portal', icon: <Users className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Hostel and Transport', icon: <Building className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Data analytics and reports', icon: <TrendingUp className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Document Management', icon: <FileText className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Activity', icon: <Clock className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
        { name: 'Class', icon: <Presentation className="h-5 w-5 text-[#174a5f]" />, status: 'Can View' },
      ]

      return (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-5 w-5 text-[#174a5f]" />
            </Button>
            <h1 className="text-2xl font-semibold text-[#000000]">
              Add New School
            </h1>
          </div>
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-[#000000] mb-8">
              School Share
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden">
                <div className="flex justify-between border-b border-[#e5e5e5] bg-[#f8f8f8]">
                  <div className="px-4 py-3 font-semibold text-[#174a5f] text-sm">Access Name</div>
                  <div className="px-4 py-3 font-semibold text-[#174a5f] text-sm">Status</div>
                </div>
                {leftColumnPermissions.map((permission, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-[#e5e5e5] last:border-b-0">
                    <div className="px-4 py-4 flex items-center gap-3">
                      {permission.icon}
                      <span className="text-[#000000] text-sm">{permission.name}</span>
                    </div>
                    <div className="px-4 py-3">
                      <Select 
                        value={leftPermissions[permission.name] || permission.status}
                        onValueChange={(value) => setLeftPermissions({...leftPermissions, [permission.name]: value})}
                      >
                        <option value="Can View">Can View</option>
                        <option value="Can Edit">Can Edit</option>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden">
                <div className="flex justify-between border-b border-[#e5e5e5] bg-[#f8f8f8]">
                  <div className="px-4 py-3 font-semibold text-[#174a5f] text-sm">Access Name</div>
                  <div className="px-4 py-3 font-semibold text-[#174a5f] text-sm">Status</div>
                </div>
                {rightColumnPermissions.map((permission, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-[#e5e5e5] last:border-b-0">
                    <div className="px-4 py-4 flex items-center gap-3">
                      {permission.icon}
                      <span className="text-[#000000] text-sm">{permission.name}</span>
                    </div>
                    <div className="px-4 py-3">
                      <Select 
                        value={rightPermissions[permission.name] || permission.status}
                        onValueChange={(value) => setRightPermissions({...rightPermissions, [permission.name]: value})}
                      >
                        <option value="Can View">Can View</option>
                        <option value="Can Edit">Can Edit</option>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-[#174a5f] text-[#174a5f] px-8 h-12 rounded-md"
              onClick={handleBackToStep3}
            >
              Back
            </Button>
            <Button 
              className="bg-[#174a5f] text-white px-8 h-12 rounded-md"
              onClick={handleSaveAndContinue}
            >
              Save and Continue
            </Button>
          </div>
        </div>
      )
    }

    if (step === 3) {
      return (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-5 w-5 text-[#174a5f]" />
            </Button>
            <h1 className="text-2xl font-semibold text-[#000000]">
              Add New School
            </h1>
          </div>

          <div className="mb-12">
            <h2 className="text-lg font-semibold text-[#000000] mb-8">
              Partner Detail
            </h2>

            <div className="mb-8">
              <label className="block text-base font-medium text-[#000000] mb-3">
                Full Name
              </label>
              <Input
                placeholder="Enter here"
                className="bg-white border-[#cccfcb] h-12"
              />
            </div>

            <div className="mb-8">
              <label className="block text-base font-medium text-[#000000] mb-3">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter here"
                className="bg-white border-[#cccfcb] h-12"
              />
            </div>

            <div className="mb-8">
              <label className="block text-base font-medium text-[#000000] mb-3">
                Ownership Percentage
              </label>
              <Input
                placeholder="Enter here"
                className="bg-white border-[#cccfcb] h-12"
              />
            </div>

            <div className="mb-8">
              <Button
                variant="ghost"
                className="text-[#000000] font-medium px-0 mb-6 gap-2"
                onClick={addPartnerCustomField}
              >
                Add Custom
                <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-[#828282]">
                  <Plus className="h-3 w-3 text-[#828282]" />
                </div>
              </Button>

              {partnerCustomFields.length > 0 && (
                <div className="space-y-4">
                  {partnerCustomFields.map((field) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        placeholder="Name"
                        value={field.name}
                        onChange={(e) => updatePartnerCustomField(field.id, 'name', e.target.value)}
                        className="bg-white border-[#cccfcb] h-12"
                      />
                      <Input
                        placeholder="Value"
                        value={field.value}
                        onChange={(e) => updatePartnerCustomField(field.id, 'value', e.target.value)}
                        className="bg-white border-[#cccfcb] h-12"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-[#174a5f] text-[#174a5f] px-8 h-12 rounded-md"
              onClick={handleBackToStep2}
            >
              Back
            </Button>
            <Button 
              className="bg-[#174a5f] text-white px-8 h-12 rounded-md"
              onClick={handleSaveAndContinue}
            >
              Save and Continue
            </Button>
          </div>
        </div>
      )
    }

    if (step === 2) {
      return (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-5 w-5 text-[#174a5f]" />
            </Button>
            <h1 className="text-2xl font-semibold text-[#000000]">
              Add New School
            </h1>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-[#000000] mb-4">
              Attach School Document
            </label>
            <div className="w-full border-2 border-dashed border-[#d9d9d9] rounded-lg bg-white">
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <input
                  type="file"
                  ref={documentInputRef}
                  className="hidden"
                  onChange={handleDocumentUpload}
                  multiple
                />
                <Button
                  variant="outline"
                  className="border-[#828282] text-[#323338] px-6 mb-3"
                  onClick={handleDocumentClick}
                >
                  Upload
                  <CloudUpload className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-sm text-[#828282] text-center leading-relaxed">
                  Browse file or drag and drop<br />the file here
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {schoolDocuments.map((doc, index) => (
              <div key={index} className="bg-white rounded-lg border border-[#d9d9d9] p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-red-600"
                  onClick={() => removeDocument(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-[#000000]">{doc.name}</h3>
                  </div>
                  <p className="text-xs text-[#828282] mb-3">
                    Size: {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-xs text-[#828282] mb-3">
                    Type: {doc.type || 'Unknown'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-[#174a5f] text-[#174a5f] px-8 h-12 rounded-md"
              onClick={handleBackToStep1}
            >
              Back
            </Button>
            <Button 
              className="bg-[#174a5f] text-white px-8 h-12 rounded-md"
              onClick={handleSaveAndContinue}
            >
              Save and Continue
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-12">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onBack} 
          >
            <ChevronLeft className="h-5 w-5 text-[#174a5f]" />
          </Button>
          <h1 className="text-2xl font-semibold text-[#000000]">
            Add New School
          </h1>
        </div>

        <div className="mb-8 w-1/2">
          <label className="block text-base font-medium text-[#000000] mb-3">
            School Logo
          </label>
          <div className="w-full border-2 border-dashed border-[#d9d9d9] rounded-lg bg-white">
            <div className="flex flex-col items-center justify-center py-10 px-6">
              <input
                type="file"
                ref={logoInputRef}
                className="hidden"
                onChange={handleLogoUpload}
                accept="image/*"
              />
              <Button
                variant="outline"
                className="border-[#828282] text-[#323338] px-6 mb-3"
                onClick={handleLogoClick}
              >
                Upload
                <CloudUpload className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-sm text-[#828282] text-center leading-relaxed">
                Browse file or drag and drop<br />the file here
              </p>
              {schoolLogo && (
                <p className="text-sm text-[#174a5f] mt-2">
                  Selected: {schoolLogo.name}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-base font-medium text-[#000000] mb-3">
              School Name
            </label>
            <Input
              placeholder="Enter here"
              className="bg-white border-[#cccfcb] h-12"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-[#000000] mb-3">
              School Type
            </label>
            <Select 
              value={schoolType}
              onValueChange={setSchoolType}
            >
              <option value="sole">Sole</option>
              <option value="partnership">Partnership</option>
            </Select>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-[#000000] mb-3">
            Email
          </label>
          <Input
            type="email"
            placeholder="Email"
            className="bg-white border-[#cccfcb] h-12"
          />
        </div>

        <div className="mb-12">
          <Button
            variant="ghost"
            className="text-[#000000] font-medium px-0 mb-6 gap-2"
            onClick={addCustomField}
          >
            Add Custom
            <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-[#828282]">
              <Plus className="h-3 w-3 text-[#828282]" />
            </div>
          </Button>

          {customFields.length > 0 && (
            <div className="space-y-4">
              {customFields.map((field) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Name"
                    value={field.name}
                    onChange={(e) => updateCustomField(field.id, 'name', e.target.value)}
                    className="bg-white border-[#cccfcb] h-12"
                  />
                  <Input
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                    className="bg-white border-[#cccfcb] h-12"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button 
            className="bg-[#174a5f] text-white px-8 h-12 rounded-md"
            onClick={handleSaveAndContinue}
          >
            Save and Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f6fc]">
      <TopBar />
      <main className="pt-8 pb-12">
        {renderContent()}
      </main>
    </div>
  )
}