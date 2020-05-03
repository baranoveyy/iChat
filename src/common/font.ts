export const FONT_WEIGHTS = {
  THIN: '100',
  ULTRA_LIGHT: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: '500',
  SEMI_BOLD: '600',
  BOLD: '700',
  HEAVY: '800',
  BLACK: '900'
};

export const FONT_SIZE = {
  NINE: '9px',
  TEN: '10px'
};

export const font = (size = '16px', weight = FONT_WEIGHTS.REGULAR) => {
  return `
    font-size: ${size}
  `;
};
