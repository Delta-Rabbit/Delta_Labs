'use client'

export default function BotChat() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6">
      <div className="mb-8 w-full max-w-md">
        <div className="flex items-end gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img 
                src="/assets/images/logo.jpg" 
                alt="Bot Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="white"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <span className="text-xs text-gray-500">2:30 PM</span>
          </div>

          <div 
            className="relative rounded-lg px-4 py-3 max-w-xs"
            style={{ backgroundColor: '#174A5F' }}
          >
            <p className="text-white text-sm">
              Any Question about modern Physics? please let me know?
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <div className="bg-white rounded-b-lg shadow-md p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full px-4 py-4 placeholder-[#174A5F] focus:outline-none focus:ring-0 focus:border-none border-none text-gray-800"
              style={{ backgroundColor: '#E8EBF0' }}
            />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <button className="p-2 rounded-lg transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    fill="white" 
                    stroke="#174A5F" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M14.76 12H6.832m0 0c0-.275-.057-.55-.17-.808L4.285 5.814c-.76-1.72 1.058-3.442 2.734-2.591L20.8 10.217c1.46.74 1.46 2.826 0 3.566L7.02 20.777c-1.677.851-3.495-.872-2.735-2.591l2.375-5.378A2 2 0 0 0 6.83 12"
                  />
                </svg>
              </button>

              <button className="p-2 rounded-lg transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 352 512"
                >
                  <path 
                    fill="#174A5F" 
                    d="M176 341q45 0 76-31t31-75V107q0-45-31-76T176 0t-76 31t-31 76v128q0 44 31 75t76 31zm-64-234q0-28 18.5-46T176 43t45.5 18t18.5 46v128q0 27-18.5 45.5T176 299t-45.5-18.5T112 235V107zm235 128v-64q0-22-22-22q-9 0-15 6t-6 16v64q0 53-38 90.5T176 363t-90-37.5T48 235v-64q0-10-6-16t-15-6q-22 0-22 22v64q0 65 43 112.5T155 403v45q0 7-5.5 12t-11.5 7l-5 2q-17 0-29.5 13T91 512h170q0-17-12.5-30T219 469q-22-6-22-21v-45q64-8 107-55.5T347 235z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}