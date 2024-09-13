import Rate from "./component/rate"
import data from './data.js';
import Jenis from "./component/jenis.js";
import Produk from "./component/produk.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Footer from "./component/footer.js";

const alphabeticSort = (a, b) => {
    return a.localeCompare(b);
};

export default function App() {
    const sortedJenis = Object.keys(data).sort(alphabeticSort);
    const [selectedJenis, setSelectedJenis] = useState(sortedJenis[0]);

    let sortedProduk = Object.keys(data[selectedJenis]).sort(alphabeticSort);
    const [selectedProduk, setSelectedProduk] = useState(sortedProduk[0]);

    const handleJenisChange = (jenis) => {
        setSelectedJenis(jenis);
        const sortedProduk = Object.keys(data[jenis]).sort(alphabeticSort);
        setSelectedProduk(sortedProduk[0]);
    };

    const handleProdukChange = (produk) => {
        setSelectedProduk(produk);
    };

    let title = 'Random-Rates';

    return (
        <div className="w-full font-quicksand">
            <div className="w-full max-w-[1600px] mx-auto">
                <div className="w-full p-2 md:p-8">
                    <h1 className="waviy text-white text-4xl md:text-7xl font-glass-antiqua">
                        {
                            title.split('').map((e,i) => {
                                return (
                                    <span style={{ '--i': i+1  }}>{e}</span>
                                )
                            })
                        }
                    </h1>

                    <div className="w-[250px] md:w-[500px] h-[2px] md:h-2 my-2 rounded-full bg-white -translate-x-[40px]"></div>

                    <div className="w-full max-w-[700px] text-sm md:text-base text-balance text-white">
                        <p>
                            Inspired by all the review and rating contents out there, I decided to create my own rating system. 
                            This way, I can keep a personal record of how much I enjoyed each product I try. 
                            It'll be a great way to remember my favorite and help me share my thoughts with others too.
                        </p>
                    </div>
                </div>

                <div className="text-white my-2 pl-2 md:pl-8 text-sm md:text-lg">
                    Random Rates <FontAwesomeIcon className="text-xs md:text-sm" icon={faChevronCircleRight}/> {selectedJenis} <FontAwesomeIcon className="text-xs md:text-sm" icon={faChevronCircleRight}/> {selectedProduk}
                </div>

                <div className="w-full flex flex-col lg:flex-row items-start justify-center">
                    <Rate jenis={selectedJenis} produk={selectedProduk} data={data} />

                    <div className="flex-shrink-0 sticky top-2 w-full lg:w-[400px] px-2 md:px-8 lg:px-2">
                        <Jenis jenis={sortedJenis} selectedJenis={selectedJenis} onJenisChange={handleJenisChange} />

                        <Produk produk={sortedProduk} selectedProduk={selectedProduk} onProdukChange={handleProdukChange} />
                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    )
}
