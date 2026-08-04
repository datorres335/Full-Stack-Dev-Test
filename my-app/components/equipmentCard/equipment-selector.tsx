"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Equipment } from "@/lib/types";

type EquipmentSelectorProps = {
  onSelect?: (equipment: Equipment | null) => void;
  placeholder?: string;
};

export function EquipmentSelector({
  onSelect,
  placeholder = "Search equipment",
}: EquipmentSelectorProps) {
  const inputId = useId();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [allEquipment, setAllEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null); // to check if a user's mouse click happened outside of this specific HTML element so it can automatically close the dropdown dropdown box (setIsOpen(false)).
    // HTMLDivElement is a built-in TypeScript utility type. It represents the exact data structure and properties of a native HTML <div> element in the browser DOM.

  const activeEquipment = useMemo(
    () => allEquipment[activeIndex],
    [activeIndex, allEquipment],
  );

  useEffect(() => {
    const controller = new AbortController(); //An AbortController is a native web browser API used to cancel asynchronous requests (like fetch) before they naturally finish completing.
    const search = query.trim();

    const timeout = window.setTimeout(async () => { //  "window" represents the browser's window containing the DOM document. It is a globally accessible object provided by the web browser environment, not by JavaScript itself or React.
      try {
        setIsLoading(true);
        setError(null);

        const params = search
          ? `?name=${encodeURIComponent(search)}` // encodeURIComponent() is a global JavaScript function that converts strings into a safe format that can be embedded directly inside a URL query string.
          : "";
        const response = await fetch(`/api/equipment${params}`, {
          signal: controller.signal, // If a user types "Dav" quickly, the component fires a search request for "D", then "Da", then "Dav". Without an abort controller, those 3 separate API requests would fight to finish, wasting network bandwidth and potentially displaying the wrong search results if they finish out of order. Here, controller.abort() kills the previous API fetch instantly the millisecond the user types a new character.
        });

        if (!response.ok) {
          throw new Error("Could not load equipment");
        }

        const data = (await response.json()) as Equipment[];
        setAllEquipment(data);
        setActiveIndex(data.length ? 0 : -1);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setAllEquipment([]);
        setActiveIndex(-1);
        setError("Could not load equipment");
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectEquipment(equipment: Equipment) {
    setSelectedEquipment(equipment);
    setQuery(equipment.name);
    setIsOpen(false);
    onSelect?.(equipment);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
      >
        Equipment
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        placeholder={placeholder}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-activedescendant={
          activeEquipment ? `${listboxId}-${activeEquipment.id}` : undefined
        }
        className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-300 dark:focus:ring-zinc-800"
        onChange={(event) => {
          setQuery(event.target.value);
          setSelectedEquipment(null);
          setIsOpen(true);
          onSelect?.(null);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (!isOpen && ["ArrowDown", "ArrowUp"].includes(event.key)) {
            setIsOpen(true);
            return;
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) =>
              allEquipment.length ? (index + 1) % allEquipment.length : -1,
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) =>
              allEquipment.length
                ? (index - 1 + allEquipment.length) % allEquipment.length
                : -1,
            );
          }

          if (event.key === "Enter" && activeEquipment) {
            event.preventDefault();
            selectEquipment(activeEquipment);
          }

          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
      />

      {isOpen ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-zinc-500">Loading...</div>
          ) : error ? (
            <div className="px-3 py-2 text-sm text-red-600">{error}</div>
          ) : allEquipment.length ? (
            allEquipment.map((equipment, index) => (
              <button
                id={`${listboxId}-${equipment.id}`}
                key={equipment.id}
                type="button"
                role="option"
                aria-selected={selectedEquipment?.id === equipment.id}
                className={`grid w-full gap-1 px-3 py-2 text-left text-sm transition ${
                  index === activeIndex
                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectEquipment(equipment)}
              >
                <span className="font-medium">{equipment.name}</span>
                <span className="truncate text-xs text-zinc-500">
                  {equipment.category}
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-zinc-500">
              No equipment found
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
