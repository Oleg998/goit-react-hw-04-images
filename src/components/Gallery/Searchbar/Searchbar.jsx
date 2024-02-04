import { Component } from 'react';
import css from './Searchbar.module.css';

import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    search: '',
   
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handelSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      toast.error('Enter text to search the gallery');
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handelSubmit } = this;
    const { search } = this.state;
    return (
      <header className={css.searchbar}>
        <form onSubmit={handelSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            value={search}
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
}

export default Searchbar;
