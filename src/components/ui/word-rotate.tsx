import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface WordRotateProps {
  words: string[]
  duration?: number
  framerProps?: HTMLMotionProps<'span'>
  className?: string
  containerClassName?: string
}

export function WordRotate({
  words,
  duration = 2800,
  framerProps = {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
  className,
  containerClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <span className={cn('inline-block overflow-hidden py-1 align-bottom', containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn('inline-block', className)}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default WordRotate
