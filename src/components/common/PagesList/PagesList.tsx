import Button from '@/components/common/Button'
import { useFormik } from 'formik'
import Preloader from '../Preloader'
import Div from '../Div'
import FlexContainer from '../FlexContainer'
import styled from 'styled-components'
import Input from '../Input'
import { FC, useEffect } from 'react'


const className = 'pages-list__selected-page'

const FlexWrapper = styled(FlexContainer).attrs({ className })`
  width: 50%;
  min-width: 250px;
  max-width: 400px;
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

interface IPagesListProps {
  pagesCount: number
  selectedPage: number
  isFetching?: boolean
  onPageClick: (page: number) => void
}

const PagesList: FC<IPagesListProps> = (props) => {
  const { pagesCount, selectedPage, isFetching = false } = props
  const { onPageClick } = props

  const handleSubmit = (jsonObj: ISearchData) => {
    onPageClick(Number(jsonObj.page))
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
          <span role="button" tabIndex={0} onClick={() => onPageClick(1)}>
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
            tabIndex={0}
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
          <span role="button" tabIndex={0} onClick={() => onPageClick(pagesCount)}>
            {pagesCount}
          </span>
        </>
      ) : (
        ''
      )}
      <PageSearchForm onSubmit={handleSubmit} pagesCount={pagesCount} />
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

interface ISearchData {
  page: string
}

interface IPagesSearchFormProps {
  onSubmit: (values: ISearchData) => void
  pagesCount: number
}

const PageSearchForm: FC<IPagesSearchFormProps> = ({ onSubmit, pagesCount }) => {
  const formik = useFormik({
    initialValues: {
      page: ''
    },
    onSubmit: (values) => {
      onSubmit(values)
      formik.resetForm()
      formik.setFieldTouched('page', true, true)
    },
    validate: (values) => {
      const errors = {} as ISearchData
      if(!values.page) {
        errors.page = 'Required'
      }
      else if (/^[^0-9]/.test(values.page)) {
        errors.page = 'Use only numbers 0-9'
      } else if (values.page === '0') {
        errors.page = 'Page 0 are not valid'
      } else if (Number(values.page) > pagesCount) {
        errors.page = 'Input page could not be larger, then total number of pages'
      }
      return errors
    }
  })

  useEffect(() => {
    formik.setFieldTouched('page', true, true)
  }, [])

  return (
    <FlexForm onSubmit={formik.handleSubmit}>
      <Div width="70%">
        <Input
          name="page"
          type="search"
          placeholder="Enter page"
          value={formik.values.page}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
