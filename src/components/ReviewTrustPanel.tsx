"use client";

import { Award, CalendarCheck } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { typograph as tx } from "@/lib/typography";

const easeOut = [0.22, 1, 0.36, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, staggerChildren: 0.08, delayChildren: 0.08 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } }
};

type ReviewTrustPanelProps = Readonly<{
  rating: string;
  reviewsCount: string;
  ratingsCount: string;
  award: string;
}>;

export function ReviewTrustPanel({ rating, reviewsCount, ratingsCount, award }: ReviewTrustPanelProps) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const supportsIntersectionObserver = typeof window === "undefined" || "IntersectionObserver" in window;

  useEffect(() => {
    setMounted(true);
  }, []);

  const revealProps = !mounted || reducedMotion || !supportsIntersectionObserver
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.35 },
        variants: panelVariants
      };

  return (
    <motion.div className="review-trust" aria-label="Рейтинг и награда автосервиса" {...revealProps}>
      <motion.div className="review-trust__card review-trust__card--score" variants={reducedMotion ? undefined : cardVariants}>
        <strong className="review-trust__score">{rating}</strong>
        <span className="review-trust__label">Рейтинг на Яндекс Картах</span>
        <span className="review-trust__meta">
          {tx(`${reviewsCount} · ${ratingsCount}`)}
        </span>
      </motion.div>

      <motion.div className="review-trust__card review-trust__card--award" variants={reducedMotion ? undefined : cardVariants}>
        <span className="review-trust__award-icon" aria-hidden="true">
          <Award size={28} />
        </span>
        <span>
          <strong>{tx(award)}</strong>
          <small>{tx("Награда любимых мест пользователей")}</small>
        </span>
      </motion.div>

      <motion.a className="button button--primary review-trust__cta" href="#lead-form" variants={reducedMotion ? undefined : cardVariants}>
        <CalendarCheck size={18} aria-hidden="true" />
        Записаться как постоянный клиент
      </motion.a>
    </motion.div>
  );
}
