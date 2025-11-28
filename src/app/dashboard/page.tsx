"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { api } from "../../lib/axios";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface CategoryStat {
  category: string;
  total: number;
  type: "income" | "expense";
}

interface DateRange {
  from?: Date | null;
  to?: Date | null;
}

const COLORS = ["#10b981", "#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function DashboardPage() {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth,
    to: today,
  });

  const { data: summary, isLoading: loadingSummary } = useQuery<Summary>({
    queryKey: ["summary", dateRange],
    queryFn: async () => {
      const from = dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined;
      const to = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

      const res = await api.get("/stats/summary", { params: { from, to } });
      return res.data;
    },
  });

  const { data: categories, isLoading: loadingCategories } = useQuery<CategoryStat[]>({
    queryKey: ["categories", dateRange],
    queryFn: async () => {
      const from = dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined;
      const to = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

      const res = await api.get("/stats/categories", { params: { from, to } });
      return res.data;
    },
  });

  const isLoading = loadingSummary || loadingCategories;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Resumen de tus finanzas</p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}

      {!isLoading && summary && (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Ingresos */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-600">Ingresos</CardTitle>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">${summary.totalIncome.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Dinero ingresado</p>
              </CardContent>
            </Card>

            {/* Gastos */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-600">Gastos</CardTitle>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">${summary.totalExpense.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Dinero gastado</p>
              </CardContent>
            </Card>

            {/* Balance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-600">Balance</CardTitle>
                  <div className={`p-2 rounded-lg ${summary.balance >= 0 ? "bg-emerald-100" : "bg-orange-100"}`}>
                    <Wallet className={`w-5 h-5 ${summary.balance >= 0 ? "text-emerald-600" : "text-orange-600"}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold ${summary.balance >= 0 ? "text-emerald-600" : "text-orange-600"}`}>${summary.balance.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Saldo neto</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          {categories && categories.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Movimientos por categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categories}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="category" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                      <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                      <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px" }} formatter={(value) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de movimientos</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categories} dataKey="total" nameKey="category" outerRadius={100} label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}>
                        {categories.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty state */}
          {(!categories || categories.length === 0) && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500 mb-4">No hay transacciones para el período seleccionado</p>
                <a href="/transactions/new" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Crear transacción
                </a>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
