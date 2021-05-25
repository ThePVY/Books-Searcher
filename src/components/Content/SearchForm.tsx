import { throttle } from '@/utils/utils'
import { useFormik } from 'formik'
import { FC, ReactEventHandler, useState } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'
import Input from '../common/Input'
import { ContentPropsT } from './Content'
import HintsPanel from './HintsPanel'

const SearchFormWrapper = styled.form`
  width: 50%;
  min-width: 250px;
  margin: 1rem auto;
  position: relative;
`

export const searchInputClass = 'search-form__search_input'

const SearchInput = styled(Input).attrs({ className: searchInputClass })``

let timeoutId: ReturnType<typeof setTimeout>

interface IProps {
  lastQuery: string
  uniqueTitles: string[]
  getAllBooks: ContentPropsT['getAllBooks']
  subscribeHint?: (fn: () => void) => void
}

const SearchForm: FC<IProps> = ({ getAllBooks, subscribeHint, lastQuery = '', uniqueTitles }) => {
  const formik = useFormik({
    initialValues: { search: lastQuery },
    onSubmit: values => {
      getAllBooks(values.search)
    }
  })
  const [hintsMode, setHintsMode] = useState(false)
  const handleChange: ReactEventHandler<HTMLInputElement> = e => {
    formik.handleChange(e)
    clearTimeout(timeoutId)
    setHintsMode(false)
    const search = e.currentTarget.value
    if (search) {
      timeoutId = throttle(() => {
        getAllBooks(search).then(() => setHintsMode(true))
      }, 1000)
    }
  }
  const handleFocus = () => setHintsMode(true)
  const onHintClick = (hint: string) => {
    formik.setValues({ search: hint })
    setHintsMode(false)
    getAllBooks(hint)
  }
  subscribeHint(() => setHintsMode(false))
  return (
    <SearchFormWrapper onSubmit={formik.handleSubmit}>
      <Div width='100%'>
        <SearchInput
          type='search'
          name='search'
          value={formik.values.search}
          onChange={handleChange}
          onFocus={handleFocus}
          autoFocus
        />
      </Div>
      <HintsPanel isShown={formik.values.search && hintsMode} hints={uniqueTitles} onHintClick={onHintClick} />
    </SearchFormWrapper>
  )
}

export default SearchForm
