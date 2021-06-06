import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = React.useRef('');
  // if user hits return inside input this prevents the form from submitting which would reload the page
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  useEffect(() => {
    // puts focus on search input form
    searchValue.current.focus()
  }, [])
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value)
  }
  return (
    <section className='section-search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>cocktail search
          </label>
          <input type='text' id='name' ref={searchValue} onChange={searchCocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
