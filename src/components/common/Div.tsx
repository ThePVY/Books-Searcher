import styled from 'styled-components'

export interface IDiv {
  width: string
  height: string
  alignSelf: string
  margin: string
  padding: string
  textAlign: string
  color: string
  zIndex: string
}

type DivT = Readonly<Partial<IDiv>>

const Div = styled.div<DivT>`
  box-sizing: border-box;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  align-self: ${(props) => props.alignSelf || 'center'};
  margin: ${(props) => props.margin || '0px'};
  padding: ${(props) => props.padding || '0px'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || 'rgb(72, 78, 78)'};
  z-index: ${(props) => props.zIndex || 'unset'};
`

export default Div
