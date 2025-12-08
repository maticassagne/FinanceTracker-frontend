"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface Props {
  value?: DateRange;
  onChange: (range: DateRange) => void;
}

/**
 * Selector de rango de fechas minimalista y moderno
 */
export function DateRangePicker({ value, onChange }: Props) {
  const [localRange, setLocalRange] = useState<DateRange>({
    from: value?.from ?? null,
    to: value?.to ?? null,
  });

  useEffect(() => {
    if (value) {
      setLocalRange({
        from: value.from ?? null,
        to: value.to ?? null,
      });
    }
  }, [value]);

  // Agregar estilos personalizados solo en el cliente
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .react-datepicker {
        font-family: inherit;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .react-datepicker__header {
        background-color: #10b981;
        border-bottom: none;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }

      .react-datepicker__month {
        margin: 0.5rem;
      }

      .react-datepicker__day {
        color: #374151;
        border-radius: 0.375rem;
        margin: 0.2rem;
      }

      .react-datepicker__day:hover {
        background-color: #d1fae5;
      }

      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background-color: #10b981;
        color: white;
      }

      .react-datepicker__day--in-range {
        background-color: #d1fae5;
        color: #374151;
      }

      .react-datepicker__day--start-date,
      .react-datepicker__day--end-date {
        background-color: #10b981;
        color: white;
      }

      .react-datepicker__input-container input {
        font-size: 0.875rem;
      }

      @media (prefers-color-scheme: dark) {
        .react-datepicker {
          background-color: #1f2937;
          color: #f3f4f6;
        }

        .react-datepicker__header {
          background-color: #059669;
        }

        .react-datepicker__day {
          color: #f3f4f6;
        }

        .react-datepicker__day--in-range {
          background-color: rgba(16, 185, 129, 0.2);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChangeFrom = (date: Date | null) => {
    const updated = { ...localRange, from: date };
    setLocalRange(updated);
    onChange(updated);
  };

  const handleChangeTo = (date: Date | null) => {
    const updated = { ...localRange, to: date };
    setLocalRange(updated);
    onChange(updated);
  };

  return (
    <div className="flex gap-3 items-center flex-wrap sm:flex-nowrap">
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <DatePicker
          selected={localRange.from ?? undefined}
          onChange={handleChangeFrom}
          selectsStart
          startDate={localRange.from ?? undefined}
          endDate={localRange.to ?? undefined}
          placeholderText="Desde"
          dateFormat="dd/MM/yyyy"
          className="border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <span className="text-gray-400">→</span>

      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <DatePicker
          selected={localRange.to ?? undefined}
          onChange={handleChangeTo}
          selectsEnd
          startDate={localRange.from ?? undefined}
          endDate={localRange.to ?? undefined}
          minDate={localRange.from ?? undefined}
          placeholderText="Hasta"
          dateFormat="dd/MM/yyyy"
          className="border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
