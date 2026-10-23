import { describe, it, expect } from 'vitest';
import { isUpcoming, stripUpcoming } from './upcoming';

describe('isUpcoming', () => {
  const now = new Date(2026, 6, 1); // 1. juli 2026 (måned er 0-indekseret)

  it('returnerer true for en dato i fremtiden', () => {
    expect(isUpcoming('2026-07-02', now)).toBe(true);
    expect(isUpcoming('2026-12-31', now)).toBe(true);
    expect(isUpcoming('2027-01-01', now)).toBe(true);
  });

  it('returnerer true for dagens dato', () => {
    expect(isUpcoming('2026-07-01', now)).toBe(true);
  });

  it('returnerer false for en dato i fortiden', () => {
    expect(isUpcoming('2026-06-30', now)).toBe(false);
    expect(isUpcoming('2025-01-01', now)).toBe(false);
  });

  it('returnerer false når datoen mangler', () => {
    expect(isUpcoming(null, now)).toBe(false);
    expect(isUpcoming(undefined, now)).toBe(false);
    expect(isUpcoming('', now)).toBe(false);
  });

  it('returnerer false for en dato i forkert format', () => {
    expect(isUpcoming('01-07-2026', now)).toBe(false);
    expect(isUpcoming('31.12.2026', now)).toBe(false);
    expect(isUpcoming('i morgen', now)).toBe(false);
  });
});

describe('stripUpcoming', () => {
  it('fjerner et manuelt "(upcoming)" fra navnet', () => {
    expect(stripUpcoming('Sommerfest (upcoming)')).toBe('Sommerfest');
    expect(stripUpcoming('(upcoming) Sommerfest')).toBe('Sommerfest');
  });

  it('er ligeglad med store og små bogstaver', () => {
    expect(stripUpcoming('Sommerfest (Upcoming)')).toBe('Sommerfest');
    expect(stripUpcoming('Sommerfest (UPCOMING)')).toBe('Sommerfest');
  });

  it('fjerner også den danske variant "(kommende)"', () => {
    expect(stripUpcoming('Sommerfest (kommende)')).toBe('Sommerfest');
  });

  it('rører ikke navne uden parentes-markering', () => {
    expect(stripUpcoming('Sommerfest')).toBe('Sommerfest');
    expect(stripUpcoming('Upcoming Fest')).toBe('Upcoming Fest');
  });

  it('rydder overskydende mellemrum op', () => {
    expect(stripUpcoming('Sommerfest  (upcoming)')).toBe('Sommerfest');
  });
});
