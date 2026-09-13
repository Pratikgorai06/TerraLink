export const DEMO_TOKEN = process.env.NEXT_PUBLIC_DEMO_TOKEN || 'bhoomisetu-demo-token-2026';

export function isValidDemoToken(token: string) {
  return token === DEMO_TOKEN;
}
