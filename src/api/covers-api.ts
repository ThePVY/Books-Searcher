import { openLibraryAxios } from './search-api'

export interface CoverData {
  src: string
}

class CoversAPI {
  getCover(isbn: string, size: 'S' | 'M' | 'L'): Promise<CoverData> {
    return openLibraryAxios
      .get<CoverData>(getCoverUrl(isbn, size))
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        console.log(error)
        return null as CoverData
      })
  }
}

export const getCoverUrl = (isbn: string, size: 'S' | 'M' | 'L'): string => {
  return `http://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`
}

const coversAPI = new CoversAPI()

export default coversAPI
