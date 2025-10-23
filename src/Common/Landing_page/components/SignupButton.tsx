'use client';

interface SignupButtonProps {
  onClick?: () => void;
}

export default function SignupButton({ onClick }: SignupButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-[129px] h-[47px]
        border border-white
        rounded-full
        text-white
        text-[18px] font-poppins font-medium
        bg-transparent
      "
    >
      Sign Up
    </button>
  );
}
