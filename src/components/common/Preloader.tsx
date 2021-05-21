import preloader from '@/images/preloader.gif'
import { FC } from 'react'

interface IProps {
  isFetching: boolean
}

const Preloader: FC<IProps> = ({ isFetching }) => (
  <span>{isFetching ? <img src={preloader} alt='' /> : ''}</span>
)

export default Preloader
