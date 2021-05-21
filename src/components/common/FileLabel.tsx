import styled from 'styled-components'

const FileLabel = styled.label`
  input {
    display: none;
  }
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  color: rgb(39, 41, 41);
  padding: 5px;

  width: 100%;
  min-width: fit-content;

  border: 1px solid rgb(148, 148, 150);
  border-radius: 5px;

  font-family: sans-serif;
  font-size: 0.8em;
`

export default FileLabel
