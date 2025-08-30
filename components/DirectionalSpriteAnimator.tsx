import React, { useState, useEffect } from 'react';

// --- CONSTANTES DE CONFIGURACIÓN DE LA ANIMACIÓN ---
const FRAME_COUNT = 8;
const FPS = 8;

// --- CLASES DE POSICIÓN PARA CADA FOTOGRAMA ---
// Como el sprite tiene 8 fotogramas, definimos 8 clases de posición.
const FRAME_POSITION_CLASSES = [
  'bg-[0px_0px]',    // Muestra el fotograma 1
  'bg-[-64px_0px]',   // Muestra el fotograma 2
  'bg-[-128px_0px]',  // Muestra el fotograma 3
  'bg-[-192px_0px]',  // Muestra el fotograma 4
  'bg-[-256px_0px]',  // Muestra el fotograma 5
  'bg-[-320px_0px]',  // Muestra el fotograma 6
  'bg-[-384px_0px]',  // Muestra el fotograma 7
  'bg-[-448px_0px]',  // Muestra el fotograma 8
];

/**
 * Props para el componente DirectionalSpriteAnimator.
 */
interface DirectionalSpriteAnimatorProps {
  spritesheetUrl: string;
}

/**
 * Componente que renderiza un sprite cuya hoja de sprites puede cambiar dinámicamente.
 */
export const DirectionalSpriteAnimator: React.FC<DirectionalSpriteAnimatorProps> = ({ spritesheetUrl }) => {
  const [frame, setFrame] = useState(0);

  // Efecto para el bucle de animación. Se ejecuta una vez cuando el componente se monta.
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
    }, 1000 / FPS);

    return () => clearInterval(animationInterval);
  }, []); // El array de dependencias vacío asegura que se ejecute solo al montar/desmontar.

  // Efecto para reiniciar la animación cuando la hoja de sprites cambia.
  // Esto evita un salto visual al cambiar de dirección.
  useEffect(() => {
    setFrame(0);
  }, [spritesheetUrl]);

  return (
    <div
      role="img"
      aria-label="Sprite animado de un orco peón"
      // Se utiliza un estilo en línea para la imagen de fondo, ya que la URL es dinámica
      // y Tailwind no puede generar clases para URLs variables en tiempo de compilación.
      style={{ backgroundImage: `url(${spritesheetUrl})` }}
      className={`
        w-[64px] h-[64px]
        bg-no-repeat
        [image-rendering:pixelated]
        [image-rendering:crisp-edges]
        ${FRAME_POSITION_CLASSES[frame]}
      `}
    />
  );
};
