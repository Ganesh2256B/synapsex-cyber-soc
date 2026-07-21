import React, { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  isHovered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalChars = text.length;

    const interval = setInterval(() => {
      frame++;
      // reveals left-to-right at 4 frames/char (1 char revealed every 4 frames)
      const revealedCount = Math.floor(frame / 4);

      if (revealedCount >= totalChars) {
        setDisplayText(text);
        clearInterval(interval);
        return;
      }

      let result = '';
      for (let i = 0; i < totalChars; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
        }
      }
      setDisplayText(result);
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
};
