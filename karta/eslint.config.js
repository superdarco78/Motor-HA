// Sprawdzanie kodu karty (ESLint): wyłapuje prawdziwe błędy – literówki w nazwach, nieużywane zmienne, zły kod.
// Styl zapisu zostaje taki jak jest (bez reguł formatowania).
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser }
    },
    // nieużywane zmienne tylko jako ostrzeżenie (nie blokują PR); puste „catch (e)” są w porządku
    rules: { 'no-unused-vars': ['warn', { caughtErrors: 'none' }] }
  },
  { files: ['zbuduj.mjs', 'testy/**', 'narzedzia/**'], languageOptions: { globals: { ...globals.node, ...globals.browser } } }
];
