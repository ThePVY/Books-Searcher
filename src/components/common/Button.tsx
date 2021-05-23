import styled from 'styled-components'

interface IProps {
  flex: string
}

type PropsT = Readonly<Partial<IProps>>

const Button = styled.button<PropsT>`
  background-color: rgb(255, 255, 255);
  color: rgb(39, 41, 41);
  cursor: pointer;
  width: 100%;
  min-width: fit-content;
  border: 1px solid rgb(148, 148, 150);
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

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

export default Button
