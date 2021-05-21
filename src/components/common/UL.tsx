import styled from 'styled-components'

interface IProps {
  styleType: string
  margin: string
  padding: string
}

type PropsT = Partial<Readonly<IProps>>

const UL = styled.ul<PropsT>`
  list-style-type: ${(props) => props.styleType || 'none'};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
`

export default UL
