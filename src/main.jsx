import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)


//step 7. add <UserProvider> component around app. to enable context for the app. now it will provide context to app component
// and its children. we'll define context in step 8.
