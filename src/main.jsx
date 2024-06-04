import React from 'react'
import ReactDOM from 'react-dom/client'

// import { PrimeReactProvider } from 'primereact/api'
// import 'primereact/resources/themes/lara-dark-blue/theme.css'
// import 'primereact/resources/themes/lara-light-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'

import { Toaster } from 'react-hot-toast'

import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.jsx'
import './index.css'

import { Provider as ReduxProvider } from 'react-redux'
import Store from './store'

import { fetchOnlinePlayers, fetchActiveQuests } from '@/fantasy/stores/fantasy'
import { FantasyContextProvider } from '@/fantasy/context'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

async function main()
{

  // const dispatch = useDispatch()
  Store.dispatch( fetchOnlinePlayers() )
  // Store.dispatch( fetchActiveQuests() )

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <FantasyContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={Store}>

            <App />
            <Toaster position='top-center' toastOptions={{ className: 'text-bg-dark' }} />

          
          </ReduxProvider>
          <ReactQueryDevtools initialIsOpen={ false } />
        </QueryClientProvider>
      </FantasyContextProvider>
    </React.StrictMode>,
  )
}

main()

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <App />
// )


