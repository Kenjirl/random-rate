import React from 'react';

export default function Jenis({ jenis, selectedJenis, onJenisChange }) {
    return (
        <div className='w-full mt-10 lg:mt-0 flex flex-col items-center lg:items-end justify-start'>
            <span className='text-2xl md:text-4xl font-glass-antiqua text-white'>
                Types/Kinds
            </span>

            <div className='w-[170px] h-1 mb-2 rounded-full lg:rounded-l-full bg-white'></div>

            <div className='w-full flex flex-wrap items-start justify-center lg:justify-end gap-2'>
                {jenis.map((j, idx) => (
                    <button className={`w-fit px-2 py-1 text-sm md:text-base border border-white ${selectedJenis === j ? 'bg-white text-[#8c52ff]' : 'text-white'} outline-white outline-offset-4 rounded font-semibold
                        hover:bg-white hover:text-[#8c52ff] focus:bg-white focus:text-[#8c52ff] active:bg-[#8c52ff] active:text-white transition-colors`}
                        key={idx} onClick={() => onJenisChange(j)}>
                        {j.split('-').map(el => el.split('').map((e,i) => i!==0?e:e.toUpperCase()).join('')).join(' ')}
                    </button>
                ))}
            </div>
        </div>
    );
}
