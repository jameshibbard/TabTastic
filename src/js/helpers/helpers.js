import Qs from "qs";
import parseDomain from "parse-domain";

export const nonInternalTabs = tab => tab.url.startsWith("chrome://") === false;

export const greatSuspenderRegex = /^chrome-extension:\/\/\w+\/suspended.html/;

export const parseUrl = url =>
  url.match(greatSuspenderRegex) ? Qs.parse(url).uri : url;

export const getDomain = url => {
  if (url.includes("://127.0.0.1") || url.includes("://localhost"))
    return "localhost";
  const parts = parseDomain(url);
  return parts ? `${parts.domain}.${parts.tld}` : "unknown";
};

export const tabToBookmark = ({ id, favIconUrl, title, url }) => ({
  id,
  favIconUrl,
  title,
  url: parseUrl(url),
  folder: "inbox",
  dateAdded: Date.now()
});
