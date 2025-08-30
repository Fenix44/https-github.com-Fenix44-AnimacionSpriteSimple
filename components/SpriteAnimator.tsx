import React, { useState, useEffect } from 'react';

// --- CONSTANTES DE CONFIGURACIÓN DE LA ANIMACIÓN ---

// El número total de fotogramas (imágenes individuales) en nuestra hoja de sprites.
const FRAME_COUNT = 7;
// Fotogramas Por Segundo (FPS). Controla la velocidad de la animación.
// Un valor más alto significa una animación más rápida y fluida.
const FPS = 8;

// --- CLASES DE POSICIÓN PARA CADA FOTOGRAMA ---

// Tailwind CSS utiliza un compilador Just-In-Time (JIT) que escanea el código fuente
// en busca de nombres de clase completos para generar el CSS necesario.
// Por esta razón, no podemos construir clases dinámicamente con interpolación de cadenas
// como `bg-[-${frame * 64}px_0px]`. En su lugar, definimos una lista de todas las clases
// posibles que se usarán, asegurando que Tailwind las detecte y las genere.
// Cada clase mueve la posición del fondo (la hoja de sprites) hacia la izquierda en 64px,
// mostrando el siguiente fotograma dentro del contenedor de 64x64px.
const FRAME_POSITION_CLASSES = [
  'bg-[0px_0px]',    // Muestra el fotograma 1
  'bg-[-64px_0px]',   // Muestra el fotograma 2
  'bg-[-128px_0px]',  // Muestra el fotograma 3
  'bg-[-192px_0px]',  // Muestra el fotograma 4
  'bg-[-256px_0px]',  // Muestra el fotograma 5
  'bg-[-320px_0px]',  // Muestra el fotograma 6
  'bg-[-384px_0px]',  // Muestra el fotograma 7
];

/**
 * Props para el componente SpriteAnimator.
 */
interface SpriteAnimatorProps {
  isPlaying: boolean;
}

/**
 * Componente que renderiza y anima un sprite.
 */
export const SpriteAnimator: React.FC<SpriteAnimatorProps> = ({ isPlaying }) => {
  // --- ESTADO DEL COMPONENTE ---
  // Se utiliza el hook `useState` para mantener un registro del fotograma actual que se debe mostrar.
  // `frame` es un número que va de 0 a 6 (FRAME_COUNT - 1).
  const [frame, setFrame] = useState(0);

  // --- LÓGICA DE LA ANIMACIÓN ---
  // El hook `useEffect` se utiliza para ejecutar código con efectos secundarios.
  // Ahora depende de `isPlaying` para iniciar o detener la animación.
  useEffect(() => {
    // Si la animación no está en reproducción, no hacemos nada.
    if (!isPlaying) {
      return;
    }

    // `setInterval` ejecuta el bucle de animación.
    const animationInterval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
    }, 1000 / FPS);

    // --- LIMPIEZA DEL EFECTO ---
    // La función de limpieza se ejecuta cuando `isPlaying` cambia a `false` o cuando
    // el componente se desmonta, deteniendo el intervalo para evitar fugas de memoria.
    return () => clearInterval(animationInterval);
  }, [isPlaying]); // El array de dependencias `[isPlaying]` hace que este efecto se
                    // vuelva a ejecutar cada vez que el valor de `isPlaying` cambia.

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div
      // Atributos de accesibilidad para que los lectores de pantalla
      // identifiquen este elemento como una imagen con una descripción.
      role="img"
      aria-label="Sprite animado de un personaje"
      // Clases de Tailwind CSS para estilizar el contenedor del sprite.
      className={`
        w-[64px] h-[64px] 
        bg-no-repeat 
        bg-[url('https://raw.githubusercontent.com/Fenix44/ImageSpritesFenix/refs/heads/main/448-64-SpritesDocV1.png')]
        ${FRAME_POSITION_CLASSES[frame]}
      `}
    />
  );
};