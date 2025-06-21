// src/components/Terminos.tsx
import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Terminos: React.FC = () => (
  <Container maxWidth="md" sx={{ my: 4 }}>
    <Typography variant="h4" gutterBottom>
      Términos y Condiciones
    </Typography>
    <Typography variant="subtitle2" gutterBottom>
      Última actualización: 20 de junio de 2025
    </Typography>
    <Typography variant="body1" paragraph>
      Al acceder y usar Trueque-App (el “Sitio” o la “App”), aceptás estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, no uses la plataforma.
    </Typography>

    <Typography variant="h6" gutterBottom>
      1. Registro y cuenta
    </Typography>
    <ul>
      <li>
        <Typography variant="body1">
          Debés crear una cuenta con datos reales.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Sos responsable de mantener la confidencialidad de tu contraseña.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Cualquier actividad bajo tu cuenta es tuya; notificanos de inmediato si detectás uso no autorizado.
        </Typography>
      </li>
    </ul>

    <Typography variant="h6" gutterBottom>
      2. Uso de la plataforma
    </Typography>
    <Typography variant="body1" paragraph>
      La App sirve exclusivamente para publicar ofertas, marcar favoritos, reportar contenido y hacer ofrecimientos. Está prohibido usar la plataforma para fines ilícitos, spam o acosar a otros usuarios.
    </Typography>

    <Typography variant="h6" gutterBottom>
      3. Ofertas y contraofertas
    </Typography>
    <ul>
      <li>
        <Typography variant="body1">
          Toda oferta publicada es responsabilidad de quien la crea.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          No podés contraofertar tu propia oferta.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Cuando aceptás un ofrecimiento, la oferta pasa a <strong>FINALIZADA</strong> automáticamente.
        </Typography>
      </li>
    </ul>

    <Typography variant="h6" gutterBottom>
      4. Favoritos y reportes
    </Typography>
    <ul>
      <li>
        <Typography variant="body1">
          Podés marcar como favorito cualquier oferta activa.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Los reportes de contenido inapropiado deben incluir un motivo válido.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          El equipo se reserva el derecho de eliminar o sancionar usuarios por reportes fundados.
        </Typography>
      </li>
    </ul>

    <Typography variant="h6" gutterBottom>
      5. Contenido de usuario
    </Typography>
    <Typography variant="body1" paragraph>
      Conservás todos los derechos de tu contenido (textos, imágenes). Al publicar, nos otorgás una licencia no exclusiva para mostrarlo en la App. No permitís contenido protegido por terceros sin autorización.
    </Typography>

    <Typography variant="h6" gutterBottom>
      6. Protección de datos
    </Typography>
    <ul>
      <li>
        <Typography variant="body1">
          Tratamos tus datos conforme a nuestra Política de Privacidad .
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          La contraseña se guarda de forma segura (hash + salt).
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Podés solicitar la eliminación de tu cuenta y datos en cualquier momento.
        </Typography>
      </li>
    </ul>

    <Typography variant="h6" gutterBottom>
      7. Limitación de responsabilidad
    </Typography>
    <Typography variant="body1" paragraph>
      La App se ofrece “tal cual” y “según disponibilidad”. No garantizamos la veracidad de las ofertas ni la conducta de los usuarios. En ningún caso seremos responsables por daños indirectos, lucro cesante o pérdida de datos.
    </Typography>

    <Typography variant="h6" gutterBottom>
      8. Suspensión y terminación
    </Typography>
    <ul>
      <li>
        <Typography variant="body1">
          Podemos suspender o cerrar tu cuenta por violar estos Términos o por mal uso.
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Vos podés eliminar tu cuenta desde tu perfil; tus datos e histórico se borrarán.
        </Typography>
      </li>
    </ul>

    <Typography variant="h6" gutterBottom>
      9. Cambios en los Términos
    </Typography>
    <Typography variant="body1" paragraph>
      Nos reservamos el derecho de modificar estos Términos en cualquier momento. Avisaremos con 7 días de antelación para cambios sustanciales; el uso continuado implica aceptación.
    </Typography>

    <Typography variant="h6" gutterBottom>
      10. Ley aplicable y jurisdicción
    </Typography>
    <Typography variant="body1" paragraph>
      Estos Términos se rigen por las leyes de la República Argentina. Cualquier disputa se somete a los tribunales de la Ciudad de Buenos Aires, renunciando a otro fuero.
    </Typography>

    <Typography variant="body1">
      Para consultas, escribinos a <Link href="mailto:soporte@trueque-app.com">soporte@trueque-app.com</Link>.
    </Typography>
  </Container>
);

export default Terminos;
