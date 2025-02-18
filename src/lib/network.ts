export async function checkInternetConnectivity(): Promise<{
  isOnline: boolean;
  latency: number;
}> {
  const start = performance.now();

  try {
    // Try to fetch a small resource from a reliable CDN
    const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
      mode: "no-cors",
      cache: "no-cache",
    });
    const end = performance.now();

    return {
      isOnline: true,
      latency: Math.round(end - start),
    };
  } catch (error) {
    return {
      isOnline: false,
      latency: 0,
    };
  }
}
