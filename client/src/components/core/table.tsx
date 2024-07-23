/* eslint-disable @typescript-eslint/no-explicit-any */
// Table.tsx
import React, { useState } from "react";

type ColumnDefinition<T> = {
  header: string;
  sortable?: boolean;
  sortFunction?: (a: T, b: T) => number;
  accessor: (data: T) => React.ReactNode;
};

type Filter<T> = {
  name: string;
  filterFunction: (item: T) => boolean;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  loading?: boolean;
  filters?: Filter<T>[];
  noDataComponent?: React.ReactNode;
};

const Table = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  filters = [],
  noDataComponent = <div className="py-2 text-center">No data available.</div>,
}: TableProps<T>) => {
  const [sortBy, setSortBy] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filters.length > 0 ? filters[0].name : ""
  );

  const handleSort = (index: number) => {
    if (sortBy === index) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(index);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (filterName: string) => {
    setSelectedFilter(filterName);
  };

  let filteredData = data;
  if (selectedFilter) {
    const selectedFilterFunction = filters.find(
      (filter) => filter.name === selectedFilter
    )?.filterFunction;
    if (selectedFilterFunction) {
      filteredData = data.filter(selectedFilterFunction);
    }
  }

  const sortedData =
    sortBy !== null
      ? [...filteredData].sort((a, b) => {
          const sortFunction = columns[sortBy].sortFunction;
          if (sortFunction) {
            return sortOrder === "asc"
              ? sortFunction(a, b)
              : sortFunction(b, a);
          }
          return 0;
        })
      : filteredData;

  return (
    <div className="w-full text-sm">
      <div className="flex justify-end items-center mb-3">
        {filters.length > 0 && (
          <select
            className="px-4 py-2 bg-white border rounded-md"
            onChange={(e) => handleFilterChange(e.target.value)}
            value={selectedFilter}
          >
            {filters.map((filter, index) => (
              <option key={index} value={filter.name}>
                {filter.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {loading ? (
        <table className="w-full  ">
          <thead>
            <tr className="">
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.sortable && handleSort(index)}
                  className={`text-left p-2 cursor-pointer  uppercase px-5  text-gray-600 ${
                    column.sortable ? "font-bold" : "font-semibold"
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index} className="">
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="p-2  border-b">
                    <div className="h-7 bg-gray-50 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : sortedData.length === 0 ? (
        noDataComponent
      ) : (
        <table className="w-full ">
          <thead>
            <tr className="">
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.sortable && handleSort(index)}
                  className={`text-left p-2 cursor-pointer  uppercase px-5  text-gray-600 ${
                    column.sortable ? "font-bold" : "font-semibold"
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-2 px-4">
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
