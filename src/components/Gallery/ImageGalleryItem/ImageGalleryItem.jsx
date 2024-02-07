import Modal from '../Modal/Modal';
import css from './ImmageGalleryItem.module.css';
import { useState } from 'react';

const ImmageGalleryItem = ({ webImg, info, modalImg }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imgDetails, setimgDetails] = useState({});

  const showModal = ({ info, modalImg }) => {
    setOpenModal(true);
    setimgDetails({ info, modalImg });
  };
  const closeModal = () => {
    setOpenModal(false);
    setimgDetails({});
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webImg}
          alt={info}
          loading="lazy"
          onClick={() => showModal({ info, modalImg })}
        />
      </li>
      {Boolean(openModal) && (
        <Modal close={closeModal}>
          <img src={imgDetails.modalImg} alt={imgDetails.info} />
        </Modal>
      )}
    </>
  );
};
export default ImmageGalleryItem;
