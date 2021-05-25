import { thunkCreator } from '@/redux/app-reducer'
import selector from '@/redux/selectors'
import { RootStateT } from '@/redux/store-redux'

import { FC } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Preloader from '../common/Preloader'
import SinglePane from '../common/SinglePane/SinglePane'
import SearchForm from './SearchForm'
import SearchList from './SearchList'

interface IOwnProps {
  subscribeHint?: (fn: () => void) => void
}

interface IStateProps {
  pageSize: RootStateT['app']['pageSize']
  pagesNum: RootStateT['app']['pagesNum']
  currentPage: RootStateT['app']['currentPage']
  itemsOnPage: RootStateT['app']['itemsOnPage']
  searching: RootStateT['app']['searching']
  lastQuery: RootStateT['app']['lastQuery']
  searchCount: RootStateT['app']['searchCount']
  uniqueTitles: RootStateT['app']['uniqueTitles']
}

interface IDispatchProps {
  getAllBooks: (search: string) => Promise<void>
  getItemsOnPage: (page: number) => void
  getAdditionalInfo: () => Promise<void>
}

export type ContentPropsT = IOwnProps & IStateProps & IDispatchProps

const ContentWrapper = styled.div`
  box-sizing: border-box;
  grid-area: content;
  color: rgb(72, 78, 78);
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

const Content: FC<ContentPropsT> = props => {
  const {
    pageSize,
    pagesNum,
    currentPage,
    itemsOnPage,
    searching,
    searchCount,
    lastQuery,
    uniqueTitles
  } = props
  const { getAllBooks, getItemsOnPage, subscribeHint } = props

  const onPageClick = (page: number) => {
    getItemsOnPage(page)
  }

  const searchFormProps = { subscribeHint, getAllBooks, lastQuery, uniqueTitles }
  const searchListMethods = { onPageClick }
  const searchListState = { pageSize, pagesNum, currentPage, itemsOnPage, searchCount, lastQuery }
  return (
    <ContentWrapper>
      <SinglePane>
        <SearchForm {...searchFormProps} />
        {!searching ? (
          <SearchList {...searchListState} {...searchListMethods} />
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
  uniqueTitles: selector.getUniqueTitles(state)
})

const dispatchToProps = thunkCreator

const connector = connect(mapStateToProps, dispatchToProps)

export default connector(Content)
