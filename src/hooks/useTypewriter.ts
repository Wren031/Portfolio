import { useState, useEffect } from "react";

export function useTypewriter(words: string[]) {
  const [idx, setIdx] = useState<number>(0);
  const [sub, setSub] = useState<number>(0);
  const [del, setDel] = useState<boolean>(false);

  useEffect(() => {
    const word = words[idx];
    const speed = del ? 50 : sub < word.length ? 90 : 1800;

    const timer = setTimeout(() => {
      if (!del && sub === word.length) {
        setDel(true);
      } else if (del && sub === 0) {
        setDel(false);
        setIdx((i) => (i + 1) % words.length);
      } else {
        setSub((s) => s + (del ? -1 : 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [sub, del, idx, words]);

  return words[idx].slice(0, sub); // ✅ RETURN VALUE
}