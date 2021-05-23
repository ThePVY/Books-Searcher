import styled from 'styled-components'

interface IImage {
  maxWidth: string
  width: string
  maxHeight: string
  height: string
  display: string
  margin: string
  padding: string
}

type ImageT = Readonly<Partial<IImage>>

const Image = styled.img<ImageT>`
  max-width: ${props => props.maxWidth || '100%'};
  width: ${props => props.width || 'auto'};
  max-height: ${props => props.maxHeight || '100%'};
  height: ${props => props.height || 'auto'};
  display: ${props => props.display || 'inline'};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`

export default Image
