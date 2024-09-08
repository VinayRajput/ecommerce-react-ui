import { Paper } from '@mui/material'
import React from 'react'

const HomeSectionCard = (props) => {
  const {imageUrl, title, description} = props.item
  return (
    <Paper className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg w-[15rem] mt-2 m-3 p-3'>
      <div className='h-[12rem] w-[12rem] m-0'>
        <img src={imageUrl} data-src={imageUrl} className='object-cover object-top w-full h-full' alt="" />
      </div>
      <div className='p-1'>
        <h5 className='font-medium text-gray-900 m-1'>{title}</h5>
        <h6 className='m-1 text-sm text-gray-500' >{description}</h6>
      </div>
  </Paper>
  )
}

export default HomeSectionCard