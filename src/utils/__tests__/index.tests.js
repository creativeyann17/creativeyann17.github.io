import { findArticlesByFilter } from '../index';

describe('findArticlesByFilter', () => {
  const mockArticles = [
    {
      tags: ['console'],
    },
    {
      tags: ['spring-boot'],
    },
  ];

  const assertFilter = (mockArticles, searchFilter, expectedTag) => {
    const filtered = findArticlesByFilter(mockArticles, searchFilter);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].tags[0]).toEqual(expectedTag);
  };
  test('default search', () => {
    assertFilter(mockArticles, 'console', 'console');
  });
  test('ignore case', () => {
    assertFilter(mockArticles, 'ConSole', 'console');
  });
  test('trim', () => {
    assertFilter(mockArticles, ' console ', 'console');
  });
  test('contains', () => {
    assertFilter(mockArticles, 'spring', 'spring-boot');
  });
  test('split -', () => {
    assertFilter(mockArticles, 'h2-console', 'console');
  });
  test('split _', () => {
    assertFilter(mockArticles, 'h2_console', 'console');
  });
});
