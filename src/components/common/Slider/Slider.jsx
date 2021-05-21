import { useEffect, useState } from 'react'
import arrowRight from '../../../images/arrow-icon-right.png'
import arrowLeft from '../../../images/arrow-icon-left.png'
import styled from 'styled-components'
import Div from '../Div'
import Button from '../Button'
import FlexContainer from '../FlexContainer'


const SliderWrapper = styled(Div)`
    width: 100%;
    height: 20vw;
    z-index: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const VisibleArea = styled(Div)`
    /* VisibleArea должен быть позиционируемым.
    Это нужно для того, чтобы ImagesContainer
    позиционировался относительно VisibleArea */
    position: absolute;
    right: 0px;
    left: 0px;
    margin-right: auto;
    margin-left: auto;
    /* В width должно вместиться ровно 2 периода картинок */
    width: 40vw;
    height: 20vw;
    overflow: hidden;
    img {
        max-width: 20vw;
        max-height: 20vw;
    }

`

const ImagesContainer = styled(FlexContainer)`
    /* Width должна быть равна 5 периодам картинок */
    width: 100vw;
    height: 20vw;

    position: absolute;
    /* Половина ширины картинки + период следования картинок */
    left: -27.5vw;

    div {
        position: absolute;
        transition: all 1s;
    }
`

const ImageContainer = styled(Div)`
    left: ${props => props.left || '0px'};
`

const ButtonContainer = styled(Div)`
    position: absolute;
    width: fit-content;
    height: fit-content;

    top: ${props => props.top || '0'};
    bottom: ${props => props.bottom || '0'};
    left: ${props => props.left || 'auto'};
    right: ${props => props.right || 'auto'};
    margin-top: auto;
    margin-bottom: auto;
`
const ArrowContainer = styled(ButtonContainer)`
    button {
        border: hidden;
        background: transparent;
        padding: 0px;
    }

    img {
        width: 2vw;
    }
`
const ToggleSliderContainer = styled(ButtonContainer)`
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;

    width: 150px;
    height: 30px;
    font-size: 1rem;
`



const Slider = ({ images, onImageClick, exitObserver = {} }) => {

    const [imagesState, setImagesState] = useState({
        prev2xImage: images.length - 2,
        prevImage: images.length - 1,
        currImage: 0,
        nextImage: 1,
        next2xImage: 2
    })

    const [slideMode, setSlideMode] = useState(true)

    const imgs = images.map((image, i) => <img key={image.id} src={image.url} alt={i} />)

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (slideMode) {
                setImagesState(slide({ direction: 'right', images, imagesState }))
            }
        }, 3000)
        return () => {
            clearTimeout(timeout)
        }
    }, [imagesState, slideMode, images])

    const handleRight = (e) => {
        setImagesState(slide({ direction: 'right', images, imagesState }))
    }

    const handleLeft = (e) => {
        setImagesState(slide({ direction: 'left', images, imagesState }))
    }

    const handleToggle = () => setSlideMode(!slideMode)

    const runSlider = () => setSlideMode(true)

    useEffect(() => {
        exitObserver.subscribe(runSlider)
        console.log('slider subscribe use effect')
        return () => {
            exitObserver.unsubscribe(runSlider)
            console.log('slider unsubscribe use effect')
        }
    }, [])

    const handleImageClick = () => {
        handleToggle()
        onImageClick(images[imagesState.currImage])
    }

    return (
        <SliderWrapper>
            <VisibleArea>
                <ImagesContainer jstfCnt='space-between' >
                    <ImageContainer key={images[imagesState.prev2xImage].id} left='0px' >
                        {imgs[imagesState.prev2xImage]}
                    </ImageContainer>

                    <ImageContainer key={images[imagesState.prevImage].id} left='20vw' >
                        {imgs[imagesState.prevImage]}
                    </ImageContainer>

                    <ImageContainer key={images[imagesState.currImage].id} onClick={handleImageClick} left='40vw' >
                        {imgs[imagesState.currImage]}
                    </ImageContainer>

                    <ImageContainer key={images[imagesState.nextImage].id} left='60vw' >
                        {imgs[imagesState.nextImage]}
                    </ImageContainer>

                    <ImageContainer key={images[imagesState.next2xImage].id} left='80vw' >
                        {imgs[imagesState.next2xImage]}
                    </ImageContainer>
                </ImagesContainer>
            </VisibleArea>
            <ArrowContainer right='10px' >
                <Button onClick={handleRight}><img src={arrowRight} alt="right" /></Button>
            </ArrowContainer>
            <ArrowContainer left='10px' >
                <Button onClick={handleLeft}><img src={arrowLeft} alt="left" /></Button>
            </ArrowContainer>
            <ToggleSliderContainer top='unset' bottom='-6vw' >
                <Button onClick={handleToggle}>{slideMode ? 'Stop Slider' : 'Run Slider'}</Button>
            </ToggleSliderContainer>
        </SliderWrapper>
    )
}

export default Slider



const slide = ({ direction = 'right', images, imagesState }) => {
    switch (direction) {
        case 'right':
            return {
                prev2xImage: imagesState.prevImage,
                prevImage: imagesState.currImage,
                currImage: imagesState.nextImage,
                nextImage: imagesState.next2xImage,
                next2xImage: imagesState.next2xImage === images.length - 1 ? 0 : imagesState.next2xImage + 1
            }
        case 'left':
            return {
                prev2xImage: imagesState.prev2xImage > 0 ? imagesState.prev2xImage - 1 : images.length - 1,
                prevImage: imagesState.prev2xImage,
                currImage: imagesState.prevImage,
                nextImage: imagesState.currImage,
                next2xImage: imagesState.nextImage
            }
        default:
            throw new Error('Direction must be right or left')
    }
}