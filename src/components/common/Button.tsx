import styled, { css } from 'styled-components'

interface IProps {
  flex: string
}

type PropsT = Readonly<Partial<IProps>>

const Button = styled.button<PropsT>`
  ${({ theme: { colors } }) =>
    css`
      background-color: ${colors.appBg};
      border: 1px solid ${colors.appBg};
      color: ${colors.appFg};
      &:disabled {
        background-color: ${`${colors.appBg}77`};
        border-color: ${`${colors.appBg}77`};
        color: ${`${colors.appFg}77`};
        cursor: default;
      }
    `};
  cursor: pointer;
  width: 100%;
  min-width: fit-content;
  border-radius: 5px;
  font-size: 0.8em;
  font-family: sans-serif;
  user-select: none;

  font-size: 14px;
  padding: 0.3em 0.5em;
  line-height: 1.5em;
  outline: none;
  resize: none;

  flex: ${(props) => props.flex || 'auto'};
`

export default Button
