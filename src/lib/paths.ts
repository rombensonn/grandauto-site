const basePath = process.env.NEXT_PUBLIC_GITHUB_PAGES_BASE_PATH ?? "";

export function withBasePath(href: string): string {
  if (
    !basePath ||
    href.startsWith("#") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href;
  }

  if (href === "/") {
    return `${basePath}/`;
  }

  return href.startsWith("/") ? `${basePath}${href}` : href;
}
