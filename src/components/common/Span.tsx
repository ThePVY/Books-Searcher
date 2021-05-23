import styled from "styled-components";

interface IProps {
  fontWeight: string
  color: string
  fontSize: string
  fontFamily: string
}

type PropsT = Partial<Readonly<IProps>>

const Span = styled.span<PropsT>`
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${props => props.color || 'initial'};
  font-size: ${props => props.fontSize || '1rem'};
  font-family: ${props => props.fontFamily || 'sans-serif'};
`

export default Span