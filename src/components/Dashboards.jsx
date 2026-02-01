import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function Dashboards({ summary }) {

  const cards = [
    {
      label: "Income",
      value: summary.income,
      icon: <TrendingUp size={22} />,
      gradient: "from-green-500 to-emerald-400",
      text: "text-green-600",
    },
    {
      label: "Expenses",
      value: summary.expense,
      icon: <TrendingDown size={22} />,
      gradient: "from-red-500 to-rose-400",
      text: "text-red-600",
    },
    {
      label: "Balance",
      value: summary.income - summary.expense,
      icon: <Wallet size={22} />,
      gradient: "from-blue-500 to-sky-400",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="relative rounded-2xl p-5 shadow-lg bg-white hover:shadow-xl transition transform hover:-translate-y-1"
        >
          {/* Glow */}
          <div
            className={`absolute inset-0 rounded-2xl blur-xl opacity-20 bg-gradient-to-br ${c.gradient}`}
          />

          {/* Content */}
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">{c.label}</p>
              <h2 className={`text-3xl font-bold mt-1 ${c.text}`}>
                ₹ {c.value.toLocaleString()}
              </h2>
            </div>

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${c.gradient}`}
            >
              {c.icon}
            </div>
          </div>

          {/* Footer */}
          <p className="mt-4 text-xs text-gray-400">
            Updated just now
          </p>
        </div>
      ))}
    </div>
  );
}
