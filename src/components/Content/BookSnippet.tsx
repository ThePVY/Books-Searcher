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
  background-color: white;
  padding-top: .5rem;
  margin-bottom: .5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all .3s ease-in;
  img {
    user-select: none;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transform: translate3d(0px, -2px, 0px);
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
  @media screen and (max-width: 768px) {
    height: 300px;
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
  const OnClickHandler = () => {
    props.onClick();
  }
  return (
    <BookSnippetWrapper onClick={OnClickHandler}>
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
