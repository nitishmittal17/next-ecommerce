type VWOQueue = unknown[] & {
  event?: (eventName: string, properties?: Record<string, unknown>) => void;
};

declare let window: Window & { VWO: VWOQueue };

export const trackVWOEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
) => {
  if (typeof window === "undefined") return;

  console.log("[VWO]", eventName, properties);

  window.VWO = window.VWO || ([] as VWOQueue);
  window.VWO.event =
    window.VWO.event ||
    function (...args: unknown[]) {
      window.VWO.push(["event"].concat(args as never[]));
    };

  window.VWO.event(eventName, properties);
};
