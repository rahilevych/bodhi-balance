import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    // Маппинг для CSS-модулей — используем identity-obj-proxy
    '\\.module\\.css$': 'identity-obj-proxy',

    // Мок для обычных CSS, если есть
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
};
