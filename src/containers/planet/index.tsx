import React, { useEffect, useState } from 'react'
import { PlanerService } from '../../service'
import InfiniteList from './InfiniteList'
import { LoadingComponent, PageWrapper } from '../../components/_shared'

interface ResponseType {
  count: number
  next: string
  previous: string | null
  results: Array<IPlanet>
}

const initData = {
  count: 0,
  next: 'https://swapi.dev/api/planets',
  previous: null,
  results: [],
}

const Index: React.FC = () => {
  const [data, setData] = useState<ResponseType>(initData)
  const [loading, setLoading] = useState<boolean>(false)

  const concatUnique = (arr1: IPlanet[], arr2: IPlanet[], property: keyof IPlanet): IPlanet[] => {
    const uniqueSet = new Set(arr1.map((obj) => obj[property]))
    const result = arr1.slice()

    for (const obj of arr2) {
      if (!uniqueSet.has(obj[property])) {
        result.push(obj)
        uniqueSet.add(obj[property])
      }
    }

    return result
  }

  const fetchMoreData = async (startIndex: number, stopIndex: number) => {
    if (!data.next) return

    if (stopIndex % 3 === 0) {
      PlanerService.getPlanet(data.next)
        .then((res) => {
          setData((prev) => ({
            ...res,
            results: concatUnique(prev.results, res.results, 'name'),
          }))
        })
        .catch((err) => {
          console.log('err', err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchMoreData(0, 3)
  }, [])

  if (loading) return <LoadingComponent />
  return (
    <PageWrapper style={{ height: '80vh' }}>
      <InfiniteList items={data.results} loadMoreItems={fetchMoreData} />
    </PageWrapper>
  )
}

export default Index
