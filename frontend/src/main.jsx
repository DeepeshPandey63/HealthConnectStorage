import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './contexts/AppContext.jsx'
import {SocketProvider} from './contexts/SocketProvider.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SocketProvider>
    <AppContextProvider>
      <App/>
    </AppContextProvider>
    </SocketProvider>
  </BrowserRouter>,
)
