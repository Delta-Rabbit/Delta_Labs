'use client'

import { useState } from 'react'
import VideoActions from './ReactionButtons'
import FreeTrialButton from './FreeTrialButton'
import VideoInfo from './ContentOwner'

interface SimulationCalculatorProps {
  calculatorOffsetY?: string
  calculatorOffsetX?: string
  actionsOffsetY?: string
  actionsOffsetX?: string
  freeTrialOffsetY?: string
  freeTrialOffsetX?: string
  isActive?: boolean
  onCommentClick?: () => void
  hideReactionButtons?: boolean
}

export default function SimulationCalculator({
  calculatorOffsetY = "40px",
  calculatorOffsetX = "0px",
  actionsOffsetY = "60px",
  actionsOffsetX = "30px",
  freeTrialOffsetY = "40px",
  freeTrialOffsetX = "0px",
  isActive = false,
  onCommentClick,
  hideReactionButtons = false,
}: SimulationCalculatorProps) {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState('')

  const handleButtonClick = (value: string) => {
    if (value === 'AC') {
      setDisplay('0')
      setExpression('')
      setHistory('')
    } else if (value === 'Backspace') {
      if (display.length === 1) {
        setDisplay('0')
      } else {
        setDisplay(display.slice(0, -1))
      }
    } else if (value === '=') {
      try {
        const fullExpression = expression + display
        const result = eval(fullExpression).toString()
        
        setHistory(`${fullExpression} =`)
        setDisplay(result)
        setExpression('')
      } catch (error) {
        setDisplay('Error')
        setHistory('')
        setExpression('')
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      setExpression(expression + display + value)
      setDisplay('0')
    } else {
      if (display === '0' || display === 'Error') {
        setDisplay(value)
      } else {
        setDisplay(display + value)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-12 pb-8 space-y-6">
      <div className="flex items-start space-x-4 mt-8">
        {/* Calculator */}
        <div 
          className="relative w-64 h-[360px] bg-[#17181A] rounded-xl shadow-xl overflow-hidden"
          style={{
            transform: `translate(${calculatorOffsetX}, ${calculatorOffsetY})`
          }}
        >
          <div className="absolute inset-0 bg-[#17181A] flex flex-col">
            <div className="h-20 p-4 bg-[#17181A] flex flex-col justify-end">
              <div className="text-right">
                <div className="text-[#818181] text-xs h-4 overflow-hidden mb-2">
                  {history}
                </div>
                <div className="text-gray-400 text-sm h-5 overflow-hidden mb-2">
                  {expression}
                </div>
                <div className="text-white text-2xl font-light overflow-hidden overflow-ellipsis">
                  {display}
                </div>
              </div>
            </div>

            <div className="flex-1 p-2 grid grid-cols-4 gap-1">
              {/* All your calculator buttons remain the same */}
              <button onClick={() => handleButtonClick('e')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">e</button>
              <button onClick={() => handleButtonClick('π')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">π</button>
              <button onClick={() => handleButtonClick('sin')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">sin</button>
              <button onClick={() => handleButtonClick('deg')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">deg</button>

              <button onClick={() => handleButtonClick('AC')} className="h-6 rounded-md bg-[#616161] text-[#A5A5A5] font-medium text-xs flex items-center justify-center">AC</button>
              <button onClick={() => handleButtonClick('Backspace')} className="h-6 rounded-md bg-[#616161] text-[#A5A5A5] font-medium text-xs flex items-center justify-center">⌫</button>
              <button onClick={() => handleButtonClick('/')} className="h-6 rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-xs flex items-center justify-center">/</button>
              <button onClick={() => handleButtonClick('*')} className="h-6 rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-xs flex items-center justify-center">*</button>

              <button onClick={() => handleButtonClick('7')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">7</button>
              <button onClick={() => handleButtonClick('8')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">8</button>
              <button onClick={() => handleButtonClick('9')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">9</button>
              <button onClick={() => handleButtonClick('-')} className="h-6 rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-xs flex items-center justify-center">-</button>

              <button onClick={() => handleButtonClick('4')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">4</button>
              <button onClick={() => handleButtonClick('5')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">5</button>
              <button onClick={() => handleButtonClick('6')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">6</button>
              <button onClick={() => handleButtonClick('+')} className="h-[42px] rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-xs flex items-center justify-center row-span-2">+</button>

              <button onClick={() => handleButtonClick('1')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">1</button>
              <button onClick={() => handleButtonClick('2')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">2</button>
              <button onClick={() => handleButtonClick('3')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">3</button>

              <button onClick={() => handleButtonClick('0')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center col-span-2">0</button>
              <button onClick={() => handleButtonClick('.')} className="h-6 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center">.</button>
              <button onClick={() => handleButtonClick('=')} className="h-[42px] rounded-md bg-[#1991FF] text-[#B2DAFF] font-medium text-xs flex items-center justify-center row-span-2 mt-[-12px]">=</button>
            </div>
          </div>
        </div>

        {/* Video Actions - Conditionally rendered */}
        {!hideReactionButtons && (
          <div 
            style={{
              transform: `translate(${actionsOffsetX}, ${actionsOffsetY})`
            }}
          >
            <VideoActions 
              onCommentClick={onCommentClick}
              likesCount={1200000}
              commentsCount={5514}
              sharesCount={1597}
            />
          </div>
        )}
      </div>

      {/* FreeTrialButton */}
      <div 
        style={{
          transform: `translate(${freeTrialOffsetX}, ${freeTrialOffsetY})`
        }}
      >
        <FreeTrialButton />
      </div>

      {/* VideoInfo - Conditionally rendered */}
      {!hideReactionButtons && (
        <VideoInfo
          profilePic="/assets/images/profile.jpg"
          name="Abebe Kebede"
          description="Calculator Simulation"
          hashtags={['#Physics', '#Newton\'s First Law']}
        />
      )}
    </div>
  )
}