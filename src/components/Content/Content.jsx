import styled from 'styled-components'
import SinglePane from '../common/SinglePane/SinglePane'
import SearchForm from './SearchForm'

const ContentWrapper = styled.div`
  box-sizing: border-box;
  grid-area: content;
  color: rgb(72, 78, 78);
  margin: 1vh 1vw;
`

const Content = () => {
  return (
    <ContentWrapper>
      <SinglePane>
        <SearchForm />
      </SinglePane>
    </ContentWrapper>
  )
}

export default Content
