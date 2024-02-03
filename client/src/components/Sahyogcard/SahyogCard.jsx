import React from 'react';
import matic from './img/Matic.png';
import poly from './img/Poly.png';
const SahyogCard = ({address, name, number, age, gender}) => {
    return (
        <>
            <div className="">
                <center>
                    <div className='w-[317px] h-[190px] text-white rounded-xl bg-gradient-to-r from-[#92A5C2] to-[#0E80A4]'>
                        <div>
                            <p className='font-medium text-2xl pl-[100px] pt-[13px]'>SAHYOG CARD</p>
                        </div>
                        <div className='pb-2'>
                            <p className='font-medium text-xs pl-2 pr-2 pt-[30px]'>{address}</p>
                        </div>
                        <div className="flex flex-row ">
                            <div className='flex flex-1 flex-col items-start pt-4 pl-5 '>
                                <p className="flex-1 text-sm">{name}</p>
                                <p className="flex-2 text-sm">+91 {number}</p>
                                <div className='flex flex-3 flex-row gap-1 pb-4'>
                                    <div className='flex flex-row gap-1 pb-4'>
                                        <p className="flex-1 text-xs">AGE:</p>
                                        <p className="flex-1 text-xs">{age}</p>
                                    </div>

                                    <div className='flex flex-row gap-1 pb-4'>
                                        <p className="flex-1 text-xs">Gender:</p>
                                        <p className="flex-1 text-xs">{gender}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-2 flex-col flex-2 mt-14'>
                                <div className='flex flex-3 mr-4 mb-2 flex-row gap-1'>
                                    <div className='flex flex-row gap-1 pb-4'>
                                        <img src={matic} className='w-[20px] h-[20px]' alt="h" />
                                    </div>

                                    <div className='flex flex-row gap-1 pb-4'>
                                    <img src={poly} className='w-[20px] h-[20px]' alt="h" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </center>
            </div>
        </>
    );
}

export default SahyogCard;
