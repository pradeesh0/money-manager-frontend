export default function Header({ onAdd }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Money Manager</h1>
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition shadow"
      >
        + Add
      </button>
    </div>
  );
}
