"use client";

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ImageGallery.module.scss';
import { Button } from '@mui/material';

interface ImageGalleryProps {
    imageArray: string[];
}

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const existingRoot = document.getElementById('modal-root');
        if (existingRoot) {
            setModalRoot(existingRoot);
        } else {
            const createdRoot = document.createElement('div');
            createdRoot.setAttribute('id', 'modal-root');
            document.body.appendChild(createdRoot);
            setModalRoot(createdRoot);
        }
    }, []);

    if (typeof window === 'undefined') return null;
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className={styles.modal} onClick={onClose}>
            <span className={styles.close} onClick={onClose}>&times;</span>
            {children}
        </div>,
        modalRoot
    );
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageArray }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setIsModalActive(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalActive(false);
        document.body.style.overflow = 'auto';
        setTimeout(() => setSelectedImage(null), 300);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalActive) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isModalActive]);

    return (
        <>
            <div className={styles.section}>
                <h3>Frames</h3>
                <div className={styles.framesGrid}>
                    {imageArray.map((image) => (
                        <div key={image} className={styles.frame} onClick={() => handleImageClick(image)}>
                            <img src={image} alt="" />
                            <Button variant="contained" color="primary" className={styles.expandButton}>
                                Click to Expand
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {isModalActive && selectedImage && (
                <Modal onClose={closeModal}>
                    <img
                        className={`${styles.modalContent} ${isModalActive ? styles.active : ''}`}
                        src={selectedImage}
                        alt=""
                        onClick={(e) => e.stopPropagation()}
                    />
                </Modal>
            )}
        </>
    );
};

export default ImageGallery;
