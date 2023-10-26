import React, { useEffect, useState } from 'react'
import { NotFound, PageWrapper, Pagination, Paragraph } from '../../components/_shared'
import { styled } from 'styled-components'
import { Function } from '../../helper'
import { Images } from '../../constants'
import { useNavigate } from 'react-router-dom'

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

const Index: React.FC = () => {
  const navigate = useNavigate()

  const [data, setData] = useState<Array<IPlanet>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const limit = 3

  useEffect(() => {
    const wishlist = Function.getLocalStorage('wishlist')
    setData(wishlist)
  }, [])

  // Calculate the starting index and ending index for the current page
  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit

  // Get the subset of data for the current page
  const currentPageData = data.slice(startIndex, endIndex)

  const totalPages = Math.ceil(data.length / limit)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onClickCard = (url: string) => {
    navigate('/planet-detail', { state: { url } })
  }

  if (data?.length === 0)
    return <NotFound title="No Wishlist Data" message="Start adding items to your wishlist!" />
  return (
    <PageWrapper>
      <ContainerPlanet>
        {currentPageData?.map((res, i) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageWrapper>
  )
}

export default Index
