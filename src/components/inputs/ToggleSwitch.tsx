"use client";
import { FC } from "react";

type ToggleSwitchProps = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  disabled?: boolean;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({ isChecked, setIsChecked, disabled }) => {

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input disabled={disabled} onChange={() => setIsChecked(!isChecked)} type="checkbox" checked={isChecked} className="sr-only peer"/>
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563EB50] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600 peer-disabled:bg-gray-200"></div>
    </label>
  );
};

export default ToggleSwitch;
