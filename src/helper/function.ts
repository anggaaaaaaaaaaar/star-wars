const numberFormat = (value: number | string) => {
  if (isNaN(Number(value))) value = 0
  return new Intl.NumberFormat('en-US', {
    currency: 'IDR',
  }).format(Number(value))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key: string) {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  return item
}

export default { numberFormat, setLocalStorage, getLocalStorage }
