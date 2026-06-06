"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
}: TypewriterProps) {
  type State = {
    currentWordIndex: number;
    currentText: string;
    isDeleting: boolean;
  };
  const [state, dispatch] = React.useReducer(
    (state: State, action: Partial<State>) => ({ ...state, ...action }),
    { currentWordIndex: 0, currentText: "", isDeleting: false },
  );
  const { currentWordIndex, currentText, isDeleting } = state;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const word = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        const newText = currentText.slice(0, -1);
        if (newText.length === 0) {
          dispatch({
            currentText: newText,
            isDeleting: false,
            currentWordIndex: (currentWordIndex + 1) % words.length,
          });
        } else {
          dispatch({ currentText: newText });
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        const newText = word.slice(0, currentText.length + 1);
        dispatch({ currentText: newText });
        if (newText.length === word.length) {
          timer = setTimeout(() => dispatch({ isDeleting: true }), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    words,
    currentWordIndex,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <span className="inline-block text-left text-primary-fixed dark:text-primary border-b-4 border-primary-fixed dark:border-primary transition-all duration-75">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
