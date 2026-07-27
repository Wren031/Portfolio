import { useState, useEffect } from "react";

interface Props {
  words: string[];
}

export default function TypeWriter({ words }: Props) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const speed = del ? 50 : sub < word.length ? 90 : 1800;

    const timer = setTimeout(() => {
      if (!del && sub === word.length) {
        setDel(true);
        return;
      }

      if (del && sub === 0) {
        setDel(false);
        setIdx((i) => (i + 1) % words.length);
        return;
      }

      setSub((s) => s + (del ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [sub, del, idx, words]);

  return (
    <span>
      {words[idx].slice(0, sub)}
      <span>|</span>
    </span>
  );
}