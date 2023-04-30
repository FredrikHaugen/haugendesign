import React from 'react';
import Button from '@material-ui/core/Button';

function PortfolioItem({ portfolio, onClick }) {
    const { behance, github, src, page, picture, name } = portfolio;

    return (
        <div className='shadow-box shadow-black hover:drop-shadow-2xl rounded-lg duration-300 lg:hover:scale-105 md:sm:hover:scale-100'>
            <div>
                <p className='text-xl text-center capitalize py-2'>{name}</p>
            </div>
            <Button onClick={onClick}><img src={src} alt="portfolioImage" /></Button>

            <div className=' flex items-center justify-center'>
                <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber hover:bg-background2 rounded-md'>{page}{picture}</button>
                <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber hover:bg-background2 rounded-md'>{github}{behance}</button>
            </div>
        </div>
    );
}

export default PortfolioItem;
