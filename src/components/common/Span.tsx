import styled from "styled-components";

interface IProps {
  fontWeight: string
  color: string
}

type PropsT = Partial<Readonly<IProps>>

const Span = styled.span<PropsT>`
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${props => props.color || 'initial'};
`

export default Span