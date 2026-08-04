"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Customer } from "@/lib/types";

type CustomerSelectorProps = {
  onSelect?: (customer: Customer) => void;
  placeholder?: string;
};

export function CustomerSelector({
  onSelect,
  placeholder = "Search customers",
}: CustomerSelectorProps) {
  const inputId = useId();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCustomer = useMemo(
    () => customers[activeIndex],
    [activeIndex, customers],
  );

  useEffect(() => {
    const controller = new AbortController();
    const search = query.trim();

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = search
          ? `?name=${encodeURIComponent(search)}`
          : "";
        const response = await fetch(`/api/customers${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load customers");
        }

        const data = (await response.json()) as Customer[];
        setCustomers(data);
        setActiveIndex(data.length ? 0 : -1);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setCustomers([]);
        setActiveIndex(-1);
        setError("Could not load customers");
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

  function selectCustomer(customer: Customer) {
    setSelectedCustomer(customer);
    setQuery(customer.name);
    setIsOpen(false);
    onSelect?.(customer);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
      >
        Customer
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
          activeCustomer ? `${listboxId}-${activeCustomer.id}` : undefined
        }
        className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-300 dark:focus:ring-zinc-800"
        onChange={(event) => {
          setQuery(event.target.value);
          setSelectedCustomer(null);
          setIsOpen(true);
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
              customers.length ? (index + 1) % customers.length : -1,
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) =>
              customers.length
                ? (index - 1 + customers.length) % customers.length
                : -1,
            );
          }

          if (event.key === "Enter" && activeCustomer) {
            event.preventDefault();
            selectCustomer(activeCustomer);
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
          ) : customers.length ? (
            customers.map((customer, index) => (
              <button
                id={`${listboxId}-${customer.id}`}
                key={customer.id}
                type="button"
                role="option"
                aria-selected={selectedCustomer?.id === customer.id}
                className={`grid w-full gap-1 px-3 py-2 text-left text-sm transition ${
                  index === activeIndex
                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectCustomer(customer)}
              >
                <span className="font-medium">{customer.name}</span>
                <span className="truncate text-xs text-zinc-500">
                  {customer.address}
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-zinc-500">
              No customers found
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
