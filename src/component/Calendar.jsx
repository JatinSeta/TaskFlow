import { useState } from "react";
import { DayPicker } from '@daypicker/react';

export function Calendar() {
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="bg-white border border-[#EAE7F2] rounded-2xl p-4 w-fit shadow-sm flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-[#241B42] mb-3 text-center">
        Calendar
      </h2>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        animate
        className="text-[#241B42] self-center "
      
      />
    </div>
  );
}