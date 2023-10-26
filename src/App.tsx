import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Header, Wrapper } from './components/_shared'
import { PlanetDetailScreen, PlanetScreen, WishlistScreen } from './containers'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetScreen />,
  },
  {
    path: '/planet-detail',
    element: <PlanetDetailScreen />,
  },
  {
    path: '/wishlist',
    element: <WishlistScreen />,
  },
])

function App() {
  return (
    <div>
      <Header />
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </div>
  )
}

export default App
