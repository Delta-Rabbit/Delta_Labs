"use client"

import { useNavigation } from "./NavigationContext"

export default function AddSchoolButton() {
  const { setCurrentPage } = useNavigation()

  const handleClick = () => {
    console.log("[v0] Add School button clicked")
    setCurrentPage('add-school')
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-[#174a5f] text-white px-6 py-3 rounded-lg font-medium shadow-md"
    >
      <AddCircleHalfDot className="w-5 h-5" />
      <span>Add School</span>
    </button>
  )
}

const AddCircleHalfDot = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M4.649 5.079q.207-.22.427-.428M7.947 2.73q.273-.122.553-.229m-6 6q.108-.284.232-.558M12 8v8m4-4H8" color="currentColor"></path>
  </svg>
)