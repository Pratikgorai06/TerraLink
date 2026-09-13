export const DEMO_TOKEN = process.env.NEXT_PUBLIC_DEMO_TOKEN || 'terralink-demo-token-2026';

export function isValidDemoToken(token: string): boolean {
  return token.trim() === DEMO_TOKEN || token.trim() === 'bhoomisetu-demo-token-2026';
}
