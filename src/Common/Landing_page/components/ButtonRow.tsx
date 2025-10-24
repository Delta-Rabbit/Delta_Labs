'use client'

import FreeResourcesButton from "./FreeResourcesButton"
import AddToWishListButton from "./AddToWishListButton"
import EnrollNowButton from "./EnrollNowButton"

export default function ButtonRow() {
  return (
    <div className="w-full flex justify-center p-4 bg-E9E9E9/100">
      <div className="flex w-full max-w-[700px] overflow-hidden relative">
  <FreeResourcesButton className="relative right-[0px]" />
  <AddToWishListButton className="relative left-[-39px]" />
  <EnrollNowButton className="relative left-[-70px]" />
</div>
    </div>
  )
}
