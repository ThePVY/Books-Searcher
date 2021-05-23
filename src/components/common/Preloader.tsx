import preloader from '@/images/preloader.gif'
import { FC } from 'react'

interface IProps {
  isFetching: boolean
}

const Preloader: FC<IProps> = ({ isFetching }) => (
  <>{isFetching ? <img src={preloader} alt='' /> : ''}</>
)

export default Preloader
