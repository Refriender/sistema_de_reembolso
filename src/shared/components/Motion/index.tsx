/**
 * Motion Components
 *
 * Componentes reutilizáveis para animações consistentes em todo o app.
 */

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

/**
 * Wrapper para animação de entrada (Fade In + Slide Up)
 */
export const FadeIn = ({
  children,
  delay = 0,
  className,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Wrapper para elementos clicáveis (Botões, Cards)
 * Adiciona efeito de "pressão" ao clicar
 */
export const ScaleOnTap = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Container para listas com animação em cascata (Stagger)
 */
export const StaggerContainer = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) => (
  <motion.div
    initial="hidden"
    animate="show"
    exit="hidden"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Item individual de uma lista em cascata
 */
export const StaggerItem = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    transition={{ type: "spring", stiffness: 300, damping: 24 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
