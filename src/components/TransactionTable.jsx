export default function TransactionTable({ data, onEdit }) {
  const canEdit = (date) =>
    (Date.now() - new Date(date).getTime()) / 3600000 <= 12;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">Transaction History</h2>
        <span className="text-xs text-gray-400">{data.length} records</span>
      </div>

      <div className="overflow-x-auto max-h-[420px] rounded-lg border">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-gray-600 text-xs uppercase">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t, i) => (
              <tr
                key={t.id}
                className={`border-b transition hover:bg-gray-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <td className="p-3 text-gray-600">
                  {new Date(t.createdAt).toLocaleString()}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.type === "INCOME"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="p-3 font-medium text-gray-700">
                  {t.category}
                </td>

                <td className="p-3 text-right font-semibold">
                  ₹{t.amount.toLocaleString()}
                </td>

                <td className="p-3 text-center">
                  {canEdit(t.createdAt) ? (
                    <button
                      onClick={() => onEdit(t)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                    >
                      Edit
                    </button>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
