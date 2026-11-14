export const lagosNow = () => {
  const d = new Date();
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
  const hour = +new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "numeric", hour12: false }).format(d) % 24;
  const status =
    hour >= 9 && hour < 18 ? "Probably at my desk." : hour >= 18 ? "Probably still shipping something." : "Asleep. I'll reply in the morning.";
  return { time, status };
};
