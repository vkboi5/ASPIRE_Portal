import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ChakraProvider } from "@chakra-ui/react";
// import theme from './theme'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ChakraProvider resetCss={false}>
        <Provider store={store}>
          <App />
          </Provider>
        <Toaster richColors />
      </ChakraProvider>
  </BrowserRouter>
)
