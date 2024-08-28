import '@testing-library/jest-dom/vitest'
import '@testing-library/user-event'
// eslint-disable-next-line import/namespace
import { vi } from 'vitest'
global.IS_REACT_ACT_ENVIRONMENT = true
// replace jest api to vitest api
global.jest = vi