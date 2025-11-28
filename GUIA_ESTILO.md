# 🎨 Guía de Estilo CSS - Finance Tracker

## Paleta de Colores

### Colores Principales

```css
:root {
  /* Primarios */
  --color-emerald-600: #10b981; /* CTA, Éxito */
  --color-emerald-700: #059669; /* Hover */
  --color-emerald-100: #d1fae5; /* Fondo claro */

  /* Status */
  --color-green-600: #16a34a; /* Ingresos */
  --color-red-600: #ef4444; /* Gastos */
  --color-yellow-600: #ca8a04; /* Advertencia */
  --color-blue-600: #2563eb; /* Info */

  /* Neutral */
  --color-gray-50: #f9fafb; /* Fondo */
  --color-gray-100: #f3f4f6; /* Hover claro */
  --color-gray-200: #e5e7eb; /* Bordes */
  --color-gray-600: #4b5563; /* Texto secundario */
  --color-gray-900: #111827; /* Texto principal */
}
```

---

## Tipografía

### Escala de Tamaños

```css
.text-xs {
  font-size: 12px;
  line-height: 16px;
} /* Labels, badges */
.text-sm {
  font-size: 14px;
  line-height: 20px;
} /* Body pequeño */
.text-base {
  font-size: 16px;
  line-height: 24px;
} /* Body normal */
.text-lg {
  font-size: 18px;
  line-height: 28px;
} /* Body grande */
.text-xl {
  font-size: 20px;
  line-height: 28px;
} /* Subtítulos */
.text-2xl {
  font-size: 24px;
  line-height: 32px;
} /* Títulos */
.text-3xl {
  font-size: 30px;
  line-height: 36px;
} /* Títulos grandes */
```

### Pesos de Fuente

```css
.font-normal {
  font-weight: 400;
} /* Normal */
.font-medium {
  font-weight: 500;
} /* Labels, descripción */
.font-semibold {
  font-weight: 600;
} /* Títulos, énfasis */
.font-bold {
  font-weight: 700;
} /* Títulos principales */
```

---

## Espaciado (Padding & Margin)

### Escala Espaciado

```css
.p-1 {
  padding: 4px;
}
.p-2 {
  padding: 8px;
}
.p-3 {
  padding: 12px;
}
.p-4 {
  padding: 16px;
}
.p-6 {
  padding: 24px;
}
.p-8 {
  padding: 32px;
}
.p-12 {
  padding: 48px;
}

/* Lo mismo aplica para m-, px-, py-, etc. */
```

### Gaps en Flexbox/Grid

```css
.gap-2 {
  gap: 8px;
} /* Items cercanos */
.gap-3 {
  gap: 12px;
} /* Items normales */
.gap-4 {
  gap: 16px;
} /* Items espaciados */
.gap-6 {
  gap: 24px;
} /* Items muy espaciados */
```

---

## Bordes y Esquinas

### Border Radius

```css
.rounded-lg {
  border-radius: 8px;
} /* Cards, inputs */
.rounded-xl {
  border-radius: 12px;
} /* Cards principales */
.rounded-full {
  border-radius: 9999px;
} /* Botones redondos */
```

### Bordes

```css
border: 1px solid #e5e7eb; /* Borde normal */
border: 2px solid #10b981; /* Borde destacado */
```

---

## Sombras

### Shadow Scale

```css
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.shadow-xl {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}
```

### Uso Recomendado

```
shadow-sm   → Cards, inputs (efecto sutil)
shadow-md   → Modales, dropdowns
shadow-lg   → Overlays, popups
```

---

## Estados de Interacción

### Hover (Cambios sutiles)

```css
.hover:bg-gray-100    /* Fondo claro */
.hover:shadow-md      /* Aumenta sombra */
.hover:scale-105      /* Zoom sutil */
```

### Focus (Para accesibilidad)

```css
.focus:outline-none
.focus:ring-2
.focus:ring-emerald-500
.focus:ring-offset-2
```

### Active/Disabled

```css
.active:bg-emerald-700
.disabled:opacity-50
.disabled:cursor-not-allowed
```

---

## Componentes Comunes

### Botones

#### Primary

```css
background: #10b981;
color: white;
padding: 8px 16px;
border-radius: 8px;
font-weight: 600;
transition: all 200ms;

&:hover {
  background: #059669;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

#### Secondary

```css
background: #e5e7eb;
color: #111827;
border: 1px solid #d1d5db;
padding: 8px 16px;
border-radius: 8px;

&:hover {
  background: #d1d5db;
}
```

### Inputs

#### Enfoque

```css
border: 1px solid #e5e7eb;
border-radius: 8px;
padding: 8px 12px;
font-size: 14px;

&:focus {
  outline: none;
  ring: 2px;
  ring-color: #10b981;
  border-color: transparent;
}
```

### Cards

```css
background: white;
border: 1px solid #e5e7eb;
border-radius: 12px;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
transition: all 200ms;

&:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

---

## Utilidades Personalizadas

### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

@media (max-width: 640px) {
  grid-template-columns: 1fr;
}
```

### Flex Layout

```css
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Truncate Text

```css
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## Breakpoints Responsivos

```css
/* Mobile First */
base       → <640px
sm:        → ≥640px   (pequeñas tablets)
md:        → ≥768px   (tablets)
lg:        → ≥1024px  (laptops)
xl:        → ≥1280px  (desktops grandes)
2xl:       → ≥1536px  (ultralarge)
```

### Ejemplo

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{/* 1 columna en mobile, 2 en tablet, 3 en desktop */}</div>
```

---

## Animaciones

### Transiciones

```css
transition: all 200ms ease-in-out;
transition: colors 150ms ease-out;
```

### Keyframes Personalizados

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 300ms ease-out;
}
```

---

## Dark Mode (Futura implementación)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1f2937;
    --bg-secondary: #111827;
    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
    --border-color: #374151;
  }
}
```

---

## Mejores Prácticas

### ✅ Hacer

```tsx
// Componentes reutilizables
<Button variant="primary" size="md">
  Click
</Button>;

// Clases consistentes
className = "p-4 rounded-lg border border-gray-200 bg-white";

// Composición de utilidades
className = "flex items-center justify-between gap-4";
```

### ❌ No Hacer

```tsx
// Estilos inline directos
style={{ color: 'red', padding: '10px' }}

// Clases inlineadas complejas
className="p-1 m-1 text-xs font-bold text-blue-500 bg-blue-100 border border-blue-300"

// Números mágicos
className="ml-23 pt-17"
```

---

## Checklist de Estilo

- [ ] Usar colores de la paleta establecida
- [ ] Mantener espaciado consistente
- [ ] Usar componentes reutilizables
- [ ] Aplicar transiciones suaves
- [ ] Incluir focus states
- [ ] Respetar breakpoints responsivos
- [ ] Mantener jerarquía tipográfica
- [ ] Usar sombras sutiles
- [ ] Documentar componentes nuevos

---

## Recursos

- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Color Palette**: Emerald theme
- **Figma Component Library**: (crear si es necesario)
