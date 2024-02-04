import Modal from '../Modal/Modal';
import css from './ImmageGalleryItem.module.css';
import { Component } from 'react';

export default class ImmageGalleryItem extends Component {
  state = { openModal: false, imgDetails: {} };
  showModal = ({ info, modalImg }) => {
    this.setState({ openModal: true, imgDetails: { info, modalImg } });
  };
  closeModal = () => {
    this.setState({ openModal: false, imgDetails: {} });
  };
  render() {
    const { webImg, info, modalImg } = this.props;
    const { showModal, closeModal } = this;
    const { openModal, imgDetails } = this.state;

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
  }
}
