export default function SearchBar() {
  return (
    <div className="w-full max-w-[554px] h-10 flex items-center gap-3 rounded-full bg-white px-4 shadow-sm">
      <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <path fill="#174A5F" d="M9.6 10.01a.5.5 0 0 1 0 .98l-.1.01h-4a.5.5 0 0 1 0-1h4zm2-3a.5.5 0 0 1 0 .98l-.1.01h-8a.5.5 0 0 1 0-1h8zM13.5 4a.5.5 0 0 1 0 1h-12a.5.5 0 0 1 0-1z"/>
      </svg>
      <input
        type="text"
        placeholder="Search...|"
        className="flex-1 outline-none bg-transparent text-sm font-roboto text-gray-800 placeholder:text-[rgba(0,0,0,0.54)]"
      />
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#174A5F" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
      </button>
    </div>
  );
}