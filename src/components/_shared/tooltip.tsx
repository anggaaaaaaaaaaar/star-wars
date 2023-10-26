import React, { ReactNode } from 'react'
import styled from 'styled-components'

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipText = styled.div`
  font-family: 'Hanken Grotesk', sans-serif;
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    opacity: 1;
  }
`

interface TooltipProps {
  text: string
  children: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipText>{text}</TooltipText>
    </TooltipContainer>
  )
}

export default Tooltip
