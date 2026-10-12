import {defineConfig} from 'vitest/config';
// submission-source contains separately runnable node:test snapshots, not this
// application's Vitest suites. Keep collection on the actual maintained sources.
export default defineConfig({test:{include:['tests/**/*.test.{ts,tsx,js}','src/**/*.test.{ts,tsx,js}']}});
