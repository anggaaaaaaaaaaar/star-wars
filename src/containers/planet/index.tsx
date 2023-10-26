import React, { useEffect, useState } from 'react'
import { LoadingComponent, PageWrapper, Paragraph } from '../../components/_shared'
import { styled } from 'styled-components'
import { PlanerService } from '../../service'
import { Images } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { Function } from '../../helper'
// import { FixedSizeList as List } from 'react-window'

type ResponseType = {
  count: number
  next: string
  previous: string | null
  results: Array<IPlanet>
}

const CardPlanet = styled.div`
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  cursor: pointer;
`
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

const ImageStyled = styled.img`
  width: 200px;
  height: auto;
`

const ImageContainer = styled.div`
  max-width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  /* overflow: hidden; */
`

const ContainerDesc = styled.div`
  display: flex;
  gap: 10;
`

const Description = styled.div`
  flex: 1;
`
// const initPlanet = {
//   name: '',
//   rotation_period: '',
//   orbital_period: '',
//   diameter: '',
//   climate: '',
//   gravity: '',
//   terrain: '',
//   surface_water: '',
//   population: '',
//   residents: [''],
//   films: [''],
//   created: '',
//   edited: '',
//   url: '',
// }

const initData = {
  count: 0,
  next: 'https://swapi.dev/api/planets',
  previous: null,
  results: [],
}

const Index: React.FC = () => {
  const navigate = useNavigate()

  const [data, setData] = useState<ResponseType>(initData)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(data)

  const fetchMoreData = () => {
    if (!data.next) return
    setIsLoading(true)
    PlanerService.getPlanet(data.next)
      .then((res) => {
        setData(res)
        // setData((prev) => ({ ...res, results: [...prev.results, res.results] }))
      })
      .catch((err) => {
        console.log('err', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchMoreData()
  }, [])

  const onClickCard = (url: string) => {
    navigate('/planet-detail', { state: { url } })
  }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }

  //   function handleScroll() {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       fetchMoreData()
  //     }
  //   }
  // }, [data])

  // const Row = ({ index, style }: { index: number; style: object }) => (
  //   <CardPlanet key={index} style={style}>
  //     <Paragraph className="center">{data.results[index].name}</Paragraph>
  //     <ImageContainer>
  //       <ImageStyled src={Images.Planet} alt={data.results[index]?.name} />
  //     </ImageContainer>
  //     <ContainerDesc>
  //       <Description>
  //         <Paragraph className="hanken opacity-half center">Diameter</Paragraph>
  //         <Paragraph className="hanken center">{data.results[index]?.diameter}</Paragraph>
  //       </Description>
  //       <Description>
  //         <Paragraph className="hanken opacity-half center">Climate</Paragraph>
  //         <Paragraph className="hanken center">{data.results[index]?.climate}</Paragraph>
  //       </Description>
  //       <Description>
  //         <Paragraph className="hanken opacity-half center">Terrain</Paragraph>
  //         <Paragraph className="hanken center">{data.results[index]?.terrain}</Paragraph>
  //       </Description>
  //     </ContainerDesc>
  //   </CardPlanet>
  // )

  if (isLoading) return <LoadingComponent />

  return (
    <PageWrapper>
      {/* <List height={800} itemCount={data?.count} itemSize={data?.count} width={1200}>
        {Row}
      </List> */}
      <ContainerPlanet>
        {data.results.map((res, i) => (
          <CardPlanet key={i} onClick={() => onClickCard(res.url)}>
            <Paragraph className="center">{res.name}</Paragraph>
            <ImageContainer>
              <ImageStyled src={Images.Planet} alt={res?.name} />
            </ImageContainer>
            <ContainerDesc>
              <Description>
                <Paragraph className="hanken opacity-half center">Diameter</Paragraph>
                <Paragraph className="hanken center">
                  {Function.numberFormat(res?.diameter)} km
                </Paragraph>
              </Description>
              <Description>
                <Paragraph className="hanken opacity-half center">Climate</Paragraph>
                <Paragraph className="hanken center">{res?.climate}</Paragraph>
              </Description>
              <Description>
                <Paragraph className="hanken opacity-half center">Terrain</Paragraph>
                <Paragraph className="hanken center">{res?.terrain}</Paragraph>
              </Description>
            </ContainerDesc>
          </CardPlanet>
        ))}
      </ContainerPlanet>
    </PageWrapper>
  )
}

export default Index
