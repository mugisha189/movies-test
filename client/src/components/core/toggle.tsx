import React, { useState } from 'react'

interface ToggleProps {
  initialState?: boolean
  onToggle?: (newState: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState)

  const handleToggle = (): void => {
    const newState = !isOn
    setIsOn(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }

  return (
    <div className="inline-block cursor-pointer" onClick={handleToggle}>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${!isOn ? 'bg-myRed' : 'bg-myBlue'}`}
      >
        <div
          className={`bg-background w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
        ></div>
      </div>
    </div>
  )
}

export default Toggle
