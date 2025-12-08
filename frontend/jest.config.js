import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
    '^swiper/react$': '<rootDir>/src/__mocks__/swiper-react.tsx',
    '^swiper/modules$': '<rootDir>/src/__mocks__/swiper-react.tsx',
    '^framer-motion$': '<rootDir>/src/__mocks__/framer-motion.tsx',
    '^react-scroll$': '<rootDir>/src/__mocks__/react-scroll.tsx',
    '^react-intersection-observer$':
      '<rootDir>/src/__mocks__/react-observer.tsx',
    '^@shared/api/axiosInstance$': '<rootDir>/src/__mocks__/axiosInstance.ts',
    '^.+/shared/api/axiosInstance$': '<rootDir>/src/__mocks__/axiosInstance.ts',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/main.tsx'],
};
