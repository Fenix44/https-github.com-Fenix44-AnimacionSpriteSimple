import React, { useState } from 'react';
import { SpriteAnimator } from './components/SpriteAnimator';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAnimation = () => {
    setIsPlaying(prev => !prev);
  };

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
           <p className="text-sm text-gray-500 pt-4">La animación se logra cambiando dinámicamente las clases de Tailwind para <code>background-position</code>.</p>
        </div>
      </div>
      <footer className="absolute bottom-4 text-xs text-gray-600">
        <p>
          Creado por <a href="https://x.com/MKey2023" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">MKey2023</a> con React, TypeScript y Tailwind CSS
        </p>
      </footer>
    </main>
  );
}

export default App;