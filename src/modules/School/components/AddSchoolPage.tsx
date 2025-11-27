import { Upload, Plus, ChevronLeft } from 'lucide-react'
import TopBar from "../components/TopBar"
import LeftNavigationBar from "../components/LeftNavigationBar"

export default function AddSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <LeftNavigationBar />

      <main className="ml-20 pt-8 pb-12 px-8">
        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center gap-2 text-[#174a5f] hover:text-[#1a5569] transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-4xl font-bold text-[#151619]">Add New School</h1>
        </div>

        <div className="max-w-4xl bg-white rounded-2xl p-8 shadow-sm border border-[#dce5e9]">
          <div className="mb-8">
            <label className="block text-base font-medium text-[#151619] mb-4">
              School Logo
            </label>
            <div className="border-2 border-dashed border-[#dce5e9] rounded-xl p-12 bg-[#f8fafc]">
              <div className="flex flex-col items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#174a5f] text-white rounded-lg hover:bg-[#1a5569] transition-colors">
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
                <p className="text-sm text-[#625f68] text-center">
                  Browse file or drag and drop
                  <br />
                  the file here
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-base font-medium text-[#151619] mb-3">
                School Name
              </label>
              <input
                type="text"
                placeholder="Enter school name"
                className="w-full px-4 py-3 bg-white border border-[#dce5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174a5f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#151619] mb-3">
                School Type
              </label>
              <select className="w-full px-4 py-3 bg-white border border-[#dce5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174a5f] focus:border-transparent">
                <option value="">Choose Type</option>
                <option value="elementary">Elementary School</option>
                <option value="middle">Middle School</option>
                <option value="high">High School</option>
                <option value="university">University</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-base font-medium text-[#151619] mb-3">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 bg-white border border-[#dce5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174a5f] focus:border-transparent"
            />
          </div>

          <div className="mb-8">
            <button className="flex items-center gap-2 text-[#174a5f] hover:text-[#1a5569] transition-colors font-medium">
              Add Custom Field
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-end">
            <button className="px-8 py-3 bg-[#174a5f] text-white rounded-lg hover:bg-[#1a5569] transition-colors font-medium">
              Save and Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}