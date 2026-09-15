export const clipGaramBrand = {
  forest: "#203A35",
  clay: "#D7653D",
  paper: "#F4F0E8",
  sage: "#8FAE9F",
} as const;

export const clipGaramThemes = {
  light: {
    background: "#F4F0E8",
    surface: "#FBF8F1",
    surfaceRaised: "#FFFFFF",
    text: "#203A35",
    textMuted: "#5F6D68",
    textInverse: "#F4F0E8",
    primary: "#203A35",
    primaryHover: "#172F2A",
    accent: "#D7653D",
    border: "#D5D9D3",
    borderStrong: "#203A35",
    focus: "#D7653D",
    success: "#2F765F",
    error: "#B64E42",
    illustration: {
      line: "#203A35",
      dark: "#203A35",
      mid: "#8FAE9F",
      pale: "#D8E2D9",
      accent: "#D7653D",
    },
  },
  dark: {
    background: "#122621",
    surface: "#1B352E",
    surfaceRaised: "#203A35",
    text: "#F4F0E8",
    textMuted: "#B8C4BE",
    textInverse: "#122621",
    primary: "#EF8A67",
    primaryHover: "#F3A487",
    accent: "#EF8A67",
    border: "#3C554F",
    borderStrong: "#769087",
    focus: "#F3A487",
    success: "#7CC49B",
    error: "#FF8C82",
    illustration: {
      line: "#F4F0E8",
      dark: "#203A35",
      mid: "#8FAE9F",
      pale: "#D8E2D9",
      accent: "#EF8A67",
    },
  },
} as const;

export const clipGaramTypography = {
  display: '"Fraunces", Georgia, serif',
  ui: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export type ClipGaramThemeName = keyof typeof clipGaramThemes;

