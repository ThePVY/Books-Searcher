import { FC, useState } from 'react'
import styled from 'styled-components'
import FlexContainer from '../common/FlexContainer'
import PagesList from '../common/PagesList/PagesList'
import ViewPanel from '../common/ViewPanel/ViewPanel'
import BookSnippet from './BookSnippet'
import { ContentPropsT } from './Content'
import InfoPane from './InfoPane'

interface IOwnProps {
  pageSize: ContentPropsT['pageSize']
  pagesNum: ContentPropsT['pagesNum']
  currentPage: ContentPropsT['currentPage']
  itemsOnPage: ContentPropsT['itemsOnPage']
  onPageClick: (page: number) => void
  lastQuery: ContentPropsT['lastQuery']
  searchCount: ContentPropsT['searchCount']
}

const FlexSearchList = styled(FlexContainer)`
  height: fit-content;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const CenteringDiv = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  text-align: center;
`

function booksNotFound(items: ContentPropsT['itemsOnPage'], searchCount: number) {
  return !items.length && searchCount
}

const SearchList: FC<IOwnProps> = (props) => {
  const { itemsOnPage, pagesNum, currentPage, onPageClick, searchCount, lastQuery } = props
  const [viewMode, setViewMode] = useState(false)
  const [viewContent, setViewContent] = useState(null as JSX.Element)
  const closeViewPanel = () => setViewMode(false)
  return (
    <>
      {itemsOnPage.length !== 0 ? (
        <PagesList pagesCount={pagesNum} selectedPage={currentPage} onPageClick={onPageClick} />
      ) : null}
      {booksNotFound(itemsOnPage, searchCount) ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <CenteringDiv>No books found on "{lastQuery}"</CenteringDiv>
      ) : (
        <FlexSearchList>
          {itemsOnPage.map((item) => {
            if (!item) return null
            const onSnippetClick = () => {
              setViewContent(<InfoPane edition={item} />)
              setViewMode(true)
            }
            return <BookSnippet key={item.isbn} bookInfo={item} onClick={onSnippetClick} />
          })}
        </FlexSearchList>
      )}
      <ViewPanel content={viewContent} isShown={viewMode} onClose={closeViewPanel} fixed />
    </>
  )
}

export default SearchList
