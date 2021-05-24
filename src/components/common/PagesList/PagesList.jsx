import Button from '@/components/common/Button'
import { useFormik } from 'formik'
import Preloader from '../Preloader'
import Div from '../Div'
import FlexContainer from '../FlexContainer'
import styled from 'styled-components'
import Input from '../Input'


const className = 'pages-list__selected-page'

const FlexWrapper = styled(FlexContainer).attrs({ className })`
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem auto;
  user-select: none;
  span {
    cursor: pointer;
  }
  span.${className} {
    font-weight: bold;
  }
`

const PagesList = (props) => {
  const { pagesCount, selectedPage, isFetching = false } = props
  const { onPageClick } = props

  const handleSubmit = (jsonObj) => {
    onPageClick(jsonObj.page)
  }

  let pagesArr = [
    selectedPage === 3 ? 1 : null,
    selectedPage - 1 > 0 ? selectedPage - 1 : null,
    selectedPage,
    selectedPage + 1 <= pagesCount ? selectedPage + 1 : null,
    selectedPage === pagesCount - 2 ? pagesCount : null
  ]
  pagesArr = pagesArr.filter((page) => !!page)

  return (
    <FlexWrapper>
      {selectedPage >= 4 ? (
        <>
          <span role="button" tabIndex="0" onClick={() => onPageClick(1)}>
            1
          </span>{' '}
          <span>...</span>
        </>
      ) : (
        ''
      )}
      {pagesArr.map((p) => {
        return (
          <span
            role="button"
            tabIndex="0"
            key={p}
            onClick={() => onPageClick(p)}
            className={selectedPage === p ? className : undefined}
          >
            {p}
          </span>
        )
      })}
      {selectedPage <= pagesCount - 3 ? (
        <>
          <span>...</span>
          <span role="button" tabIndex="0" onClick={() => onPageClick(pagesCount)}>
            {pagesCount}
          </span>
        </>
      ) : (
        ''
      )}
      <PageSearchForm onSubmit={handleSubmit} />
      <Preloader isFetching={isFetching} />
    </FlexWrapper>
  )
}

export default PagesList

const FlexForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 60%;
`

const PageSearchForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      page: ''
    },
    onSubmit: (values) => {
      onSubmit(values)
      formik.setValues(formik.initialValues)
    },
    validate: (values) => {
      const errors = {}
      if (/^[^0-9]/.test(values.page)) {
        errors.page = 'Use only numbers 0-9'
      } else if (values.page === '0') {
        errors.page = 'Page 0 are not valid'
      }
      return errors
    }
  })

  return (
    <FlexForm onSubmit={formik.handleSubmit}>
      <Div width="70%">
        <Input
          name="page"
          type="search"
          placeholder="Enter page"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.page && formik.errors.page}
        />
      </Div>
      <Div width="25%">
        <Button type="submit" disabled={!!formik.errors.page}>
          Go!
        </Button>
      </Div>
    </FlexForm>
  )
}
