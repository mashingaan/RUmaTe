export const colors = {
  primary: '#1F6AA5',
  primaryPressed: '#1C5C90',
  primarySoft: '#E7F1F8',
  danger: '#DC2626',
  background: '#F7F8FA',
  surface: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  border: '#E5E7EB',
  iconMuted: '#9CA3AF'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24
};

export const radii = {
  sm: 12,
  md: 16
};

export const typography = {
  h1: { fontSize: 24, lineHeight: 28, fontWeight: '600' as const },
  h2: { fontSize: 20, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const }
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3
  }
};
