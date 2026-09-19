import { motion, type HTMLMotionProps } from 'framer-motion'

/** Subtle once-only scroll reveal. Keep it small: 12px, half a second. */
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay }}
      {...props}
    />
  )
}
