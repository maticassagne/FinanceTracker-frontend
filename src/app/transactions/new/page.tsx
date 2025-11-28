"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  amount: z.number().positive("El monto debe ser positivo"),
  categoryId: z.number().int("Debes seleccionar una categoría"),
  date: z.string().min(1, "La fecha es requerida"),
});

type FormData = z.infer<typeof schema>;

export default function NewTransactionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.post("/transactions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push("/transactions");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { date: new Date().toISOString().split("T")[0] },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/transactions">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Transacción</h1>
          <p className="text-gray-500 text-sm mt-1">Registra un nuevo movimiento financiero</p>
        </div>
      </div>

      {/* Formulario */}
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Descripción */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Descripción</label>
                <input {...register("description")} placeholder="Ej: Compra en el supermercado" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
              </div>

              {/* Monto */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Monto</label>
                <input type="number" step="0.01" placeholder="0.00" {...register("amount", { valueAsNumber: true })} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>}
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Categoría</label>
                <select {...register("categoryId", { valueAsNumber: true })} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                  <option value="">Selecciona una categoría</option>
                  {categories?.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.isIncome ? "(Ingreso)" : "(Gasto)"}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-600 text-sm mt-1">{errors.categoryId.message}</p>}
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Fecha</label>
                <input type="date" {...register("date")} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-6">
                <button type="submit" disabled={mutation.isPending} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50">
                  {mutation.isPending ? "Guardando..." : "Guardar Transacción"}
                </button>
                <Link href="/transactions" className="flex-1">
                  <button type="button" className="w-full border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Cancelar
                  </button>
                </Link>
              </div>

              {mutation.isError && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">Error al guardar la transacción. Intenta nuevamente.</div>}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
