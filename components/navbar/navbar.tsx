"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10; // minimum scroll in px to trigger hide/show

  const controlNavbar = () => {
    if (typeof window === "undefined") return;

    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY.current;

    if (scrollDifference > scrollThreshold && currentScrollY > 100) {
      // Scrolled down more than threshold
      setShow(false);
    } else if (scrollDifference < -scrollThreshold || currentScrollY < 100) {
      // Scrolled up more than threshold or near top
      setShow(true);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <div className='top-0 left-0 z-999 fixed shadow-xs backdrop-blur-xs p-3 w-full'>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.6 }}
          >
            <div className='mx-auto max-w-11/12 md:max-w-10/12'>
              <div className='flex justify-between font-semibold text-lg xl:text-xl'>
                <div>
                  <p>Logo</p>
                </div>
                <div className='hidden md:flex flex-row gap-8 xl:gap-12'>
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='hover:text-purple-600 transition-colors'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div>
                  <p>Let&apos;s Talk</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
