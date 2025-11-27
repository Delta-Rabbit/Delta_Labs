import { Menu, X } from "lucide-react"
import { useState } from "react"
import LanguageDropdown from '../../../Common/Landing_page/components/LanguageDropdown';
import AIBotModal from '../../../Common/Landing_page/components/AIBotModal';
import { useNavigation } from "./NavigationContext";

export function TopNavigation() {
  const [isBotModalOpen, setIsBotModalOpen] = useState(false)
  const { setCurrentPage } = useNavigation()

  const handleCloseTab = (tabName: string) => {
    if (tabName === 'school') {
      window.dispatchEvent(new CustomEvent('navigateToLanding'))
    } else if (tabName === 'cathedral') {
      setCurrentPage('home')
    }
  }

  const handleBotClick = () => {
    console.log('Bot button clicked, opening modal')
    setIsBotModalOpen(true)
  }

  const handleCloseModal = () => {
    console.log('Closing modal')
    setIsBotModalOpen(false)
  }

  return (
    <>
      <div className="bg-[#174a5f] text-white h-[70px] flex items-center justify-between px-6 shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <img 
              src="/assets/images/DeltaLabsLogo.png" 
              alt="Delta Labs Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-4">
            <div className="flex items-center gap-3 bg-[#DCE5E9] rounded-t-lg px-8 py-2.5 mt-5">
              <span className="text-base font-medium text-[#174A5F]">School</span>
              <button 
                className="p-1 rounded"
                onClick={() => handleCloseTab('school')}
              >
                <X className="w-5 h-5 text-[#174A5F]" />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-[#DCE5E9] rounded-t-lg px-6 py-2 mt-7">
              <span className="text-sm font-medium text-[#174A5F]">Cathedral</span>
              <button 
                className="p-1 rounded"
                onClick={() => handleCloseTab('cathedral')}
              >
                <X className="w-4 h-4 text-[#174A5F]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageDropdown />
          
          <button 
            className="p-2 rounded-lg relative"
            onClick={handleBotClick}
          >
            <img 
              src="/assets/icons/AI Bot.svg" 
              alt="AI Bot" 
              className="w-7 h-7"
            />
          </button>

          <div className="flex items-center gap-2 ml-2">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img 
                src="/assets/images/profile.png" 
                alt="John's Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium hidden md:inline">John</span>
          </div>
        </div>
      </div>

      <AIBotModal isOpen={isBotModalOpen} onClose={handleCloseModal} />
    </>
  )
}