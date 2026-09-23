"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { JarvisIcon } from "./JarvisIcon";
import { JarvisChat } from "./JarvisChat";

export function Jarvis() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!open && <JarvisIcon onClick={() => setOpen(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {open && <JarvisChat onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
