import { API } from '..'

const getPlanet = async (url: string) => await API.get({ url })

const getDetailPlanet = async (url: string) => await API.get({ url })

export default { getPlanet, getDetailPlanet }
