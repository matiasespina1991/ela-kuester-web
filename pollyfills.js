// polyfills.js

if (typeof Promise.withResolvers === "undefined") {
  const polyfill = () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };

  if (typeof window !== "undefined") {
    window.Promise.withResolvers = polyfill;
  }

  if (typeof global !== "undefined") {
    global.Promise.withResolvers = polyfill;
  }
}
