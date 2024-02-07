import { useEffect, useState } from 'react';
import { searceImg } from 'Api/Gallery';
import Button from './Gallery/Button/Button';
import Loader from './Gallery/Loader/Loader';
import ImageGallery from './Gallery/ImageGallery/ImageGallery';
import Searchbar from './Gallery/Searchbar/Searchbar';
import css from './App.module.css';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState('');

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await searceImg(query, page);
        if (data.totalHits) {
          toast.error(
            '❌Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setGallery(prevGallery =>
          data.hits?.length ? [...prevGallery, ...data.hits] : prevGallery
        );
        setTotalHits(data.totalHits);
        setIsLoading(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchQuery();
    }
  }, [query, page]);

  const handelSearchForm = searchQuery => {
    if (query === searchQuery.toLowerCase()) {
      return toast.info(`You're already reviewing the query ${searchQuery}`);
    }
    setGallery([]);
    setQuery(searchQuery.toLowerCase());
    setPage(1);
  };
  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
};

export { App };
