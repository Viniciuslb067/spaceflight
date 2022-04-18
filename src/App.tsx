import { AppProvider } from "./context"
import { PublicRoutes } from "./routes"

export const App = () => {

  return (
    <AppProvider>
      <PublicRoutes />  
    </AppProvider>
  )
}