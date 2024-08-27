import '@testing-library/jest-dom/vitest'
// eslint-disable-next-line import/namespace
import { vi } from 'vitest'
global.IS_REACT_ACT_ENVIRONMENT = true
global.jest = vi