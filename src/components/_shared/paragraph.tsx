import { styled } from 'styled-components'

const paragraph = styled.p`
  &.center {
    text-align: center;
  }

  &.opacity-half {
    opacity: 0.5;
  }

  &.hanken {
    font-family: 'Hanken Grotesk', sans-serif;
  }

  &.wrap {
    word-wrap: break-word;
  }

  color: white;
`

export default paragraph
