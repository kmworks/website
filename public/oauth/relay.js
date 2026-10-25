const relayPath = /^\/oauth\/(anilist|mal|bangumi|mangabaka)\/callback\/?$/;

export function buildRelayTarget(url) {
  const match = relayPath.exec(url.pathname);
  if (!match) {
    throw new Error("This OAuth callback address is not supported.");
  }
  const provider = match[1];
  const providerError = url.searchParams.get("error");
  if (providerError) {
    const description = url.searchParams.get("error_description");
    throw new Error(description ? `${providerError}: ${description}` : providerError);
  }

  const code = url.searchParams.get("code");
  if (!code) {
    throw new Error("The authorization response is missing its code.");
  }
  const state = url.searchParams.get("state");
  if (!state) {
    throw new Error("The authorization response is missing its state.");
  }

  let payload;
  try {
    payload = JSON.parse(state);
  } catch {
    throw new Error("The authorization state is invalid.");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("The authorization state is invalid.");
  }
  if (typeof payload.nonce !== "string" || !payload.nonce) {
    throw new Error("The authorization state is missing its nonce.");
  }
  if (typeof payload.redirectUrl !== "string") {
    throw new Error("The authorization state is missing its return address.");
  }

  let target;
  try {
    target = new URL(payload.redirectUrl);
  } catch {
    throw new Error("The authorization return address is invalid.");
  }
  if (target.protocol !== "https:" && target.protocol !== "http:") {
    throw new Error("The authorization return address must use HTTP or HTTPS.");
  }
  if (target.username || target.password || target.search || target.hash) {
    throw new Error("The authorization return address contains unsupported parts.");
  }
  const legacyTargetPath = new RegExp(
    `^/(?:[A-Za-z0-9_-]+/)*api/oauth/${provider}/callback$`,
  );
  const nativeTargetPath = new RegExp(
    `^/(?:[A-Za-z0-9_-]+/)*api/v1/trackers/oauth/${provider}/callback$`,
  );
  if (!legacyTargetPath.test(target.pathname) && !nativeTargetPath.test(target.pathname)) {
    throw new Error("The authorization return address does not match this provider.");
  }

  target.searchParams.set("code", code);
  target.searchParams.set("state", state);
  return target.toString();
}

function runRelay() {
  const status = document.getElementById("relay-status");
  const detail = document.getElementById("relay-detail");
  if (!status || !detail) {
    return;
  }

  try {
    const target = buildRelayTarget(new URL(window.location.href));
    status.textContent = "Authorization received";
    status.classList.add("is-success");
    detail.textContent = "Returning to KMServer…";
    window.location.replace(target);
  } catch (error) {
    status.textContent = "Authorization could not be completed";
    status.classList.add("is-error");
    detail.textContent = error instanceof Error ? error.message : "Invalid authorization response.";
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  runRelay();
}
