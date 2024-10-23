# neko-terebi

# Getting Started

```
npm i
npm run dev
```

# Environment Variables

## `VITE_NEKO_SPATIAL_NAV_DEBUG`

If enabled, then it will show debug layers between all clickable components.

# Deliberate choices made in architecture to support older browsers

## Tailwind

All colors from tailwind needs to use `/100` to it. Otherwise, it will not render properly due to the use of --tw-bg-opacity

### Good

```
bg-black/100
```

### Bad

```
bg-black
```
