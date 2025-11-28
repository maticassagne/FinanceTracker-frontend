"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUpRight, ArrowDownLeft } from "lucide-react";

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

export default function TransactionsPage() {
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => (await api.get("/transactions")).data,
  });

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
        <CardContent>
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
                <p className="text-gray-500 mb-4">No hay transacciones aún</p>
                <a href="/transactions/new" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Crear la primera transacción →
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
