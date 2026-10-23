/**
 * Hjælpefunktioner til automatisk at markere events som kommende.
 *
 * Eventets dato gemmes som en ISO-datostreng på formen "YYYY-MM-DD" uden
 * tidspunkt. I stedet for at ejeren manuelt skriver "(upcoming)" i navnet,
 * afgør vi ud fra datoen om eventet ligger i fremtiden.
 */

/**
 * Fjerner et eventuelt manuelt indtastet "(upcoming)"/"(kommende)" fra navnet,
 * så det ikke dubleres når vi selv tilføjer markeringen.
 *
 * Vi fjerner kun markeringen når den står i parentes (fx "(upcoming)"), så vi
 * ikke ødelægger navne hvor ordet indgår som en del af titlen. Der skelnes
 * ikke mellem store og små bogstaver.
 */
export function stripUpcoming(name: string): string {
  return name
    .replace(/\(\s*(upcoming|kommende)\s*\)/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Returnerer en ISO-datostreng ("YYYY-MM-DD") for "i dag" i lokal tid.
 *
 * Vi bruger lokal tid uden klokkeslæt, så sammenligningen matcher den måde
 * eventets dato gemmes på (ren dato, ingen tidszone).
 */
function todayIso(now: Date): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Afgør om et event er kommende ud fra dets dato.
 *
 * Et event betragtes som kommende hvis dets dato er i dag eller senere.
 * Er datoen i fortiden (eller mangler den), returneres `false`, så der ikke
 * vises nogen markering.
 */
export function isUpcoming(
  eventDate: string | null | undefined,
  now: Date = new Date()
): boolean {
  if (!eventDate) return false;

  // Sammenligning af "YYYY-MM-DD"-strenge er leksikografisk korrekt, men vi
  // validerer formatet først for at undgå falske positiver ved fx "31.12.2026".
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) return false;

  return eventDate >= todayIso(now);
}
