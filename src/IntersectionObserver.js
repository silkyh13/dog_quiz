import React, { useState, useEffect } from "react";

export default function Observer(ref, rootMargin = "0px") {
  //stores if intersection a target element happened
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersected(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    ref.current && observer.observe(ref.current);
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return intersected;
}
