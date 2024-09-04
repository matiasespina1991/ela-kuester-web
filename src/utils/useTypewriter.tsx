import { useState, useEffect, useRef } from 'react';

const useTypewriter = (text: string, speed: number) => {
  const [displayText, setDisplayText] = useState('');
  const idx = useRef(0); // Ref para mantener el índice actual del carácter
  const displayTextRef = useRef(''); // Ref para mantener el texto acumulado

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (idx.current < text.length) {
        displayTextRef.current += text.charAt(idx.current); // Añadir el siguiente carácter
        setDisplayText(() => displayTextRef.current); // Actualizar el estado con el texto acumulado
        idx.current += 1; // Incrementar el índice
      } else {
        clearInterval(typingInterval); // Limpiar el intervalo cuando se completa el texto
      }
    }, speed);

    return () => {
      setDisplayText(''); // Reiniciar el texto cuando el efecto se desmonte
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
