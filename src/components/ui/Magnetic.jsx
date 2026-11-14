import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { snappy, magnet, press } from "../../lib/motion";

const MLink = motion.create(Link);

/**
 * Magnetic primary CTA. Follows the cursor by `magnet` × offset on a snappy spring.
 * Renders a router <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 */
export default function Magnetic({ to, href, className = "", style, children, ...rest }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, snappy);
  const y = useSpring(my, snappy);

  const onMouseMove = (e) => {
    if (reduce) return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - b.left - b.width / 2) * magnet);
    my.set((e.clientY - b.top - b.height / 2) * magnet * 1.4);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const props = {
    className: `btn-primary ${className}`,
    style: { x, y, ...style },
    onMouseMove,
    onMouseLeave,
    whileTap: press,
    transition: snappy,
    ...rest,
  };
  if (to) return <MLink to={to} {...props}>{children}</MLink>;
  if (href) return <motion.a href={href} {...props}>{children}</motion.a>;
  return <motion.button type="button" {...props}>{children}</motion.button>;
}
