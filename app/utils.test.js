import { describe } from 'vitest';
import { parsePaginationParams, parseSortParams } from './utils';

describe('Utils', () => {
  describe('parsePaginationParams', () => {
    test('with only one param', () => {
      const result = parsePaginationParams({ limit: '10' });

      expect(result).toEqual({
        limit: 10,
        offset: 0,
      });
    });

    test('withoutParams', () => {
      const result = parsePaginationParams({});

      expect(result).toEqual({
        limit: 10,
        offset: 0,
      });
    });
  });

  describe('parseSortParams', () => {
    test('with valid params', () => {
      const result = parseSortParams({
        fields: ['id', 'title'],
        direction: 'asc',
        orderBy: 'title',
      });

      expect(result).toEqual({
        orderBy: 'title',
        direction: 'asc',
      });
    });
  });
});
