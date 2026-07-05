"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

export default function BrandLoading() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          // A luxurious, diffused gradient background with noise texture
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] p-6 text-white backdrop-blur-sm"
        >
          {/* Main Logo Container with a subtle rotation animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center gap-3.5"
          >
            {/* The Badge: Code Bracket {</>} + Subtly Integrated Pulsing Heart */}
            <div className="group relative flex items-center justify-center">
              <div className="font-mono text-3xl font-black tracking-tighter text-purple-400">
                {`</`}
              </div>

              {/* Designed with Love - Floating Heart */}
              <motion.div
                animate={{
                  y: [-2, 2, -2],
                  scale: [1, 1.05, 1],
                  filter: [
                    "drop-shadow(0 0 1px #a855f7)",
                    "drop-shadow(0 0 4px #a855f7)",
                    "drop-shadow(0 0 1px #a855f7)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-3.5 -right-2 text-purple-500"
              >
                <Heart
                  className="h-5 w-5 fill-purple-600/60"
                  strokeWidth={1.5}
                />
              </motion.div>

              <div className="-ml-0.5 font-mono text-3xl font-black tracking-tighter text-purple-400">
                {`>`}
              </div>
            </div>

            {/* Premium Typography - Shimmer Text Reveal */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 0.8, duration: 1, ease: [0.65, 0, 0.35, 1] }}
            >
              <h1 className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-3xl font-bold tracking-[0.18em] text-transparent uppercase [text-shadow:0_0_10px_rgba(255,255,255,0.2)] md:text-4xl">
                POLAS
              </h1>
              {/* Premium Light-ray Sweep over the text */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  delay: 1.6,
                  duration: 2,
                  ease: "linear",
                  repeat: 0,
                }}
                className="absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Minimalist Signature Progress Indicator */}
          <div className="absolute bottom-16 flex flex-col items-center gap-3">
            <div className="h-px w-32 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.6, duration: 2.2, ease: "circIn" }}
                className="h-full w-full origin-left rounded-full bg-linear-to-r from-purple-600 via-white to-purple-600"
              />
            </div>
            <p className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground/50 uppercase">
              Designed with passion
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
