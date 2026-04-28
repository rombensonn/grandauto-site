"use client";

import type { HTMLMotionProps, Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easeOut }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.06 }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: easeOut }
  }
};

const viewport = { once: true, amount: 0.16, margin: "0px 0px -80px 0px" } as const;

function useRevealProps(variants: Variants = fadeUp) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const supportsIntersectionObserver = typeof window === "undefined" || "IntersectionObserver" in window;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion || !supportsIntersectionObserver) {
    return {};
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport,
    variants
  };
}

export function MotionSection(props: HTMLMotionProps<"section">) {
  const revealProps = useRevealProps();

  return <motion.section {...revealProps} {...props} />;
}

export function MotionDiv(props: HTMLMotionProps<"div">) {
  const revealProps = useRevealProps();

  return <motion.div {...revealProps} {...props} />;
}

export function MotionAside(props: HTMLMotionProps<"aside">) {
  const revealProps = useRevealProps();

  return <motion.aside {...revealProps} {...props} />;
}

export function MotionStagger(props: HTMLMotionProps<"div">) {
  const revealProps = useRevealProps(staggerContainer);

  return <motion.div {...revealProps} {...props} />;
}

export function MotionStaggerList(props: HTMLMotionProps<"ol">) {
  const revealProps = useRevealProps(staggerContainer);

  return <motion.ol {...revealProps} {...props} />;
}

export function MotionStaggerUnorderedList(props: HTMLMotionProps<"ul">) {
  const revealProps = useRevealProps(staggerContainer);

  return <motion.ul {...revealProps} {...props} />;
}

export function MotionArticle(props: HTMLMotionProps<"article">) {
  const reducedMotion = useReducedMotion();

  return <motion.article variants={reducedMotion ? undefined : staggerItem} {...props} />;
}

export function MotionListItem(props: HTMLMotionProps<"li">) {
  const reducedMotion = useReducedMotion();

  return <motion.li variants={reducedMotion ? undefined : staggerItem} {...props} />;
}

export function MotionBlockquote(props: HTMLMotionProps<"blockquote">) {
  const reducedMotion = useReducedMotion();

  return <motion.blockquote variants={reducedMotion ? undefined : staggerItem} {...props} />;
}
