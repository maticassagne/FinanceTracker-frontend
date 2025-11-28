import * as React from "react";

// Ejemplos de uso de componentes UI reutilizables

/**
 * EJEMPLO 1: Usando Card
 */
export function CardExample() {
  return (
    <div className="space-y-4">
      {/* Card básica */}
      <div className="rounded-xl shadow-sm border border-gray-200 bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Título de Card</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600">Este es el contenido de la tarjeta.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * EJEMPLO 2: Usando Button con variantes
 */
export function ButtonExamples() {
  return (
    <div className="flex gap-3 flex-wrap">
      {/* Primary */}
      <button className="font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center justify-center gap-2 px-4 py-2 text-base bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500">Primary Button</button>

      {/* Secondary */}
      <button className="font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center justify-center gap-2 px-4 py-2 text-base bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400">Secondary Button</button>

      {/* Ghost */}
      <button className="font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center justify-center gap-2 px-4 py-2 text-base text-gray-700 hover:bg-gray-100 focus:ring-gray-300">Ghost Button</button>

      {/* Danger */}
      <button className="font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center justify-center gap-2 px-4 py-2 text-base bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">Danger Button</button>
    </div>
  );
}

/**
 * EJEMPLO 3: Usando Input con validación
 */
export function InputExample() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleValidate = () => {
    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
      <div className="relative">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleValidate}
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${error ? "border-red-500" : "border-gray-200"}`}
          placeholder="tu@email.com"
        />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

/**
 * EJEMPLO 4: Usando Alert
 */
export function AlertExample() {
  return (
    <div className="space-y-3">
      {/* Info Alert */}
      <div className="bg-blue-50 border-blue-200 border rounded-lg p-4 flex gap-3">
        <span>ℹ️</span>
        <div>
          <p className="text-blue-900 font-semibold text-sm mb-1">Información</p>
          <p className="text-blue-700 text-sm">Este es un mensaje informativo.</p>
        </div>
      </div>

      {/* Success Alert */}
      <div className="bg-green-50 border-green-200 border rounded-lg p-4 flex gap-3">
        <span>✅</span>
        <div>
          <p className="text-green-900 font-semibold text-sm mb-1">Éxito</p>
          <p className="text-green-700 text-sm">Cambios guardados correctamente.</p>
        </div>
      </div>

      {/* Error Alert */}
      <div className="bg-red-50 border-red-200 border rounded-lg p-4 flex gap-3">
        <span>❌</span>
        <div>
          <p className="text-red-900 font-semibold text-sm mb-1">Error</p>
          <p className="text-red-700 text-sm">Hubo un problema al procesar tu solicitud.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * EJEMPLO 5: Form completo
 */
export function FormExample() {
  return (
    <div className="rounded-xl shadow-sm border border-gray-200 bg-white p-6 max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Contacto</h2>

      <form className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
          <input type="text" placeholder="Juan Pérez" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" placeholder="juan@ejemplo.com" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
          <textarea placeholder="Escribe tu mensaje..." rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">Enviar</button>
          <button type="button" className="flex-1 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * EJEMPLO 6: Grid de tarjetas (como en Dashboard)
 */
export function DashboardCardsExample() {
  const cards = [
    { title: "Ingresos", value: "$5,000", icon: "📈", color: "bg-green-100" },
    { title: "Gastos", value: "$2,500", icon: "📉", color: "bg-red-100" },
    { title: "Balance", value: "$2,500", icon: "💰", color: "bg-emerald-100" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title} className="rounded-xl shadow-sm border border-gray-200 bg-white">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 text-base font-semibold">{card.title}</h3>
              <div className={`p-2 rounded-lg ${card.color}`}>{card.icon}</div>
            </div>
          </div>
          <div className="px-6 py-4">
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-2">Resumen del período</p>
          </div>
        </div>
      ))}
    </div>
  );
}
