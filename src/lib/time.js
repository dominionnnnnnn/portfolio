export const lagosNow = () => {
  const d = new Date();
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
  const hour = +new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "numeric", hour12: false }).format(d) % 24;
  let status;
  if (hour < 6) status = "I'm probably asleep. Your message will be the first thing I read.";
  else if (hour < 9) status = "Early start. Coffee, then code review.";
  else if (hour < 13) status = "Heads-down hours. Replies are quick.";
  else if (hour < 18) status = "Mid-build. I check messages between commits.";
  else if (hour < 22) status = "Winding down, still answering email.";
  else status = "Late-night commits. I'll reply properly in the morning.";
  return { time, status };
};
