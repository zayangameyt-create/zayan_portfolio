import { m, useReducedMotion } from 'framer-motion';

function Reveal({ children, className, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </m.div>
  );
}

export default Reveal;
