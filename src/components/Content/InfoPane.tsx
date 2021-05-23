import { ItemTypeOf } from '@/types/common-types'
import { FC } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'
import FlexContainer from '../common/FlexContainer'
import Image from '../common/Image'
import UL from '../common/UL'
import { ContentPropsT } from './Content'

const InfoPanelWrapper = styled.div`
  @media screen and (max-width: 1024px) {
    img {
      max-width: 50vh;
      max-height: 50vh;
    }
  }
  @media screen and (max-width: 768px) {
    img {
      max-width: 60vw;
      max-height: 60vh;
    }
  }
  @media screen and (max-width: 568px) {
    img {
      max-width: 70vw;
      max-height: 70vh;
    }
  }
  @media screen and (max-width: 320px) {
    img {
      max-width: 70vw;
      max-height: 70vh;
    }
  }
`

const FlexInfo = styled(FlexContainer)`
  height: fit-content;
  width: fit-content;
  margin: 0.5rem auto;
  justify-content: space-between;
  flex-wrap: wrap;
`

const FlexInfoCell = styled(FlexContainer)`
  width: 40%;
  column-gap: 1rem;
  flex-wrap: nowrap;
`

interface IInfoPaneProps {
  edition: ItemTypeOf<ContentPropsT['itemsOnPage']>
}

const InfoPane: FC<IInfoPaneProps> = ({ edition }) => {
  return (
    <InfoPanelWrapper>
      <Div width="fit-content" height="fit-content" margin="1rem auto">
        <Image src={edition.largeCover} alt="" />
      </Div>
      <FlexInfo>
        <FlexInfoCell>
          <UL>
            <li>Author:</li>
            <li>Title:</li>
            <li>Pages:</li>
          </UL>
          <UL>
            <li>{edition.author}</li>
            <li>{edition.title}</li>
            <li>{edition.number_of_pages}</li>
          </UL>
        </FlexInfoCell>
        <FlexInfoCell>
          <UL>
            <li>Publisher:</li>
            <li>Publish date:</li>
            <li>ISBN:</li>
          </UL>
          <UL>
            <li>{edition.publishers}</li>
            <li>{edition.publish_date}</li>
            <li>{edition.isbn}</li>
          </UL>
        </FlexInfoCell>
      </FlexInfo>
    </InfoPanelWrapper>
  )
}

export default InfoPane
