import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import userReducer from '../../reducers/userReducer'
import { productReducer } from '../../reducers/productReducer'

function render(
  ui,
  {
    preloadedState,
      store = configureStore({
          reducer: {
              userReducer,
              productReducer
          }, preloadedState
      }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }