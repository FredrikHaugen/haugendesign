import React from 'react';
import Dialog from '@material-ui/core/Dialog';

function PortfolioDialog({ open, handleClose, selectedItem }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            BackdropComponent={null}
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.5)',
                    border: '0px solid transparent',
                    position: 'relative',
                    overflow: 'auto',
                    '-ms-overflow-style': 'none',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    '-webkit-overflow-scrolling': 'touch',
                    width: '80vw'
                }
            }}
            sx={{
                position: 'fixed',
                zIndex: 1300,
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(3px)'
            }}
        >
            <button
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    padding: '5px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none'
                }}
            >
                <svg className=' hover:scale-105 ease-in-out' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            {selectedItem && (
                <div key={selectedItem.id} className=' bg-gray-800 border-none'>
                    <div>
                        <p className='text-3xl text-center capitalize py-2 ' style={{ color: '#ddd' }}>{selectedItem.name}</p>
                    </div>
                    <div className='p-2'><p className=' font-light text-secondary'>{selectedItem.dialogText1}</p></div>
                    <img src={selectedItem.src} alt="portfolioImage" className='p-2' />
                    <hr className='mx-2' style={{ borderColor: 'transparent' }} />
                    <img src={selectedItem.dialogImg1} alt="" className='p-2' />
                    <div className='p-2'><p className=' font-light text-secondary'>{selectedItem.dialogText2}</p></div>
                    <img src={selectedItem.dialogImg2} alt="" className='p-2' />
                    <hr className='mx-2' style={{ borderColor: 'transparent' }} />
                    <div className='w-full grid grid-cols-2 gap-4 text-center p-2'>
                        <img src={selectedItem.dialogImg3} alt="" className='' />
                        <img src={selectedItem.dialogImg4} alt="" className='' />
                        <img src={selectedItem.dialogImg5} alt="" className='' />
                    </div>
                    <div className='p-2'><p className=' text-center font-light text-secondary'>{selectedItem.dialogText3}</p></div>
                    
                    <div className=' flex items-center justify-center'>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber text-[#eee] bg-[rgba(0,0,0,0.2)] hover:bg-background2 rounded-md'>{selectedItem.page}{selectedItem.picture}</button>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber text-[#eee] bg-[rgba(0,0,0,0.2)] hover:bg-background2 rounded-md'>{selectedItem.github}{selectedItem.behance}</button>
                        </div>
                    </div>
                )}
            </Dialog>
        );
    }

export default PortfolioDialog;

