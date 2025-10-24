// src/utils.js

/**
 * Converts a page name to a URL path.
 * Example: "Home" => "/home", "GetKey" => "/getkey"
 */
export function createPageUrl(pageName) {
  return "/" + pageName.toLowerCase();
}
