import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Mainlayout from './Components/Mainlayout'
import { Provider } from 'react-redux'
import store from './Store/store'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Mainlayout />
  </Provider>,
)
