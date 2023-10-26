import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.668);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`

const LoadingComponent: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default LoadingComponent
