import { useState, useEffect } from "react";

export default function AddTransactionalModal({ transaction, onClose, onSave }) {
  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: "",
    category: "",
    division: "PERSONAL",
    description: "",
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        division: transaction.division,
        description: transaction.description,
      });
    }
  }, [transaction]);

  const handleSave = () => {
    if (!form.amount || !form.type || !form.category) {
      alert("Please fill all required fields");
      return;
    }
    onSave({
      ...form,
      amount: Number(form.amount),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="font-semibold text-lg mb-4">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400">Type</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400">Amount</label>
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Category</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Division</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              value={form.division}
              onChange={(e) => setForm({ ...form, division: e.target.value })}
            >
              <option value="PERSONAL">PERSONAL</option>
              <option value="OFFICE">OFFICE</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400">Description</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {transaction ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
