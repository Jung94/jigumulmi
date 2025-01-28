import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  test('should return true for objects with same keys and values in different orders', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { c: 3, a: 1, b: 2 };

    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('should return false for objects with different keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 2 };

    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  test('should return true for deeply nested objects with same structure and values', () => {
    const obj1 = { a: { b: { c: 1 } }, d: [2, 3] };
    const obj2 = { d: [2, 3], a: { b: { c: 1 } } };

    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('should return false for deeply nested objects with different values', () => {
    const obj1 = { a: { b: { c: 1 } }, d: [2, 3] };
    const obj2 = { d: [2, 3], a: { b: { c: 2 } } };

    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  test('should return true for null values', () => {
    expect(deepEqual(null, null)).toBe(true);
  });

  test('should return false when one value is null and the other is not', () => {
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual({}, null)).toBe(false);
  });

  test('should return true for identical arrays', () => {
    const arr1 = [1, 2, { a: 3 }];
    const arr2 = [1, 2, { a: 3 }];

    expect(deepEqual(arr1, arr2)).toBe(true);
  });

  test('should return false for arrays with different values', () => {
    const arr1 = [1, 2, { a: 3 }];
    const arr2 = [1, 2, { a: 4 }];

    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  test('should handle empty objects and arrays correctly', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual({}, [])).toBe(false);
  });
});
