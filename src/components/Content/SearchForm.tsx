import { useFormik } from 'formik'
import { FC, ReactEventHandler } from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
import Div from '../common/Div'
import Input from '../common/Input'
import { ContentPropsT } from './Content'

interface IProps {
  getAllBooks: ContentPropsT['getAllBooks']
}

const FlexSearchForm = styled.form`
  display: flex;
  width: 50%;
  min-width: 300px;
  margin: 1rem auto;
  justify-content: space-between;
`

let timeoutId: ReturnType<typeof setTimeout>

const SearchForm: FC<IProps> = ({ getAllBooks }) => {
  const formik = useFormik({
    initialValues: { search: '' },
    onSubmit: (values) => {
      getAllBooks(values.search)
    }
  })

  const handleChange: ReactEventHandler<HTMLInputElement> = (e) => {
    formik.handleChange(e)

    clearTimeout(timeoutId)
    const search = e.currentTarget.value
    if (search) {
      timeoutId = throttle(() => getAllBooks(search), 1000)
    }
  }

  return (
    <FlexSearchForm onSubmit={formik.handleSubmit}>
      <Div width="75%">
        <Input type="search" name="search" value={formik.values.search} onChange={handleChange} />
      </Div>
      <Div width="20%">
        <Button type="submit">Search</Button>
      </Div>
    </FlexSearchForm>
  )
}

export default SearchForm

type DecoratedFn = () => void

function throttle(fn: DecoratedFn, ms: number): ReturnType<typeof setTimeout> {
  return setTimeout(() => fn(), ms)
}
