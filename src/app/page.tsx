import Link from "next/link";
import { TrendingUp, Wallet, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <main className="space-y-16 py-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Gestiona tus Finanzas
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-blue-600">de forma simple</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Una herramienta minimalista para controlar tus ingresos, gastos y alcanzar tus metas financieras.</p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg">
              Ir al Dashboard
            </Link>
            <Link href="/transactions/new" className="px-8 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Nueva Transacción
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Wallet className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transacciones</h3>
            <p className="text-gray-600 text-sm">Registra y controla todos tus movimientos financieros en un solo lugar.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis</h3>
            <p className="text-gray-600 text-sm">Visualiza gráficos detallados sobre tus patrones de gasto e ingresos.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <TrendingUp className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Categorías</h3>
            <p className="text-gray-600 text-sm">Organiza tus gastos por categorías personalizadas para mejor control.</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">¿Listo para comenzar?</h2>
          <p className="text-gray-600 mb-6">Comienza a rastrear tu dinero hoy y toma mejores decisiones financieras.</p>
          <Link href="/dashboard" className="inline-block px-8 py-3 bg-linear-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            Acceder al Dashboard
          </Link>
        </section>
      </main>
    </div>
  );
}
