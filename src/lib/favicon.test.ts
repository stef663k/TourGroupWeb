import { describe, it, expect } from 'vitest';
import { faviconDomain, faviconUrl } from './favicon';

describe('faviconDomain', () => {
  it('udtrækker værtsnavnet fra en https-URL', () => {
    expect(faviconDomain('https://www.instagram.com/someone')).toBe('www.instagram.com');
  });

  it('udtrækker værtsnavnet fra en http-URL', () => {
    expect(faviconDomain('http://example.com/path?x=1')).toBe('example.com');
  });

  it('returnerer null for relative stier', () => {
    expect(faviconDomain('/kontakt')).toBeNull();
  });

  it('returnerer null for tomme eller manglende værdier', () => {
    expect(faviconDomain(null)).toBeNull();
    expect(faviconDomain(undefined)).toBeNull();
    expect(faviconDomain('')).toBeNull();
    expect(faviconDomain('   ')).toBeNull();
  });

  it('returnerer null når URL ikke kan parses', () => {
    expect(faviconDomain('ikke en url')).toBeNull();
  });

  it('håndterer omkringliggende whitespace', () => {
    expect(faviconDomain('  https://spotify.com  ')).toBe('spotify.com');
  });
});

describe('faviconUrl', () => {
  it('bygger en Google favicon-URL med domæne og standardstørrelse', () => {
    expect(faviconUrl('https://www.instagram.com/someone')).toBe(
      'https://www.google.com/s2/favicons?domain=www.instagram.com&sz=64'
    );
  });

  it('bruger den angivne størrelse', () => {
    expect(faviconUrl('https://example.com', 32)).toBe(
      'https://www.google.com/s2/favicons?domain=example.com&sz=32'
    );
  });

  it('returnerer null når domænet ikke kan udledes', () => {
    expect(faviconUrl('/kontakt')).toBeNull();
    expect(faviconUrl(null)).toBeNull();
    expect(faviconUrl('')).toBeNull();
  });
});
