import { Component } from 'react';
import { searceImg } from 'Api/Gallery';
import Button from './Gallery/Button/Button';
import Loader from './Gallery/Loader/Loader';
import ImageGallery from './Gallery/ImageGallery/ImageGallery';
import Searchbar from './Gallery/Searchbar/Searchbar';
import css from './App.module.css';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
    gallery: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevSearchQuery = prevState.query;
    const nextSearchQuery = query;
    if (prevSearchQuery !== nextSearchQuery || page !== prevState.page) {
      this.setState({
        isLoading: true,
      });
      try {
        const { data } = await searceImg(nextSearchQuery, this.state.page);

        if (!data.totalHits) {
          toast.error(
            '❌Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState(({ gallery }) => ({
          gallery: data.hits?.length ? [...gallery, ...data.hits] : gallery,
          totalHits: data.totalHits,
        }));
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  LoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handelSearchForm = searchQuery => {
    if (this.state.query === searchQuery.toLowerCase()) {
      return toast.info(`You're already reviewing the query ${searchQuery}`);
    }
    this.setState({
      gallery: [],
      query: searchQuery.toLowerCase(),
      page: 1,
    });
  };

  render() {
    const { LoadMore, handelSearchForm } = this;
    const { gallery, isLoading, error, totalHits, page } = this.state;
    const totalPage = Math.ceil(totalHits / 12);
    return (
      <div className={css.App}>
        <ToastContainer autoClose={5000} />
        {error && <p>..............{error}..................</p>}

        <Searchbar onSubmit={handelSearchForm} />

        <ImageGallery galleryItem={gallery} />

        {isLoading && <Loader></Loader>}
        {totalPage > page && (
          <Button onClick={LoadMore} type="button">
            Load more
          </Button>
        )}
      </div>
    );
  }
}

export { App };
