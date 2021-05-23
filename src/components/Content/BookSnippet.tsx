import { ItemTypeOf } from '@/types/common-types'
import { FC, ReactEventHandler, useState } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'
import Image from '../common/Image'
import Span from '../common/Span'
import { ContentPropsT } from './Content'
import defaultCover from '@/images/default-cover.jpg'

interface IBookSnippetProps {
  bookInfo: ItemTypeOf<ContentPropsT['itemsOnPage']>
  onClick: () => void
}

const BookSnippetWrapper = styled.div`
  width: 250px;
  height: 320px;
  margin: 1rem;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 10px;
  img {
    user-select: none;
  }
  &:hover {
    border-color: #aaa9a9;
  }
  div {
    text-align: center;
    padding: 0.2rem;
  }
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  * {
    color: #5f5f5f;
  }
`

const BookSnippet: FC<IBookSnippetProps> = (props) => {
  const [srcState, setSrcState] = useState('')
  const imageSrc = srcState || props.bookInfo?.mediumCover
  const checkSize: ReactEventHandler<HTMLImageElement> = (e) => {
    if (e.currentTarget.naturalWidth < 10) {
      setSrcState(defaultCover)
    }
  }
  return (
    <BookSnippetWrapper onClick={props.onClick}>
      <Div height="fit-content" width="fit-content" margin="0 auto">
        <Image onLoad={checkSize} height="183px" maxWidth="180px" src={imageSrc} alt="" />
      </Div>
      <Div height="fit-content">
        <Span fontSize="1.2rem" fontWeight="500">
          {props.bookInfo?.author}
        </Span>
      </Div>
      <Div height="fit-content">
        <Span fontFamily="serif" fontSize="1.1rem">
          {props.bookInfo?.title}
        </Span>
      </Div>
    </BookSnippetWrapper>
  )
}

export default BookSnippet
