"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUpRight, ArrowDownLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
  isIncome: boolean;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

interface PaginatedResponse {
  data: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function TransactionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Filtros - búsqueda local y demorada
  const [filterSearchLocal, setFilterSearchLocal] = useState<string>("");
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [filterCategoryId, setFilterCategoryId] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterStartDateLocal, setFilterStartDateLocal] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDateLocal, setFilterEndDateLocal] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");

  // Debounce para la búsqueda (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterSearch(filterSearchLocal);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [filterSearchLocal]);

  // Debounce para las fechas (500ms delay - más tiempo para escribir fechas)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterStartDate(filterStartDateLocal);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterStartDateLocal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterEndDate(filterEndDateLocal);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterEndDateLocal]);

  const { data: response, isLoading } = useQuery<PaginatedResponse>({
    queryKey: ["transactions", page, limit, filterSearch, filterCategoryId, filterType, filterStartDate, filterEndDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (filterSearch) params.append("search", filterSearch);
      if (filterCategoryId) params.append("categoryId", filterCategoryId);
      if (filterType) params.append("type", filterType);
      if (filterStartDate) params.append("startDate", filterStartDate);
      if (filterEndDate) params.append("endDate", filterEndDate);

      return (await api.get(`/transactions?${params}`)).data;
    },
  });

  const transactions = response?.data || [];
  const pagination = response?.pagination;

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => (await api.get("/categories")).data,
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState<string>("");

  const createTransaction = useMutation({
    mutationFn: async () => {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      await api.post("/transactions", {
        description,
        amount: Number(amount),
        categoryId: Number(categoryId),
        date: formattedDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setDescription("");
      setAmount("");
      setCategoryId("");
      setDate("");
      setPage(1); // Resetear a primera página
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleResetFilters = () => {
    setFilterSearchLocal("");
    setFilterSearch("");
    setFilterCategoryId("");
    setFilterType("");
    setFilterStartDateLocal("");
    setFilterStartDate("");
    setFilterEndDateLocal("");
    setFilterEndDate("");
    setPage(1);
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transacciones</h1>
        <p className="text-gray-500 text-sm mt-1">Gestiona tus movimientos financieros</p>
      </div>

      {/* Formulario para crear transacción */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            Nueva Transacción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!description || !amount || !categoryId || !date) return;
              createTransaction.mutate();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: Compra supermercado" required />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Monto</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0.00" step="0.01" required />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                <option value="">Seleccionar</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.isIncome ? "(+)" : "(-)"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>

            <div className="flex flex-col justify-end">
              <button type="submit" disabled={createTransaction.isPending} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50">
                Agregar
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tabla de transacciones */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de transacciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pb-4 border-b border-gray-200">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">Buscar</label>
              <input type="text" value={filterSearchLocal} onChange={(e) => setFilterSearchLocal(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: Compra..." />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">Tipo</label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Todos</option>
                <option value="income">Ingresos</option>
                <option value="expense">Gastos</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">Categoría</label>
              <select
                value={filterCategoryId}
                onChange={(e) => {
                  setFilterCategoryId(e.target.value);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Todas</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">Desde</label>
              <input
                type="date"
                value={filterStartDateLocal}
                onChange={(e) => {
                  setFilterStartDateLocal(e.target.value);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">Hasta</label>
              <input
                type="date"
                value={filterEndDateLocal}
                onChange={(e) => {
                  setFilterEndDateLocal(e.target.value);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button onClick={handleResetFilters} className="text-sm px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Limpiar filtros
              </button>
            </div>
          </div>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  <th className="pb-3 px-4">Descripción</th>
                  <th className="pb-3 px-4 text-right">Monto</th>
                  <th className="pb-3 px-4">Categoría</th>
                  <th className="pb-3 px-4">Fecha</th>
                  <th className="pb-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((t) => (
                  <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${t.category.isIncome ? "bg-green-100" : "bg-red-100"}`}>{t.category.isIncome ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowUpRight className="w-4 h-4 text-red-600" />}</div>
                        <span className="font-medium text-gray-900">{t.description}</span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 font-semibold text-right ${t.category.isIncome ? "text-green-600" : "text-red-600"}`}>
                      {t.category.isIncome ? "+" : "-"}${t.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{t.category.name}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {(() => {
                        const [year, month, day] = t.date.split("-").map(Number);
                        const localDate = new Date(year, month - 1, day);
                        return localDate.toLocaleDateString("es-AR");
                      })()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => deleteTransaction.mutate(t.id)} disabled={deleteTransaction.isPending} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!transactions || transactions.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">{pagination?.total === 0 ? "No hay transacciones aún" : "No se encontraron resultados"}</p>
              </div>
            )}

            {/* Paginación */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Mostrando {(page - 1) * limit + 1} a {Math.min(page * limit, pagination.total)} de {pagination.total} transacciones
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1 || isLoading} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Página anterior">
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => setPage(p)} disabled={isLoading} className={`px-3 py-2 rounded-lg transition-colors text-sm ${p === page ? "bg-emerald-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}>
                        {p}
                      </button>
                    ))}
                  </div>

                  <button onClick={() => setPage(Math.min(pagination.pages, page + 1))} disabled={page === pagination.pages || isLoading} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Página siguiente">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
