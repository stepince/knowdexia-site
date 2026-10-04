export function readConfig(env = process.env) {
  const site = new URL(env.SITE_URL || 'https://knowdexia.com');
  if (!['http:', 'https:'].includes(site.protocol)) throw new Error('SITE_URL must use HTTP or HTTPS');
  const app = env.APP_URL?.trim();
  if (app && !['http:', 'https:'].includes(new URL(app).protocol)) throw new Error('APP_URL must use HTTP or HTTPS');
  if (env.RELEASE === 'true' && (!app || env.LEGAL_APPROVED !== 'true')) {
    throw new Error('Release requires APP_URL and reviewed legal pages (LEGAL_APPROVED=true). See README.md.');
  }
  return { siteUrl: site.origin, appUrl: app || '/get-started', legalApproved: env.LEGAL_APPROVED === 'true' };
}
