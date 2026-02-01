import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartSection({ data }) {
  const total = data?.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Expense Analytics
          </h2>
          <p className="text-xs text-gray-500">
            Category wise spending overview
          </p>
        </div>

        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-right">
          <p className="text-xs uppercase">Total</p>
          <p className="text-xl font-bold">
            ₹ {total?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px] bg-gray-50 rounded-2xl p-4 border">
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap={20}>

            {/* Gradient Colors */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#374151", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#374151", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.1)" }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="amount"
              fill="url(#barGradient)"
              radius={[12, 12, 0, 0]}
              barSize={36}
              onMouseOver={(e) => (e.fill = "url(#barGradientHover)")}
              onMouseOut={(e) => (e.fill = "url(#barGradient)")}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
