import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import color_rate from '../color-rate';

export default function Modal({ show, onHide, data, color, jenis, produk, currentIndex, products, setCurrentIndex, setModalData, setRateColor }) {

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            const newProduct = products[newIndex];
            setCurrentIndex(newIndex);
            setModalData(newProduct);
            setRateColor(color_rate[newProduct.rate]);
        }
    };

    const handleNext = () => {
        if (currentIndex < products.length - 1) {
            const newIndex = currentIndex + 1;
            const newProduct = products[newIndex];
            setCurrentIndex(newIndex);
            setModalData(newProduct);
            setRateColor(color_rate[newProduct.rate]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (show === 'top-0 scale-1') { 
                if (event.key === 'ArrowLeft') {
                    handlePrevious();
                } else if (event.key === 'ArrowRight') {
                    handleNext();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [show, currentIndex, products]);

    return (
        <div onClick={onHide} className={`fixed ${show} left-0 w-full h-screen p-2 md:p-0 flex items-center justify-center bg-slate-700/50 cursor-pointer z-10 transition-all duration-500`}>
            <div onClick={(e) => e.stopPropagation()} className="w-screen md:w-[500px] h-fit bg-white rounded-md cursor-auto z-20">
                <div className='w-full p-1 flex items-center justify-between'>
                    <div className='min-w-8 h-8 w-fit px-1 flex items-center justify-center rounded bg-[#ff914d] text-white font-semibold'>
                        {currentIndex+1}
                    </div>
                    <button className='w-8 aspect-square flex items-center justify-center rounded bg-[#ff914d] text-white active:bg-[#8c52ff] transition-colors'
                        type='button' onClick={onHide}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>

                <div className="w-full max-h-[80vh] p-2 bg-white border-y-2 border-[#8c52ff] overflow-y-auto">
                    <div className={`relative`}>
                        <img className={`w-full aspect-square mx-auto rounded object-cover ${color}`}
                            src={`${process.env.PUBLIC_URL}/img/${jenis}/${produk}/${data?.nama}.${data?.img_format}`}
                            alt={data?.nama}/>
                        <span className={`absolute bottom-2 left-2 w-8 md:w-12 aspect-square flex items-center justify-center rounded text-lg md:text-3xl font-semibold border-2 border-white ${color} text-white font-glass-antiqua`}>
                            {data?.rate}
                        </span>
                    </div>
                    <p className='w-full my-2 text-2xl md:text-3xl text-[#ff914d] font-glass-antiqua'>
                        {data?.nama.split('-').map(el => el.split('').map((e,i) => i!==0?e:e.toUpperCase()).join('')).join(' ')}
                    </p>
                    <ul className='px-4 list-disc font-quicksand text-sm md:text-base text-slate-500'>
                        {data?.note.map((note, ix) => (
                            <li key={ix}>{note}</li>
                        ))}
                    </ul>
                </div>

                <div className='w-full p-1 flex items-center justify-between'>
                    <button type='button' className='w-8 aspect-square flex items-center justify-center rounded bg-[#ff914d] text-white active:bg-[#8c52ff] disabled:bg-slate-500 transition-colors'
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>

                    <button type='button' className='w-8 aspect-square flex items-center justify-center rounded bg-[#ff914d] text-white active:bg-[#8c52ff] disabled:bg-slate-500 transition-colors'
                        onClick={handleNext}
                        disabled={currentIndex === products.length - 1}
                    >
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
