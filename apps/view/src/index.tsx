// @sctg/tracespace-view entry point
import React from 'react'
import './styles/index.css'

Promise.all([
  import('react-dom/client'),
  import('./App'),
  import('./state/StoreProvider'),
]).then((imports) => {
  const [{default: ReactDom}, {default: App}, {default: StoreProvider}] =
    imports

  ReactDom.createRoot(
    document.querySelector('[data-hook=root]') as Element
  ).render(
    <StoreProvider>
      <App />
    </StoreProvider>
  )
})
