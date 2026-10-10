export type OutpostXpBounds = { lower: number; upper: number };

// #425 human-approved test-only allowance: RoyalG.1.22.js:193 uses the identical
// formula/order, but Chrome 154 and Node 22 native Math.pow differ by one double
// at Trading ranks 7/12. Never apply this allowance to saved XP, ranks or points.
export function outpostThresholdBounds(expected: number): OutpostXpBounds {
    if (!Number.isFinite(expected) || expected < 0) throw new Error('Outpost XP thresholds must be finite and nonnegative.');
    // Before rank one, the previous threshold is literal zero, not a pow result.
    if (expected === 0) return { lower: 0, upper: 0 };
    const view = new DataView(new ArrayBuffer(8));
    view.setFloat64(0, expected);
    const bits = view.getBigUint64(0);
    view.setBigUint64(0, bits - BigInt(1));
    const lower = view.getFloat64(0);
    view.setBigUint64(0, bits + BigInt(1));
    return { lower, upper: view.getFloat64(0) };
}

export function expectOutpostXpWithinBounds(
    actual: number,
    expected: number,
    bounds: OutpostXpBounds = outpostThresholdBounds(expected),
): void {
    // Raw inclusive bounds, not a percentage matcher tolerance; retain values in failures.
    expect({ actual, expected, bounds, withinBounds: actual >= bounds.lower && actual <= bounds.upper })
        .toEqual({ actual, expected, bounds, withinBounds: true });
}
