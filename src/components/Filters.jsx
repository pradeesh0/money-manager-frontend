export default function Filters({ filters, setFilters, onApplyRange }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-4">

      {/* QUICK FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* Period */}
        <select
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={filters.period}
          onChange={(e) =>
            setFilters({
              ...filters,
              period: e.target.value,
              from: "",
              to: ""
            })
          }
        >
          <option value="MONTH">Monthly</option>
          <option value="WEEK">Weekly</option>
          <option value="YEAR">Yearly</option>
        </select>

        {/* Division */}
        <select
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={filters.division}
          onChange={(e) =>
            setFilters({ ...filters, division: e.target.value })
          }
        >
          <option value="">All Divisions</option>
          <option value="OFFICE">Office</option>
          <option value="PERSONAL">Personal</option>
        </select>

        {/* Category */}
        <select
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="Fuel">Fuel</option>
          <option value="Food">Food</option>
          <option value="Movie">Movie</option>
          <option value="Medical">Medical</option>
          <option value="Loan">Loan</option>
        </select>
      </div>

      {/* DATE RANGE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <input
          type="date"
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={filters.from || ""}
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="date"
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={filters.to || ""}
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />

        <button
          className="h-[42px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={onApplyRange}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
