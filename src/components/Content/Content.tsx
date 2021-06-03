import { AppContext } from '@/index'
import { FC, useContext } from 'react'
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


const Content: FC = () => {

  const store = useContext(AppContext)

  return (
    <ContentWrapper>
      <SinglePane>
        <SearchForm store={store} />
        {!store.domainStore.searching ? (
          <SearchList store={store} onPageClick={onPageClick} />
        ) : (
          <CenteringDiv>
            <Preloader isFetching />
          </CenteringDiv>
        )}
      </SinglePane>
    </ContentWrapper>
  )
}


export default Content
