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

interface IStateProps {
  pageSize: RootStateT['app']['pageSize']
  pagesNum: RootStateT['app']['pagesNum']
  currentPage: RootStateT['app']['currentPage']
  itemsOnPage: RootStateT['app']['itemsOnPage']
  searching: RootStateT['app']['searching']
  lastQuery: RootStateT['app']['lastQuery']
  searchCount: RootStateT['app']['searchCount']
}

type DispatchPropsT = typeof thunkCreator

export type ContentPropsT = IStateProps & DispatchPropsT

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

const Content: FC<ContentPropsT> = (props) => {
  const { pageSize, pagesNum, currentPage, itemsOnPage, searching, searchCount, lastQuery } = props
  const { getAllBooks, getItemsOnPage } = props

  const onPageClick = (page: number) => {
    getItemsOnPage(page)
  }

  const searchFormProps = { getAllBooks, lastQuery }
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
  searchCount: selector.getSearchCount(state)
})

const dispatchToProps: DispatchPropsT = {
  ...thunkCreator
}

export default connect(mapStateToProps, dispatchToProps)(Content)
