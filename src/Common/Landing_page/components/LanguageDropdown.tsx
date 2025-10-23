import { useState, useRef, useEffect } from 'react';

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const languages = ['English', 'Amharic', 'Afaan Oromo', 'Tigregna', 'Afaan Somali'];
  const [selected, setSelected] = useState('English');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 px-3 py-1 text-white hover:text-gray-200 transition"
      >
        <img src="/assets/icons/globe.svg" alt="Globe" width={20} height={20} />
        <span>{selected}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-[8px] border border-[#737373] z-50 shadow-lg p-2">
          <input
            type="text"
            placeholder="Search Language"
            value={search}
            onChange={(e) => setSearch(e.target.value.trimStart())}
            className="w-full px-1 pb-1 mb-2 border-b border-[#737373] placeholder-[#737373] placeholder:font-semibold text-[#484848] focus:outline-none focus:ring-0"
          />

          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => {
              const isActive = lang === selected;
              return (
                <div
                  key={lang}
                  onClick={() => {
                    setSelected(lang);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={`
                    flex justify-between items-center px-3 py-2 cursor-pointer
                    ${isActive ? 'bg-[#EDE5FF] font-semibold text-black' : 'text-[#484848]'}
                    hover:bg-[#EDE5FF] transition rounded-[8px] my-1
                  `}
                >
                  <span>{lang}</span>
                  {isActive && (
                    <img src="/assets/icons/right.svg" alt="Right Icon" width={16} height={16} />
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-[#737373]">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
