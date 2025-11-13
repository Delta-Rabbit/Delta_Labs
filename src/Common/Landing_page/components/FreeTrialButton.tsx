export default function FreeTrialButton() {
  return (
    <div className="flex">
      {/* 3 Free Trial Button */}
      <button className="w-32 px-4 py-3 bg-[#C6C6C6] text-gray-800 font-semibold shadow-sm border-0">
        3 Free Trial
      </button>
      
      {/* Subscribe Button with pure incline */}
      <button 
        className="relative w-96 px-4 py-3 bg-[#174A5F] text-white font-semibold shadow-sm border-0 rounded-br-[5px] ml-[-16px] pl-6"
        style={{
          clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)'
        }}
      >
        Subscribe
      </button>
    </div>
  );
}