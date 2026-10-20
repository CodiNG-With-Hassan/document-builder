import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/*
 * SOURCE OF TRUTH for the Document Creator brand tokens, consumed by apps/web via the @Theme
 * tsconfig path alias. The primary ramp is centred on the icon blue (#2563eb = primary-600).
 */
const documentCreatorPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        primary: {
          color: '#2563eb',
          contrastColor: '#ffffff',
          hoverColor: '#1d4ed8',
          activeColor: '#1e40af',
        },
      },
      dark: {
        surface: {
          0: '#0f172a',
          50: '#131c31',
          100: '#1e293b',
          200: '#273449',
          300: '#334155',
          400: '#475569',
          500: '#94a3b8',
          600: '#a9b6c8',
          700: '#cbd5e1',
          800: '#e2e8f0',
          900: '#f1f5f9',
          950: '#f8fafc',
        },
        primary: {
          color: '#60a5fa',
          contrastColor: '#0f172a',
          hoverColor: '#93c5fd',
          activeColor: '#bfdbfe',
        },
      },
    },
  },
});

export default documentCreatorPreset;
