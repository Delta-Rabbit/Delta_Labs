'use client'

import ButtonRow from "./ButtonRow"

interface ButtonRowWithIconProps {
  iconTop?: string
  iconLeft?: string
}

export default function ButtonRowWithIcon({
  iconTop = "32px",
  iconLeft = "57%",
}: ButtonRowWithIconProps) {
  return (
    <div className="relative w-full flex justify-center items-start">
      <div
        className="absolute"
        style={{
          top: iconTop,
          left: iconLeft,
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <img
          src="/assets/icons/OR.png"
          alt="Icon"
          width={24}
          height={24}
        />
      </div>

      <div className="relative z-0 w-full">
        <ButtonRow />
      </div>
    </div>
  )
}
