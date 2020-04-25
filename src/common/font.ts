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
// export const font = (size = '16px', weight = FONT_WEIGHTS.REGULAR) => {
//   let fontFamily;

//   switch (weight) {
//     case FONT_WEIGHTS.BOLD:
//       fontFamily = `
//         font-family: 'SommetRoundedBold';
//       `;
//       break;

//     case FONT_WEIGHTS.LIGHT:
//       fontFamily = `
//         font-family: 'SommetRoundedLight';
//       `;
//       break;

//     default:
//       fontFamily = `
//         font-family: 'SommetRoundedRegular';
//       `;
//       break;
//   }

//   return `
//     ${fontFamily}
//     font-size: ${size}
//   `;
// };

const LONG_AMOUNT = 25;
const SHORT_AMOUNT = 16;
const SMALL_FONT = '12px';
const NORMAL_FONT = '14px';
const BIG_FONT = '16px';

export const dynamicFontSizeGenerator = (formatedBalance: string | undefined, defaultFontSize: string = BIG_FONT) => {
  const formatedBalanceLength = formatedBalance && formatedBalance.length;
  let fontSize = defaultFontSize;

  if (formatedBalanceLength) {
    if (formatedBalanceLength > LONG_AMOUNT) {
      fontSize = SMALL_FONT;
    } else if (formatedBalanceLength > SHORT_AMOUNT) {
      fontSize = NORMAL_FONT;
    }
  }

  return fontSize;
};
