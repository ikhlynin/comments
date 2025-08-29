import { useEffect, useState, RefObject } from "react";

export function useSelectedText<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const [selectedText, setSelectedText] = useState("");

  const updateSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.anchorNode) {
      setSelectedText("");
      return;
    }
    const anchorNode = selection.anchorNode;
    if (ref.current && ref.current.contains(anchorNode)) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText("");
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", updateSelection);
    return () => document.removeEventListener("mouseup", updateSelection);
  }, [ref]);

  return [selectedText, setSelectedText] as const;
}
