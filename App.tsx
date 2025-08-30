import React, { useState } from 'react';
import { SpriteAnimator } from './components/SpriteAnimator';
import { DirectionalSpriteAnimator } from './components/DirectionalSpriteAnimator';

const SPRITESHEET_URLS = {
  up: 'https://raw.githubusercontent.com/Fenix44/ImageSpritesFenix/refs/heads/main/Peon-Orc-Pelle-DOS.png',
  right: 'https://raw.githubusercontent.com/Fenix44/ImageSpritesFenix/refs/heads/main/Peon-Orc-Pelle-DROITE.png',
  left: 'https://raw.githubusercontent.com/Fenix44/ImageSpritesFenix/refs/heads/main/Peon-Orc-Pelle-GAUCHE.png',
  down: 'https://raw.githubusercontent.com/Fenix44/ImageSpritesFenix/refs/heads/main/Peon-Orc-Pelle-FACE.png',
};

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [directionalSpriteUrl, setDirectionalSpriteUrl] = useState(SPRITESHEET_URLS.down);

  const toggleAnimation = () => {
    setIsPlaying(prev => !prev);
  };

  const ArrowButton = ({ direction, onClick, children }) => (
    <button
      onClick={onClick}
      aria-label={`Mover hacia ${direction}`}
      className="w-12 h-12 flex items-center justify-center font-semibold text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-300"
    >
      {children}
    </button>
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Animación de Spritesheet
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Un sprite de 7 fotogramas (64x64px) animado con React y Tailwind CSS.
        </p>
        <div className="flex justify-center items-center bg-gray-800/50 p-8 rounded-lg shadow-2xl border border-gray-700 mt-6 backdrop-blur-sm">
          <div className="flex items-center gap-8">
            <button
              onClick={toggleAnimation}
              aria-pressed={!isPlaying}
              className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-300"
            >
              {isPlaying ? 'Pausar' : 'Reanudar'}
            </button>
            <div className="[image-rendering:pixelated] [image-rendering:crisp-edges]">
              <SpriteAnimator isPlaying={isPlaying} />
            </div>
          </div>
        </div>

        {/* --- Sección para mostrar la hoja de sprites original --- */}
        <div className="pt-8 w-full max-w-lg mx-auto">
          <h2 className="text-lg text-gray-400 mb-2">Hoja de Sprites Original</h2>
          <div className="bg-gray-800 p-2 rounded-md border border-gray-700 inline-block">
             <img 
              src="https://raw.githubusercontent.com/Fenix44/ImageSpritesFenix/refs/heads/main/448-64-SpritesDocV1.png" 
              alt="Hoja de sprites completa con 7 fotogramas del personaje"
              className="[image-rendering:pixelated] [image-rendering:crisp-edges]"
            />
          </div>
           <p className="text-sm text-gray-500 pt-4">La primera animación se logra cambiando dinámicamente las clases de Tailwind para <code>background-position</code>.</p>
        </div>

        {/* --- Nueva Sección de Animación Interactiva --- */}
        <div className="pt-8 w-full max-w-lg mx-auto">
          <h2 className="text-lg text-gray-400 mb-4">Animación Interactiva</h2>
          <div className="inline-grid grid-cols-3 grid-rows-3 gap-2 items-center bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
            {/* Fila 1 */}
            <div className="col-start-2 flex justify-center">
               <ArrowButton direction="arriba" onClick={() => setDirectionalSpriteUrl(SPRITESHEET_URLS.up)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
               </ArrowButton>
            </div>
            
            {/* Fila 2 */}
            <div className="col-start-1 flex justify-center">
              <ArrowButton direction="izquierda" onClick={() => setDirectionalSpriteUrl(SPRITESHEET_URLS.left)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </ArrowButton>
            </div>
            <div className="col-start-2">
              <DirectionalSpriteAnimator spritesheetUrl={directionalSpriteUrl} />
            </div>
            <div className="col-start-3 flex justify-center">
              <ArrowButton direction="derecha" onClick={() => setDirectionalSpriteUrl(SPRITESHEET_URLS.right)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </ArrowButton>
            </div>

            {/* Fila 3 */}
            <div className="col-start-2 flex justify-center">
               <ArrowButton direction="abajo" onClick={() => setDirectionalSpriteUrl(SPRITESHEET_URLS.down)}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </ArrowButton>
            </div>
          </div>
          <p className="text-sm text-gray-500 pt-4">Haz clic en las flechas para cambiar la dirección de la animación del personaje.</p>
        </div>
      </div>
      <footer className="py-8 text-xs text-gray-600">
        <p>
          Creado por <a href="https://x.com/MKey2023" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">BuildWithAI</a> con React, TypeScript y Tailwind CSS
        </p>
      </footer>
    </main>
  );
}

export default App;