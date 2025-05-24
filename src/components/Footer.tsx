import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* logo */}
        <div className="text-center mb-6">
          <div className="text-lg font-semibold">True? que app!</div>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col items-center space-y-4 text-sm">
          <a href="/" className="hover:underline">
            Inicio
          </a>
          <a href="/faq" className="hover:underline">
            Preguntas Frecuentes
          </a>
          <a href="#" className="hover:underline">
            Contacto
          </a>
          <a href="#" className="hover:underline">
            Términos
          </a>
        </div>

        {/* Última Linea */}
        <div className="mt-6 border-t pt-4 text-xs text-center text-gray-500">
          © 2025 True? que app! Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;