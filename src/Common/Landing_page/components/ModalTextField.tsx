export default function ModalTextField() {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="relative w-[80%]">
        <input
          type="text"
          placeholder="Enter Your Text here"
          className="
            w-full 
            border 
            border-[#174A5F] 
            rounded-[10px] 
            text-black
            text-lg 
            placeholder-[#174A5F] 
            placeholder:font-light 
            font-light 
            font-['Roboto'] 
            px-3 py-2 
            pr-10
            focus:outline-none 
            focus:ring-1 
            focus:ring-[#174A5F] 
            transition
          "
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          <img src="/assets/icons/rightarrow.svg" alt="Right Arrow" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
