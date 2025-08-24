"use client";

import AOS from "aos";
import { useEffect } from "react";

export default function Init() {
  useEffect(() => {
    AOS.init({ duration: 800, delay: 50 });
  }, []);

  return null;
}
