import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './Context/Mycontext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
   <Provider>
    <ContextProvider>
      <App />
    </ContextProvider>
   </Provider>
  </BrowserRouter>
  </StrictMode>,
)
