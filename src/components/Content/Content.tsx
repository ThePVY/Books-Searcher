import { thunkCreator } from '@/redux/app-reducer'
import selector from '@/redux/selectors'
import { RootStateT } from '@/redux/store-redux'
import { Subscriber } from '@/utils/utils'

import { FC } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Preloader from '../common/Preloader'
import SinglePane from '../common/SinglePane/SinglePane'
import SearchForm from './SearchForm'
import SearchList from './SearchList'

const ContentWrapper = styled.div`
  box-sizing: border-box;
  grid-area: content;
  color: ${(props) => props.theme.colors.contentFg};
  margin: 1vh 1vw;
`

const CenteringDiv = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

interface IOwnProps {
  subscribeHint?: (fn: () => void) => void
}

type AppState = RootStateT['app']

interface IStateProps {
  pageSize: AppState['pageSize']
  pagesNum: AppState['pagesNum']
  currentPage: AppState['currentPage']
  itemsOnPage: AppState['itemsOnPage']
  searching: AppState['searching']
  lastQuery: AppState['lastQuery']
  searchCount: AppState['searchCount']
  uniqueTitles: AppState['uniqueTitles']
  onSnippetClickSC: Subscriber
  onNextClickSC: Subscriber
  onPrevClickSC: Subscriber
}

interface IDispatchProps {
  getAllBooks: (search: string) => Promise<void>
  getItemsOnPage: (page: number) => void
  getAdditionalInfo: () => Promise<void>
}

export type ContentPropsT = IOwnProps & IStateProps & IDispatchProps

const Content: FC<ContentPropsT> = (props) => {
  const {
    pageSize,
    pagesNum,
    currentPage,
    itemsOnPage,
    searching,
    searchCount,
    lastQuery,
    uniqueTitles,
    onSnippetClickSC,
    onNextClickSC,
    onPrevClickSC
  } = props
  const { getAllBooks, getItemsOnPage, subscribeHint } = props

  const onPageClick = (page: number) => {
    getItemsOnPage(page)
  }

  const searchFormProps = { subscribeHint, getAllBooks, lastQuery, uniqueTitles }
  const searchListMethods = { onPageClick }
  const searchListSubscribers = { onSnippetClickSC, onNextClickSC, onPrevClickSC }
  const searchListState = {
    pageSize,
    pagesNum,
    currentPage,
    itemsOnPage,
    searchCount,
    lastQuery
  }
  return (
    <ContentWrapper>
      <SinglePane>
        <SearchForm {...searchFormProps} />
        {!searching ? (
          <SearchList {...searchListState} {...searchListMethods} {...searchListSubscribers} />
        ) : (
          <CenteringDiv>
            <Preloader isFetching />
          </CenteringDiv>
        )}
      </SinglePane>
    </ContentWrapper>
  )
}

const mapStateToProps = (state: RootStateT): IStateProps => ({
  pageSize: selector.getPageSize(state),
  pagesNum: selector.getPagesNum(state),
  currentPage: selector.getCurrentPage(state),
  itemsOnPage: selector.getItemsOnPage(state),
  searching: selector.getIsSearching(state),
  lastQuery: selector.getLastQuery(state),
  searchCount: selector.getSearchCount(state),
  uniqueTitles: selector.getUniqueTitles(state),
  onSnippetClickSC: selector.subscribeControllers.onSnippetClick(state),
  onNextClickSC: selector.subscribeControllers.onNextClick(state),
  onPrevClickSC: selector.subscribeControllers.onPrevClick(state)
})

const dispatchToProps = thunkCreator

const connector = connect(mapStateToProps, dispatchToProps)

export default connector(Content)
