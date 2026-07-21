import React, { useEffect, useState } from 'react';

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
  className?: string;
}

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay,
  triggered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!triggered) {
      setDisplayText('');
      setHasStarted(false);
      return;
    }

    const timer = setTimeout(() => {
      setHasStarted(true);
      let frame = 0;
      const totalChars = text.length;

      const interval = setInterval(() => {
        frame++;
        const revealCursor = frame * 0.5; // 0.5 chars/frame

        if (revealCursor >= totalChars + 3) {
          setDisplayText(text);
          clearInterval(interval);
          return;
        }

        let currentResult = '';
        for (let i = 0; i < totalChars; i++) {
          if (text[i] === ' ') {
            currentResult += ' ';
          } else if (i < Math.floor(revealCursor)) {
            currentResult += text[i];
          } else if (i < Math.floor(revealCursor) + 3) {
            const randomChar = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
            currentResult += randomChar;
          } else {
            // characters beyond that are empty
            break;
          }
        }
        setDisplayText(currentResult);
      }, 25); // every 25ms

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [triggered, delay, text]);

  if (!triggered || (!hasStarted && displayText === '')) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
  }

  return <span className={className}>{displayText}</span>;
};
