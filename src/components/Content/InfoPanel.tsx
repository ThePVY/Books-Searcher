import { FC, ReactEventHandler, useState } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'
import FlexContainer from '../common/FlexContainer'
import Image from '../common/Image'
import defaultCover from '@/images/default-cover.jpg'
import Preloader from '../common/Preloader'
import EditionInfo from '@/mobx/edition-info'

const InfoPanelWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`

const ImageWrapper = styled.div`
  height: fit-content;
  margin: 1rem auto;
  width: 450px;
  flex: 1 0 auto;
  img {
    max-width: 450px;
    /* max-height: 650px; */
  }
  @media screen and (max-width: 1024px) {
    width: 300px;
    img {
      max-width: 300px;
      /* max-height: 650px; */
    }
  }
  @media screen and (max-width: 768px) {
    width: fit-content;
    img {
      max-width: 400px;
      max-height: 350px;
    }
  }
  @media screen and (max-width: 568px) {
    width: fit-content;
    img {
      max-width: 280px;
      /* max-height: 510px; */
    }
  }
  @media screen and (max-width: 320px) {
    width: fit-content;
    img {
      max-width: 250px;
      max-height: 300px;
      height: 320px;
    }
  }
  @media screen and (max-width: 300px) {
    width: fit-content;
    img {
      max-width: 200px;
      max-height: 300px;
    }
  }
`

const FlexInfo = styled(FlexContainer)`
  padding: 1rem 0;
  padding-left: 1rem;
  height: fit-content;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
`

const FlexInfoCell = styled(FlexContainer)`
  width: 100%;
  flex-wrap: nowrap;
  column-gap: 0.5rem;
  margin: 0.5rem 0;
`

interface IInfoPanelProps {
  edition: EditionInfo
  imageLoading: boolean
}

const InfoPanel: FC<IInfoPanelProps> = ({ edition }) => {
  const [srcState, setSrcState] = useState('')
  const imageSrc = srcState || edition?.largeCover
  const [isFetching, setIsFetching] = useState(true)
  const checkSize: ReactEventHandler<HTMLImageElement> = e => {
    if (e.currentTarget.naturalWidth < 10) {
      setSrcState(defaultCover)
    }
    else {
      setSrcState(edition?.largeCover)
    }
    setIsFetching(false)
  }

  return (
    <InfoPanelWrapper>
      <ImageWrapper>
        {isFetching ? (
          <>
            <Preloader isFetching />
            <img onLoad={checkSize} src={edition?.largeCover} alt='' hidden />
          </>
        ) : (
          <Image src={imageSrc} alt='' />
        )}
      </ImageWrapper>
      <FlexInfo>
        <FlexInfoCell>
          <Div width='4rem'>Author:</Div>
          <div>{edition?.author}</div>
        </FlexInfoCell>
        <hr />
        <FlexInfoCell>
          <Div width='4rem'>Title:</Div>
          <div>{edition?.title}</div>
        </FlexInfoCell>
        <hr />
        <FlexInfoCell>
          <Div width='4rem'>Pages:</Div>
          <div>{edition?.number_of_pages}</div>
        </FlexInfoCell>
        <hr />
        <FlexInfoCell>
          <Div width='4rem'>Publisher:</Div>
          <div>{edition?.publishers}</div>
        </FlexInfoCell>
        <hr />
        <FlexInfoCell>
          <Div width='4rem'>Publish date:</Div>
          <div>{edition?.publish_date}</div>
        </FlexInfoCell>
        <hr />
        <FlexInfoCell>
          <Div width='4rem'>ISBN:</Div>
          <div>{edition?.isbn}</div>
        </FlexInfoCell>
        <hr />
      </FlexInfo>
    </InfoPanelWrapper>
  )
}

export default InfoPanel
