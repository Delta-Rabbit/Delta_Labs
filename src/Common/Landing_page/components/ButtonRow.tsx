'use client'

import FreeResourcesButton from "./FreeResourcesButton"
import AddToWishListButton from "./AddToWishListButton"
import EnrollNowButton from "./EnrollNowButton"

export default function ButtonRow() {
  return (
    <div className="w-full flex justify-center p-4 bg-E9E9E9/100">
      <div className="flex relative overflow-hidden" style={{ width: "650px" }}>
        <FreeResourcesButton className="relative right-[-40px]" />
        <AddToWishListButton className="relative left-[-8px]" />
        <EnrollNowButton className="relative left-[-43px]" />
      </div>
    </div>
  )
}
