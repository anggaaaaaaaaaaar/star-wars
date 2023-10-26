import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import { styled } from 'styled-components'
import { Paragraph } from '../../components/_shared'
import { Images } from '../../constants'
import { Function } from '../../helper'
import { useNavigate } from 'react-router-dom'

// Your item component
interface ItemProps {
  data: { items: IPlanet[]; onClick: (url: string) => void }
  index: number
  style: React.CSSProperties
}

interface IAutoSize {
  height: number | string
  width: number | string
}

interface IRender {
  visibleStopIndex: number
  visibleStartIndex: number
  overscanStartIndex: number
  overscanStopIndex: number
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
  margin-top: 10px;

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
`

const ContainerDesc = styled.div`
  display: flex;
  gap: 10;
`

const Description = styled.div`
  flex: 1;
`

const Item: React.FC<ItemProps> = ({ data, index, style }) => {
  const colA = data.items[index * 3]
  const colB = data.items[index * 3 + 1]
  const colC = data.items[index * 3 + 2]

  const padding = index == 0 ? 0 : 50 * index

  return (
    <ContainerPlanet style={{ ...style, top: `${padding + Number(style?.top)}px` }}>
      {colA && (
        <CardPlanet onClick={() => data.onClick(colA.url)}>
          <Paragraph className="center">{colA?.name}</Paragraph>
          <ImageContainer>
            <ImageStyled src={Images.Planet} alt={colA?.name} />
          </ImageContainer>
          <ContainerDesc>
            <Description>
              <Paragraph className="hanken opacity-half center">Diameter</Paragraph>
              <Paragraph className="hanken center">
                {Function.numberFormat(colA?.diameter)} km
              </Paragraph>
            </Description>
            <Description>
              <Paragraph className="hanken opacity-half center">Climate</Paragraph>
              <Paragraph className="hanken center">{colA?.climate}</Paragraph>
            </Description>
            <Description>
              <Paragraph className="hanken opacity-half center">Terrain</Paragraph>
              <Paragraph className="hanken center">{colA?.terrain}</Paragraph>
            </Description>
          </ContainerDesc>
        </CardPlanet>
      )}

      {colB && (
        <CardPlanet onClick={() => data.onClick(colB.url)}>
          <Paragraph className="center">{colB?.name}</Paragraph>
          <ImageContainer>
            <ImageStyled src={Images.Planet} alt={colB?.name} />
          </ImageContainer>
          <ContainerDesc>
            <Description>
              <Paragraph className="hanken opacity-half center">Diameter</Paragraph>
              <Paragraph className="hanken center">
                {Function.numberFormat(colB?.diameter)} km
              </Paragraph>
            </Description>
            <Description>
              <Paragraph className="hanken opacity-half center">Climate</Paragraph>
              <Paragraph className="hanken center">{colB?.climate}</Paragraph>
            </Description>
            <Description>
              <Paragraph className="hanken opacity-half center">Terrain</Paragraph>
              <Paragraph className="hanken center">{colB?.terrain}</Paragraph>
            </Description>
          </ContainerDesc>
        </CardPlanet>
      )}

      {colC && (
        <CardPlanet onClick={() => data.onClick(colC.url)}>
          <Paragraph className="center">{colC?.name}</Paragraph>
          <ImageContainer>
            <ImageStyled src={Images.Planet} alt={colC?.name} />
          </ImageContainer>
          <ContainerDesc>
            <Description>
              <Paragraph className="hanken opacity-half center">Diameter</Paragraph>
              <Paragraph className="hanken center">
                {Function.numberFormat(colC?.diameter)} km
              </Paragraph>
            </Description>
            <Description>
              <Paragraph className="hanken opacity-half center">Climate</Paragraph>
              <Paragraph className="hanken center">{colC?.climate}</Paragraph>
            </Description>
            <Description>
              <Paragraph className="hanken opacity-half center">Terrain</Paragraph>
              <Paragraph className="hanken center">{colC?.terrain}</Paragraph>
            </Description>
          </ContainerDesc>
        </CardPlanet>
      )}
    </ContainerPlanet>
  )
}

interface InfiniteListProps {
  items: IPlanet[]
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>
}

const InfiniteList: React.FC<InfiniteListProps> = ({ items, loadMoreItems }) => {
  const navigate = useNavigate()
  const itemCount = Math.ceil(items.length / 3)

  const onItemsRendered = ({ visibleStopIndex, visibleStartIndex }: IRender) => {
    loadMoreItems(visibleStartIndex, visibleStopIndex)
  }

  const onClickCard = (url: string) => {
    navigate('/planet-detail', { state: { url } })
  }

  return (
    <AutoSizer>
      {({ height, width }: IAutoSize) => (
        <List
          itemData={{ items, onClick: onClickCard }}
          itemCount={itemCount}
          itemSize={440}
          height={height}
          width={width}
          onItemsRendered={onItemsRendered}>
          {Item}
        </List>
      )}
    </AutoSizer>
  )
}

export default InfiniteList
