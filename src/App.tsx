import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Header, Wrapper } from './components/_shared'
import { PlanetScreen } from './containers'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetScreen />,
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
