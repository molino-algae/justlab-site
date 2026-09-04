// Prefix internal links with the configured base path.
//
// Local dev and the production Hostinger build use base "/" (no-op).
// The GitHub Pages preview builds with base "/justlab-site/", so every
// hand-written internal href must go through here.
//
//   <a href={href("/research")}>   ->  /research           (prod)
//                                  ->  /justlab-site/research (preview)

const BASE = import.meta.env.BASE_URL; // "/" or "/justlab-site/"

export function href(path: string): string {
  if (
    !path ||
    path.startsWith("#") ||
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }
  const joined = BASE.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  return joined.replace(/\/{2,}/g, "/");
}

/** Does the current pathname sit under this nav target? (base-aware) */
export function isActive(pathname: string, target: string): boolean {
  const t = href(target);
  return t === href("/") ? pathname === t : pathname.startsWith(t);
}
