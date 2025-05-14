import React from "react";

const FAQContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center pb-10">
      <h1 className="text-2xl font-bold mb-4 font-sans">Preguntas Frecuentes</h1>
     <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">¿Cómo funciona el sistema de trueque en esta plataforma?</h3>
        <p className="text-base pl-2">Los usuarios publican los objetos o servicios que desean intercambiar, y otros pueden proponer un trueque con lo que ofrecen a cambio.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">¿Es necesario registrarse para usar la plataforma?</h3>
        <p className="text-base pl-2">Sí, debes crear una cuenta para publicar, recibir propuestas y concretar intercambios.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Qué tipo de cosas puedo intercambiar?</h3>
        <p className="text-base pl-2">Puedes ofrecer objetos físicos, servicios, o experiencias, siempre que respeten nuestras políticas.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">¿Cuánto tiempo permanece activa mi publicación?</h3>
        <p className="text-base pl-2">Las publicaciones no tienen tiempo de expiración, por lo que puedes mantener tus publicaciones sin necesidad de estar pendiente a su renovación.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">¿Hay alguna comisión por usar la plataforma?</h3>
        <p className="text-base pl-2">No, el servicio utilizado es gratuito y libre para todo el público.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">¿Qué consejos me dan para tener un trueque exitoso?</h3>
        <p className="text-base pl-2">Sé claro en tus descripciones, usa fotos reales, no cometas fraude</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Que debo hacer si inhabilitan mi usuario?</h3>
        <p className="text-base pl-2">En caso de que tu usuario sea bloqueado como penalización por infringir las normas, deberás mandar un mail para consultar sobre el estado de tu cuenta y si existe o no posibilidad de devolver la actividad de la misma</p>
      </div>
     </div>
    </div>
  );
};

export default FAQContent;
