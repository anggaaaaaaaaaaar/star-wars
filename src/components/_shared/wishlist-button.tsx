import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Images } from '../../constants'

const Button = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  padding: 8px;
  cursor: pointer;
`

const IconWishlist = styled.img`
  width: 25px;
  height: 25px;
`

type WishlistType = {
  onClick: (isActive: boolean) => void
  isactive: boolean
}

const WishlistButton: React.FunctionComponent<WishlistType> = ({ isactive = false, onClick }) => {
  const [isWishlistActive, setIsWishlistActive] = useState(false)

  useEffect(() => {
    setIsWishlistActive(isactive)
  }, [isactive])

  const handleToggleWishlist = () => {
    setIsWishlistActive(!isWishlistActive)
    onClick(!isWishlistActive)
  }

  return (
    <Button onClick={handleToggleWishlist}>
      <IconWishlist alt="wishlist" src={isWishlistActive ? Images.HeartRed : Images.HeartBlack} />
    </Button>
  )
}

export default WishlistButton
