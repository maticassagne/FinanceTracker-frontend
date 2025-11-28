"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Tag } from "lucide-react";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [isIncome, setIsIncome] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get("/categories")).data,
  });

  const createCategory = useMutation({
    mutationFn: async () => api.post("/categories", { name, isIncome }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setName("");
      setIsIncome(false);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: number) => api.delete(`/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
        <p className="text-gray-500 text-sm mt-1">Organiza tus transacciones por categorías personalizadas</p>
      </div>

      {/* Formulario para crear categoría */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            Nueva Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) createCategory.mutate();
            }}
            className="flex flex-col sm:flex-row gap-4 items-end"
          >
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Alimentos, Transporte, Salario..." className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isIncome} onChange={() => setIsIncome(!isIncome)} className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Es ingreso</span>
            </label>

            <button type="submit" disabled={createCategory.isPending} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50">
              Agregar
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Tabla de categorías */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gastos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Categorías de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories
                ?.filter((c: any) => !c.isIncome)
                .map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Tag className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                    <button onClick={() => deleteCategory.mutate(c.id)} disabled={deleteCategory.isPending} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              {!categories?.some((c: any) => !c.isIncome) && <p className="text-gray-500 text-sm text-center py-4">No hay categorías de gastos</p>}
            </div>
          </CardContent>
        </Card>

        {/* Ingresos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Categorías de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories
                ?.filter((c: any) => c.isIncome)
                .map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Tag className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                    <button onClick={() => deleteCategory.mutate(c.id)} disabled={deleteCategory.isPending} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              {!categories?.some((c: any) => c.isIncome) && <p className="text-gray-500 text-sm text-center py-4">No hay categorías de ingresos</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
