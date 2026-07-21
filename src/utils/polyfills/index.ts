/**
 * Global Polyfills Registration Entry point
 * Ensures deep cross-browser compatibility (Fullscreen API, IntersectionObserver, ResizeObserver)
 */

declare global {
  interface Window {
    __POLYFILLS_LOADED__?: boolean;
  }
}

export function initPolyfills() {
  // Polyfill initialization guard to avoid redundant execution
  if (typeof window === 'undefined') return;
  if (window.__POLYFILLS_LOADED__) return;
  window.__POLYFILLS_LOADED__ = true;

  // 1. Fullscreen API Polyfill
  initFullscreenPolyfill();

  // 2. IntersectionObserver Polyfill
  initIntersectionObserverPolyfill();

  // 3. ResizeObserver Polyfill
  initResizeObserverPolyfill();
}

function initFullscreenPolyfill() {
  if (typeof document === 'undefined') return;

  const doc = document as any;
  if (!doc.fullscreenEnabled) {
    const l = ["fullscreen", "fullscreenEnabled", "fullscreenElement", "fullscreenchange", "fullscreenerror", "exitFullscreen", "requestFullscreen"];
    const e = ["webkitIsFullScreen", "webkitFullscreenEnabled", "webkitFullscreenElement", "webkitfullscreenchange", "webkitfullscreenerror", "webkitExitFullscreen", "webkitRequestFullscreen"];
    const n = ["mozFullScreen", "mozFullScreenEnabled", "mozFullScreenElement", "mozfullscreenchange", "mozfullscreenerror", "mozCancelFullScreen", "mozRequestFullScreen"];
    const u = ["", "msFullscreenEnabled", "msFullscreenElement", "MSFullscreenChange", "MSFullscreenError", "msExitFullscreen", "msRequestFullscreen"];

    const c = [l, e, n, u].find(list => list.find(key => key in doc)) || [];

    function handler(evtName: string, event: Event) {
      doc[l[0]] = doc[c[0]] || !!doc[c[2]] || false;
      doc[l[1]] = doc[c[1]] || false;
      doc[l[2]] = doc[c[2]] || null;
      doc.dispatchEvent(new Event(evtName));
    }

    if (c.length && !doc[l[1]]) {
      doc[l[0]] = doc[c[0]] || !!doc[c[2]] || false;
      doc[l[1]] = doc[c[1]] || false;
      doc[l[2]] = doc[c[2]] || null;
      if (c[3]) doc.addEventListener(c[3], (evt: Event) => handler(l[3], evt), false);
      if (c[4]) doc.addEventListener(c[4], (evt: Event) => handler(l[4], evt), false);
      if (c[5]) doc[l[5]] = function() { return doc[c[5]](); };
      if (c[6] && Element.prototype) {
        (Element.prototype as any)[l[6]] = function() { return (this as any)[c[6]].apply(this, arguments); };
      }
    }
  }
}

function initIntersectionObserverPolyfill() {
  if (typeof window === 'undefined') return;

  const hasNative =
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in (window as any).IntersectionObserverEntry.prototype;

  if (!hasNative) {
    // Fallback stub for legacy environments
    (window as any).IntersectionObserver = class IntersectionObserver {
      constructor(callback: Function) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
}

function initResizeObserverPolyfill() {
  if (typeof window === 'undefined') return;

  if (!('ResizeObserver' in window)) {
    (window as any).ResizeObserver = class ResizeObserver {
      constructor(callback: Function) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
}
