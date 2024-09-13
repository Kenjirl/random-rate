import React from 'react';

export default function Produk({ produk, selectedProduk, onProdukChange }) {
    return (
        <div className='w-full mt-8 flex flex-col items-center lg:items-end justify-start'>
            <span className='text-xl md:text-2xl font-glass-antiqua text-white'>
                Products
            </span>

            <div className='w-[90px] h-1 mb-2 rounded-full lg:rounded-l-full bg-white'></div>

            <div className='w-full flex flex-wrap items-start justify-center lg:justify-end gap-2'>
                {produk.map((p, idx) => (
                    <button className={`w-fit px-2 py-1 text-sm md:text-base border border-white ${selectedProduk === p ? 'bg-white text-[#ff914d]' : 'text-white'} outline-white outline-offset-4 rounded font-semibold
                        hover:bg-white hover:text-[#ff914d] focus:bg-white focus:text-[#ff914d] active:bg-[#ff914d] active:text-white transition-colors`}
                        key={idx} onClick={() => onProdukChange(p)}>
                        {p.split('-').map(el => el.split('').map((e,i) => i!==0?e:e.toUpperCase()).join('')).join(' ')}
                    </button>
                ))}
            </div>
        </div>
    );
}
