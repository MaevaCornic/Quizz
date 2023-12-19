import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'

import './index.css'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import AppContextProvider from './components/AppContext'

// 2. Wrap ChakraProvider at the root of your app (dans le main)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppContextProvider >
        <App />
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
