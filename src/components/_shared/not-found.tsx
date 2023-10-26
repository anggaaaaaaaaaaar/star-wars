import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
  color: white;
`

const Message = styled.p`
  font-size: 18px;
  color: white;
`

const Index: React.FC<{ title: string; message: string }> = ({ title, message }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Container>
  )
}

export default Index
