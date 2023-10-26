import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import {
  LoadingComponent,
  PageWrapper,
  Paragraph,
  Tooltip,
  WishlistButton,
} from '../../components/_shared'
import { Images } from '../../constants'
import { PlanerService } from '../../service'
import { Function } from '../../helper'

const ContainerPlanet = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ContainerDesc = styled.div`
  display: flex;
  gap: 10;
`

const Description = styled.div`
  flex: 1;
`

const ImageStyled = styled.img`
  width: 120%;
  height: auto;
`

const ImageContainer = styled.div`
  max-width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  /* overflow: hidden; */
`

const Icon = styled.img`
  width: 36px;
  height: 36px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-evenly;
`

const Column = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const initData = {
  name: '',
  rotation_period: '',
  orbital_period: '',
  diameter: '',
  climate: '',
  gravity: '',
  terrain: '',
  surface_water: '',
  population: '',
  residents: [],
  films: [],
  created: '',
  edited: '',
  url: '',
}

const Index: React.FC = () => {
  const { state } = useLocation()
  const wishlist = Function.getLocalStorage('wishlist')

  const [data, setData] = useState<IPlanet>(initData)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    PlanerService.getDetailPlanet(state.url)
      .then((res) => {
        console.log('res', res)
        setData(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onClickWishlist = (isActive: boolean) => {
    if (isActive) {
      // add wishlist
      let newWishlist = []
      if (wishlist !== null) {
        newWishlist = [...wishlist]
        const isExist = wishlist.find((r: IPlanet) => r.name === data.name)
        if (!isExist) newWishlist.push(data)
      } else {
        newWishlist.push(data)
      }
      Function.setLocalStorage('wishlist', newWishlist)
    } else {
      if (wishlist === null) return
      const updated = wishlist.filter((r: IPlanet) => r.name !== data.name)

      Function.setLocalStorage('wishlist', updated)
    }
  }

  const isWishlistActive = useMemo(() => {
    if (wishlist === null) return false
    const isExist = wishlist.find((r: IPlanet) => r.name === data.name)

    return isExist ? true : false
  }, [wishlist])

  if (loading) return <LoadingComponent />

  return (
    <PageWrapper>
      <WishlistButton onClick={onClickWishlist} isactive={isWishlistActive} />
      <ContainerPlanet>
        <Column>
          <div style={{ flex: 1 }}>
            <Paragraph style={{ fontSize: '3em' }} className="center">
              {data?.name.toUpperCase()}
            </Paragraph>
            <ContainerDesc>
              <Description>
                <Paragraph className="hanken opacity-half center">Films</Paragraph>
                <Paragraph className="hanken center">{data?.films?.length}</Paragraph>
              </Description>
              <Description>
                <Paragraph className="hanken opacity-half center">Residents</Paragraph>
                <Paragraph className="hanken center">{data?.residents.length}</Paragraph>
              </Description>
              <Description>
                <Paragraph className="hanken opacity-half center">Created</Paragraph>
                <Paragraph className="hanken center">
                  {dayjs(data?.created).format('YYYY-MM-DD')}
                </Paragraph>
              </Description>
            </ContainerDesc>
          </div>
        </Column>
        <Column>
          <div>
            <ImageContainer>
              <ImageStyled src={Images.PlanetPurple} alt={data?.name} />
            </ImageContainer>
            <Paragraph className="hanken center">
              {Function.numberFormat(data?.diameter)} KM
            </Paragraph>
          </div>
        </Column>
        <Column>
          <Container>
            <Row>
              <Tooltip text="Climate">
                <IconContainer>
                  <Icon src={Images.Climate} alt="climate" />
                  <Paragraph className="hanken center">{data.climate}</Paragraph>
                </IconContainer>
              </Tooltip>
              <Tooltip text="Gravity">
                <IconContainer>
                  <Icon src={Images.Gravity} alt="gravity" />
                  <Paragraph className="hanken center">{data.gravity}</Paragraph>
                </IconContainer>
              </Tooltip>
              <Tooltip text="Orbital Period">
                <IconContainer>
                  <Icon src={Images.Orbit} alt="orbital period" />
                  <Paragraph className="hanken center">{data.orbital_period}</Paragraph>
                </IconContainer>
              </Tooltip>
              <Tooltip text="Population">
                <IconContainer>
                  <Icon src={Images.Population} alt="population" />
                  <Paragraph className="hanken center">{data.population}</Paragraph>
                </IconContainer>
              </Tooltip>
            </Row>
            <Row>
              <Tooltip text="Rotation Period">
                <IconContainer>
                  <Icon src={Images.Rotation} alt="rotation" />
                  <Paragraph className="hanken center">{data.rotation_period}</Paragraph>
                </IconContainer>
              </Tooltip>
              <Tooltip text="Terrain">
                <IconContainer>
                  <Icon src={Images.Terrain} alt="terrain" />
                  <Paragraph className="hanken center wrap">{data.terrain}</Paragraph>
                </IconContainer>
              </Tooltip>
              <Tooltip text="Surface Water">
                <IconContainer>
                  <Icon src={Images.Surface} alt="surface" />
                  <Paragraph className="hanken center">{data.surface_water}</Paragraph>
                </IconContainer>
              </Tooltip>
            </Row>
          </Container>
        </Column>
      </ContainerPlanet>
    </PageWrapper>
  )
}

export default Index
