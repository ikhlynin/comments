import React from "react";
import { SortingProps, SORT_FIELDS } from "../types/types";
import "../styles/Sorting.scss";

const Sorting: React.FC<SortingProps> = ({ sortBy, order, onSort }) => (
  <div className="sorting-controls">
    {SORT_FIELDS.map((field) => (
      <button
        key={field.value}
        className={`sorting-btn${sortBy === field.value ? " active" : ""}`}
        onClick={() => onSort(field.value)}
        type="button"
      >
        {field.label}
        {sortBy === field.value ? (order === "asc" ? " ▲" : " ▼") : ""}
      </button>
    ))}
  </div>
);

export default Sorting;
