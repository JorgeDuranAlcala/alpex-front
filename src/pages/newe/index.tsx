
import BlankLayout from "@/@core/layouts/BlankLayout";
import { Box } from "@mui/material";
import dynamic from 'next/dynamic';

// * Resuelve window is not defined
const DynamicChatBot = dynamic(() => import('@/layouts/components/widgetChat'), {
  ssr: false,
  loading: () => <p>Loading ChatBot...</p>,
})

// * Se crea el componente de la página
const NewePage = () => null

// * Se agrega la propiedad getLayout para renderizar un Layout personalizado
NewePage.getLayout = () => (
  <BlankLayout>
    <Box>
      <DynamicChatBot />
    </Box>
  </BlankLayout>
)

// * Se agrega la propiedad guestGuard para que no se redireccione a login
NewePage.guestGuard = true;

export default NewePage
