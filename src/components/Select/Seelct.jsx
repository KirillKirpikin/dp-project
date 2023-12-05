import React, { useState } from 'react';
import { ReactComponent as SettingsSvg } from '../../img/settings.svg';

const Select = ({ arr, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center justify-between border border-black bg-white rounded-md shadow-md h-14 overflow-hidden cursor-pointer`}
        onClick={() => setIsActive(!isActive)}
      >
        <span className="px-4">{selected}</span>
        <SettingsSvg className='fill-[#8DA5FC]'/>
      </div>

      {isActive && (
        <div className="absolute top-full left-0 w-full z-10 border border-black bg-white rounded-b-md shadow-md">
          {arr &&
            arr.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsActive(!isActive);
                }}
                className="px-4 py-2 cursor-pointer transition-all duration-200 hover:underline"
              >
                {option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Select);