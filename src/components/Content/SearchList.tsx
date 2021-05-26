import { IEditionInfo } from '@/redux/app-reducer'
import { Subscriber } from '@/utils/utils'
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
  onSnippetClickSC: Subscriber
  onNextClickSC: Subscriber
  onPrevClickSC: Subscriber
}

const FlexSearchList = styled(FlexContainer)`
  height: fit-content;
  padding: 1rem 0;
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

function booksNotFound (items: ContentPropsT['itemsOnPage'], searchCount: number) {
  return !items.length && searchCount
}

const SearchList: FC<IOwnProps> = props => {
  const {
    itemsOnPage,
    pagesNum,
    currentPage,
    onPageClick,
    searchCount,
    lastQuery,
    onSnippetClickSC,
    onNextClickSC,
    onPrevClickSC
  } = props
  const [viewMode, setViewMode] = useState(false)
  const [viewContent, setViewContent] = useState(null as IEditionInfo)
  const closeViewPanel = () => setViewMode(false)

  const getNext = (item: IEditionInfo): IEditionInfo => {
    const nextIdx = itemsOnPage.indexOf(item) + 1
    return nextIdx === itemsOnPage.length - 1 ? itemsOnPage[0] : itemsOnPage[nextIdx]
  }
  const getPrev = (item: IEditionInfo): IEditionInfo => {
    const nextIdx = itemsOnPage.indexOf(item) - 1
    return nextIdx === -1 ? itemsOnPage[itemsOnPage.length - 1] : itemsOnPage[nextIdx]
  }
  const onNextClick = () => {
    setViewContent(getNext(viewContent))
    onNextClickSC.callObservers()
  }
  const onPrevClick = () => {
    setViewContent(getPrev(viewContent))
    onPrevClickSC.callObservers()
  }

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
          {itemsOnPage.map(item => {
            if (!item) return null
            const onSnippetClick = () => {
              setViewContent(item)
              setViewMode(true)
              onSnippetClickSC.callObservers()
            }
            return <BookSnippet key={item.isbn} bookInfo={item} onClick={onSnippetClick} />
          })}
        </FlexSearchList>
      )}
      {itemsOnPage.length !== 0 ? (
        <PagesList pagesCount={pagesNum} selectedPage={currentPage} onPageClick={onPageClick} />
      ) : null}
      <ViewPanel
        content={
          <InfoPane
            edition={viewContent}
            onSnippetClickSC={onSnippetClickSC}
            onNextClickSC={onNextClickSC}
            onPrevClickSC={onPrevClickSC}
          />
        }
        isShown={viewMode}
        onClose={closeViewPanel}
        fixed
        multiple
        onNext={onNextClick}
        onPrev={onPrevClick}
      />
    </>
  )
}

export default SearchList
