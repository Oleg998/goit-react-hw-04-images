import css from './ImageGallery.module.css';
import ImmageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ galleryItem }) {
  const elemets = galleryItem.map(
    ({ id, webformatURL, largeImageURL, tags }) => (
      <ImmageGalleryItem
        key={id}
        webImg={webformatURL}
        modalImg={largeImageURL}
        info={tags}
      />
    )
  );

  return <ul className={css.ImageGallery}>{elemets}</ul>;
}
