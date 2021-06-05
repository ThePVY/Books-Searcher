import EditionInfo from '@/mobx/edition-info'
import { RootStore } from '@/mobx/store'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import styled from 'styled-components'
import FlexContainer from '../common/FlexContainer'
import PagesList from '../common/PagesList/PagesList'
import ViewPanel from '../common/ViewPanel/ViewPanel'
import BookSnippet from './BookSnippet'
import InfoPanel from './InfoPanel'

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

interface IOwnProps {
  store: RootStore
}

function booksNotFound (items: EditionInfo[], searchCount: number) {
  return !items.length && searchCount
}

const SearchList: FC<IOwnProps> = observer(({ store }) => {
  const { itemsOnPage, pagesNum, currentPage, searchCount, lastQuery } = store.domainStore
  const { viewPanelMode, setViewContent } = store.uiStore

  const closeViewPanel = () => store.uiStore.setViewPanelMode(false)

  const getNext = (item: EditionInfo): EditionInfo => {
    const nextIdx = itemsOnPage.indexOf(item) + 1
    return nextIdx === itemsOnPage.length - 1 ? itemsOnPage[0] : itemsOnPage[nextIdx]
  }
  const getPrev = (item: EditionInfo): EditionInfo => {
    const nextIdx = itemsOnPage.indexOf(item) - 1
    return nextIdx === -1 ? itemsOnPage[itemsOnPage.length - 1] : itemsOnPage[nextIdx]
  }
  const onNextClick = () => {
    setViewContent(getNext(store.uiStore.viewContent))
  }
  const onPrevClick = () => {
    setViewContent(getPrev(store.uiStore.viewContent))
  }
  const onPageClick = (page: number) => {
    store.domainStore.setCurrentPage(page)
    store.domainStore.getAdditionalInfo()
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
          {itemsOnPage.map((item) => {
            if (!item) return null
            const onSnippetClick = () => {
              store.uiStore.setViewContent(item)
              store.uiStore.setViewPanelMode(true)
            }
            return <BookSnippet key={item.isbn} onClick={onSnippetClick} editionInfo={item} />
          })}
        </FlexSearchList>
      )}
      {itemsOnPage.length !== 0 ? (
        <PagesList pagesCount={pagesNum} selectedPage={currentPage} onPageClick={onPageClick} />
      ) : null}
      <ViewPanel
        content={<InfoPanel store={store} />}
        isShown={viewPanelMode}
        onClose={closeViewPanel}
        fixed
        multiple
        onNext={onNextClick}
        onPrev={onPrevClick}
      />
    </>
  )
})

export default SearchList
