import { useState , useRef, useEffect} from 'react';
import css from './Searchbar.module.css';

import { toast } from 'react-toastify';

const Searchbar = ({onSubmit}) =>{

  const [state , setState]= useState({search:""})
  const inputRef = useRef();

  useEffect(()=>{inputRef.current.focus();},[])


    const handleChange = ({ target }) => {
      const { name, value } = target;
      setState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };


  const handelSubmit = e => {
    e.preventDefault();
    if (state.search.trim() === '') {
      toast.error('Enter text to search the gallery');
      return;
    }
    onSubmit(state.search);
    setState({ search: '' });
  };


    return (
      <header className={css.searchbar}>
        <form onSubmit={handelSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            ref={inputRef}
            value={state.search}
            onChange={handleChange}
            className={css.SearchForminput}
            type="text"
            autoComplete="off"
            autoFocus
            name="search"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }


export default Searchbar;
