import styled from 'styled-components'
import Div from './Div'

interface IFlex {
  wrap: string
  dir: string
  jstfSelf: string
  jstfCnt: string
  algnItems: string
}

type FlexT = Readonly<Partial<IFlex>>

const FlexContainer = styled(Div)<FlexT>`
  display: flex;
  flex-wrap: ${props => props.wrap || 'nowrap'};
  flex-direction: ${props => props.dir || 'row'};
  justify-self: ${props => props.jstfSelf || 'flex-start'};
  justify-content: ${props => props.jstfCnt || 'stretch'};
  align-items: ${props => props.algnItems || 'stretch'};
`

export default FlexContainer
