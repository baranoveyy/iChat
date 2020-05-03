module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended",
    // "prettier/react",
    "prettier/@typescript-eslint",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    "quotes": ["error", "single", { allowTemplateLiterals: true }],
    "jsx-quotes": ["error", "prefer-double"],
    "arrow-parens": ["error", "always"],
    "implicit-arrow-linebreak": "off",
    "max-len": ["error", { code: 120 }],
    "newline-before-return": 2,
    "no-irregular-whitespace": "off",
    "no-undef": "off",
    "no-prototype-builtins": "off",
    "comma-dangle": ["error", "never"],
    "no-console": "error",
    "no-case-declarations": "off",
    "no-irregular-whitespace": ["error", { skipComments: true }],
    "no-trailing-spaces": "error",
    "curly": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "react/no-deprecated": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off"
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};