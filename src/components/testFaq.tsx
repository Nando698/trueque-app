import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionUsage() {
  return (
    <>
      <div className="flex flex-col items-center text-center pt-10">
        <h1 className="text-2xl font-bold mb-4 font-sans">
          Preguntas Frecuentes
        </h1>
        <div className="space-y-6"></div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Cómo funciona el sistema de trueque en esta plataforma?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Los usuarios publican los objetos o servicios que desean
              intercambiar, y otros pueden proponer un trueque con lo que
              ofrecen a cambio.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Es necesario registrarse para usar la plataforma?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Sí, debes crear una cuenta para publicar, recibir propuestas y
              concretar intercambios.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                Qué tipo de cosas puedo intercambiar?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Puedes ofrecer objetos físicos, servicios, o experiencias, siempre
              que respeten nuestras políticas.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Cuánto tiempo permanece activa mi publicación?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Las publicaciones no tienen tiempo de expiración, por lo que
              puedes mantener tus publicaciones sin necesidad de estar pendiente
              a su renovación.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Hay alguna comisión por usar la plataforma?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              No, el servicio utilizado es gratuito y libre para todo el
              público.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Qué consejos me dan para tener un trueque exitoso?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Sé claro en tus descripciones, usa fotos reales, no cometas fraude
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10 pb-8">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#1F2937" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                Que debo hacer si inhabilitan mi usuario?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              En caso de que tu usuario sea bloqueado como penalización por
              infringir las normas, deberás mandar un mail para consultar sobre
              el estado de tu cuenta y si existe o no posibilidad de devolver la
              actividad de la misma
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
