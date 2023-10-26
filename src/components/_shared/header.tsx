import styled from 'styled-components'

const HeaderContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`

const Menu = styled.ul`
  list-style-type: none;
  display: flex;
`

const MenuItem = styled.li`
  margin: 0 10px;
  cursor: pointer;
`

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Stars wars</h1>
      <Menu>
        <MenuItem>Planet</MenuItem>
        <MenuItem>Wishlist</MenuItem>
      </Menu>
    </HeaderContainer>
  )
}

export default Header
