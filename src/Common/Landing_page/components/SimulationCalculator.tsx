'use client'

import { useState } from 'react'
import VideoActions from './VideoActions'

interface SimulationCalculatorProps {
  calculatorOffsetY?: string
  calculatorOffsetX?: string
  actionsOffsetY?: string
  actionsOffsetX?: string
  isActive?: boolean
}

export default function SimulationCalculator({
  calculatorOffsetY = "0px",
  calculatorOffsetX = "0px",
  actionsOffsetY = "270px",
  actionsOffsetX = "100px",
  isActive = false,
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
      }
    } else {
      if (display === '0' || display === 'Error') {
        setDisplay(value)
      } else {
        setDisplay(display + value)
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-4 space-x-6">
      <div 
        className="relative w-72 h-[400px] bg-[#17181A] rounded-xl shadow-xl overflow-hidden"
        style={{
          transform: `translate(${calculatorOffsetX}, ${calculatorOffsetY})`
        }}
      >
        <div className="absolute inset-0 bg-[#17181A] flex flex-col">
          <div className="h-20 p-3 bg-[#17181A]">
            <div className="text-right">
              <div className="text-[#818181] text-xs h-5 overflow-hidden mb-1">
                {history}
              </div>
              <div className="text-gray-400 text-sm h-6 overflow-hidden">
                {expression}
              </div>
              <div className="text-white text-2xl font-light mt-1 overflow-hidden overflow-ellipsis">
                {display}
              </div>
            </div>
          </div>

          <div className="flex-1 p-2 grid grid-cols-4 gap-1">
            <button
              onClick={() => handleButtonClick('e')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center"
            >
              e
            </button>
            <button
              onClick={() => handleButtonClick('π')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center"
            >
              π
            </button>
            <button
              onClick={() => handleButtonClick('sin')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center"
            >
              sin
            </button>
            <button
              onClick={() => handleButtonClick('deg')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-xs flex items-center justify-center"
            >
              deg
            </button>

            <button
              onClick={() => handleButtonClick('AC')}
              className="h-7 rounded-md bg-[#616161] text-[#A5A5A5] font-medium text-xs flex items-center justify-center"
            >
              AC
            </button>
            <button
              onClick={() => handleButtonClick('Backspace')}
              className="h-7 rounded-md bg-[#616161] text-[#A5A5A5] font-medium text-xs flex items-center justify-center"
            >
              ⌫
            </button>
            <button
              onClick={() => handleButtonClick('/')}
              className="h-7 rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-sm flex items-center justify-center"
            >
              /
            </button>
            <button
              onClick={() => handleButtonClick('*')}
              className="h-7 rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-sm flex items-center justify-center"
            >
              *
            </button>

            <button
              onClick={() => handleButtonClick('7')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              7
            </button>
            <button
              onClick={() => handleButtonClick('8')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              8
            </button>
            <button
              onClick={() => handleButtonClick('9')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              9
            </button>
            <button
              onClick={() => handleButtonClick('-')}
              className="h-7 rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-sm flex items-center justify-center"
            >
              -
            </button>

            <button
              onClick={() => handleButtonClick('4')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              4
            </button>
            <button
              onClick={() => handleButtonClick('5')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              5
            </button>
            <button
              onClick={() => handleButtonClick('6')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              6
            </button>
            <button
              onClick={() => handleButtonClick('+')}
              className="h-[50px] rounded-md bg-[#005DB2] text-[#33BDFF] font-medium text-sm flex items-center justify-center row-span-2"
            >
              +
            </button>

            <button
              onClick={() => handleButtonClick('1')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              1
            </button>
            <button
              onClick={() => handleButtonClick('2')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              2
            </button>
            <button
              onClick={() => handleButtonClick('3')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              3
            </button>

            <button
              onClick={() => handleButtonClick('0')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center col-span-2"
            >
              0
            </button>
            <button
              onClick={() => handleButtonClick('.')}
              className="h-7 rounded-md bg-[#303136] text-[#29A8FF] font-medium text-sm flex items-center justify-center"
            >
              .
            </button>
            <button
              onClick={() => handleButtonClick('=')}
              className="h-[50px] rounded-md bg-[#1991FF] text-[#B2DAFF] font-medium text-sm flex items-center justify-center row-span-2 mt-[-16px]"
            >
              =
            </button>
          </div>
        </div>
      </div>

      <div 
        style={{
          transform: `translate(${actionsOffsetX}, ${actionsOffsetY})`
        }}
      >
        <VideoActions />
      </div>
    </div>
  )
}