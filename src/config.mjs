// Google Form for the "get updates" sign-up. Paste the form's share link here (or set FORM_URL).
const DEFAULT_FORM_URL = '';

export function readConfig(env = process.env) {
  const site = new URL(env.SITE_URL || 'https://knowdexia.com');
  if (!['http:', 'https:'].includes(site.protocol)) throw new Error('SITE_URL must use HTTP or HTTPS');
  const app = env.APP_URL?.trim();
  if (app && !['http:', 'https:'].includes(new URL(app).protocol)) throw new Error('APP_URL must use HTTP or HTTPS');
  const form = (env.FORM_URL ?? DEFAULT_FORM_URL).trim();
  if (form && new URL(form).protocol !== 'https:') throw new Error('FORM_URL must use HTTPS');
  if (env.RELEASE === 'true' && (!(app || form) || env.LEGAL_APPROVED !== 'true')) {
    throw new Error('Release requires APP_URL or FORM_URL, and reviewed legal pages (LEGAL_APPROVED=true). See README.md.');
  }
  return { siteUrl: site.origin, appUrl: app || '/coming-soon', comingSoon: !app, formUrl: form, legalApproved: env.LEGAL_APPROVED === 'true' };
}
