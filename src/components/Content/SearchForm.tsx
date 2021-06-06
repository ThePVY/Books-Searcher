import { RootStore } from '@/mobx/store'
import { useFormik } from 'formik'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { FC, ReactEventHandler } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'
import Input from '../common/Input'
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
  store: RootStore
}

const SearchForm: FC<IProps> = observer(({ store: { domainStore, uiStore } }) => {
  const formik = useFormik({
    initialValues: { search: domainStore.lastQuery },
    onSubmit: (values) => {
      domainStore.getAllBooks(values.search)
    }
  })
  const handleChange: ReactEventHandler<HTMLInputElement> = (e) => {
    formik.handleChange(e)
    clearTimeout(timeoutId)
    uiStore.setHintsMode(false)
    const search = e.currentTarget.value
    if (search) {
      timeoutId = setTimeout(() => {
        runInAction(() => domainStore.historyCtrl.startSearch(search))
      }, 1000)
    }
  }
  const handleFocus = () => uiStore.setHintsMode(true)
  const onHintClick = (hint: string) => {
    formik.setValues({ search: hint })
    uiStore.setHintsMode(false)
    domainStore.getAllBooks(hint)
  }
  return (
    <SearchFormWrapper onSubmit={formik.handleSubmit}>
      <Div width="100%">
        <SearchInput
          type="search"
          name="search"
          value={formik.values.search}
          onChange={handleChange}
          onFocus={handleFocus}
          autoFocus
        />
      </Div>
      <HintsPanel
        isShown={formik.values.search && uiStore.hintsMode}
        hints={domainStore.uniqueTitles}
        onHintClick={onHintClick}
      />
    </SearchFormWrapper>
  )
})

export default SearchForm
