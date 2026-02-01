import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import Dashboards from "../components/Dashboards";
import ChartSection from "../components/ChartSection";
import TransactionTable from "../components/TransactionTable";
import AddTransactionalModal from "../components/AddTransactionalModal";
import {
  getTransactions,
  getFiltered,
  getBetween,
  addTransaction,
  updateTransaction,
} from "../services/api";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    period: "",
    category: "",
    division: "",
    from: "",
    to: "",
  });

  const formatDateForBackend = (date, endOfDay = false) => {
    if (!date) return null;
    return endOfDay ? `${date}T23:59:59` : `${date}T00:00:00`;
  };

  const getPeriodRange = (period) => {
    const now = new Date();
    let from = new Date();

    if (period === "WEEK") from.setDate(now.getDate() - 7);
    if (period === "MONTH") from.setMonth(now.getMonth() - 1);
    if (period === "YEAR") from.setFullYear(now.getFullYear() - 1);

    const start = from.toISOString().slice(0, 10);
    const end = now.toISOString().slice(0, 10);

    return { start, end };
  };

  const fetchData = useCallback(async () => {
    let res;
    const hasRange = filters.from && filters.to;
    const hasCategoryOrDivision = filters.category || filters.division;
    const hasPeriod = filters.period && !hasRange;

    try {
      if (hasRange) {
        res = await getBetween({
          start: formatDateForBackend(filters.from),
          end: formatDateForBackend(filters.to, true),
          category: filters.category || undefined,
          division: filters.division || undefined,
          page,
          size: 10,
        });
      } else if (hasPeriod) {
        const { start, end } = getPeriodRange(filters.period);
        res = await getBetween({
          start: formatDateForBackend(start),
          end: formatDateForBackend(end, true),
          category: filters.category || undefined,
          division: filters.division || undefined,
          page,
          size: 10,
        });
      } else if (hasCategoryOrDivision) {
        res = await getFiltered({
          category: filters.category || undefined,
          division: filters.division || undefined,
          page,
          size: 10,
        });
      } else {
        res = await getTransactions({ page, size: 10 });
      }

      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transactions");
    }
  }, [filters, page]);

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const handlePeriodChange = (period) => {
    setFilters((prev) => ({
      ...prev,
      period,
      from: "",
      to: "",
    }));
  };

  const summary = {
    income: data.filter((d) => d.type === "INCOME").reduce((a, b) => a + b.amount, 0),
    expense: data.filter((d) => d.type === "EXPENSE").reduce((a, b) => a + b.amount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header onAdd={() => setOpen(true)} />

      <Filters filters={filters} setFilters={setFilters} onApplyRange={fetchData} />

      <Dashboards summary={summary} />

      <TransactionTable
        data={data}
        onEdit={(tx) => {
          setEditingTransaction(tx);
          setOpen(true);
        }}
      />

       <ChartSection
        data={Object.values(
          data.reduce((acc, t) => {
            acc[t.category] = acc[t.category] || { name: t.category, amount: 0 };
            acc[t.category].amount += t.amount;
            return acc;
          }, {})
        )}
      />

      <div className="flex justify-center gap-4 mt-4">
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button disabled={page + 1 === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

      {open && (
        <AddTransactionalModal
          transaction={editingTransaction}
          onClose={() => {
            setOpen(false);
            setEditingTransaction(null);
          }}
          onSave={(tx) => {
            if (editingTransaction) {
              updateTransaction(editingTransaction.id, tx)
                .then(() => {
                  setOpen(false);
                  setEditingTransaction(null);
                  fetchData();
                })
                .catch((err) =>
                  alert(err.response?.data?.message || err.message)
                );
            } else {
              addTransaction(tx)
                .then(() => {
                  setOpen(false);
                  fetchData();
                })
                .catch((err) =>
                  alert(err.response?.data?.message || err.message)
                );
            }
          }}
        />
      )}
    </div>
  );
}
