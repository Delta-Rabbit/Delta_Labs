"use client"

import * as React from "react"
import { Folder } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface NewItemModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewItemModal({ open, onOpenChange }: NewItemModalProps) {
  const [selectedType, setSelectedType] = React.useState<string>("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 pb-2 flex-row items-center gap-4 space-y-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dce5e9] shrink-0">
            <Folder className="h-6 w-6 text-[#174a5f]" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#174a5f]">New</DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2 pb-8">
          <RadioGroup value={selectedType} onValueChange={setSelectedType} className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="folder"
                  id="folder"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="folder" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Folder
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="class" id="class" className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]" />
                <Label htmlFor="class" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Class
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="management-table"
                  id="management-table"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="management-table" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Management Table
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="student" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Student
                </Label>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="department"
                  id="department"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="department" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Department
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="course"
                  id="course"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="course" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Course
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="resource"
                  id="resource"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="resource" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Resource
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="service"
                  id="service"
                  className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]"
                />
                <Label htmlFor="service" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Service
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="staff" id="staff" className="h-6 w-6 border-2 border-gray-300 text-[#174a5f]" />
                <Label htmlFor="staff" className="text-lg font-normal text-[#5c5f62] cursor-pointer">
                  Staff
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="p-6 pt-0 flex gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 text-[#174a5f] border-[#174a5f] hover:bg-[#174a5f]/5 border-2 rounded-md font-medium"
          >
            Cancel
          </Button>
          <Button className="flex-1 h-12 bg-[#174a5f] hover:bg-[#174a5f]/90 text-white rounded-md font-medium">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
