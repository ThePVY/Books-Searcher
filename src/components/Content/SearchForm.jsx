import { useFormik } from 'formik'
import Button from '../common/Button'
import Div from '../common/Div'
import FlexContainer from '../common/FlexContainer'
import Input from '../common/Input'

const SearchForm = props => {
  const formik = useFormik({
    initialValues: { search: '' },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const handleChange = (e) => {
    console.log('change')
    formik.handleChange(e)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FlexContainer width='50%' margin='1rem auto' jstfCnt='space-between'>
        <Div width='60%'>
          <Input type='search' name='search' value={formik.values.search} onChange={handleChange} />
        </Div>
        <Div width='30%'>
          <Button type='submit'>Search</Button>
        </Div>
      </FlexContainer>
    </form>
  )
}

export default SearchForm
