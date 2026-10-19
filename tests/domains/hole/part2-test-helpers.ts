import { normalizeExtractedValue } from '../../utils/live-game-data-loader';


export interface CapturedMajik {
 id: number;
 tree: number;
 position: number;
 name: string;
 level: number;
 initial: number;
 enhancement: number;
 gate: boolean;
 cap: number;
 prerequisiteId: number | null;
 prerequisiteMet: boolean;
 access: boolean;
 canPurchase: boolean;
 bonus: number;
}

export interface CapturedMajikPool {
 purchased: number;
 earned: number;
 invested: number;
 remaining: number;
 rawInvestments: number[][];
 rawNames: string[][];
}

export interface CapturedMeasurement {
 id: number;
 type: number;
 level: number;
 access: boolean;
 raw: number | string;
 normalized: number;
 multiplier: number;
 base: number;
 benefit: number;
 price: number;
 currency: number;
 stock: number;
 shortfall: number;
 affordable: boolean;
}



export function compareCore(actual: number | null, expected: number | string | null, context: string): void {
 if (expected === null) {
  expect(actual).toBeNull();
  return;
 }
 expect(actual).not.toBeNull();
 expect(actual).toMatchLiveGameWithDetails(normalizeExtractedValue(expected), { tolerance: 0, context });
}

