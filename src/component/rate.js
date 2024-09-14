import React, { useEffect, useMemo, useRef, useState } from 'react';
import Modal from './modal.js';
import color_rate from '../color-rate.js';
import anime from 'animejs';

export default function Rate({ jenis, produk, data }) {
    const [modalShow, setModalShow] = useState('top-full scale-0');
    const [modalData, setModalData] = useState(null);
    const [rateColor, setRateColor] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const productRefs = useRef([]);

    const products = useMemo(() => {
        const items = data[jenis]?.[produk] || [];
        return items.sort((a, b) => {
            if (a.rate < b.rate) return -1;
            if (a.rate > b.rate) return 1;
            if (a.nama.toLowerCase() < b.nama.toLowerCase()) return -1;
            if (a.nama.toLowerCase() > b.nama.toLowerCase()) return 1;
            return 0;
        });
    }, [jenis, produk, data]);

    const handleShowModal = (item, color, index) => {
        setModalData(item);
        setRateColor(color);
        setCurrentIndex(index);
        setModalShow('top-0 scale-1');
    };

    useEffect(() => {
        if (products.length > 0 && productRefs.current.length > 0) {
            anime({
                targets: productRefs.current.filter(Boolean),
                translateX: [-50, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: anime.stagger(200),
            });
        }
    }, [products]);

    return (
        <div className='w-full px-2 md:px-8'>
            {Object.keys(color_rate).map((key, index) => (
                <div key={index} className='w-full mb-2 flex items-center justify-start gap-2'>
                    <div className={`flex-shrink-0 w-[56px] md:w-[96px] aspect-square flex items-center justify-center text-2xl md:text-5xl font-glass-antiqua rounded-lg md:rounded-xl border-2 border-white text-white font-semibold ${color_rate[key]}`}>
                        {key}
                    </div>

                    <div className='flex-1 w-full h-[56px] md:h-[96px] p-1 rounded-lg md:rounded-xl bg-slate-200/50 flex items-center justify-start gap-1'>
                        {products.filter(item => item.rate === key).length > 0 ? (
                            products.filter(item => item.rate === key).map(item => {
                                const productIndex = products.findIndex(p => p.nama === item.nama);

                                return (
                                    <div 
                                        key={productIndex} 
                                        ref={el => productRefs.current[productIndex] = el}
                                        className={`md:p-1 flex items-center justify-center ${color_rate[key]} rounded-lg`}
                                    >
                                        <button className='group relative overflow-hidden' 
                                            onClick={() => handleShowModal(item, color_rate[key], productIndex)}>
                                            <img className='w-[46px] md:w-[80px] aspect-square rounded object-cover'
                                                src={`${process.env.PUBLIC_URL}/img/${jenis}/${produk}/${item.nama}.${item.img_format}`} alt={item.nama} loading='lazy'/>
                                            <div className={`absolute top-0 left-0 w-[46px] md:w-[80px] aspect-square flex items-center justify-center rounded ${color_rate[key]} text-white text-sm
                                                translate-y-[46px] md:translate-y-[80px] group-hover:translate-y-0 transition-all`}>
                                                {item.nama.split('-').map(el => el.split('').map((e,i) => i!==0?e:e.toUpperCase()).join('')).join(' ')}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='w-full text-center text-white text-xs md:text-base'>No products found for this rate</div>
                        )}
                    </div>
                </div>
            ))}

            <Modal
                show={modalShow}
                onHide={() => setModalShow('top-full scale-0')}
                data={modalData}
                color={rateColor}
                jenis={jenis}
                produk={produk}
                currentIndex={currentIndex} 
                products={products}
                setCurrentIndex={setCurrentIndex} 
                setModalData={setModalData} 
                setRateColor={setRateColor} 
            />
        </div>
    );
}
