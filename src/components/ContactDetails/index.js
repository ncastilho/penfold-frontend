import React from "react";

export const ContactDetails = ({id, name, email, mobile}) => {
  // console.log(id, name, email, mobile);
  return (
      <ul className='list-unstyled g-mb-30'>
        <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
          <div className='g-pr-10'>
            <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Name</strong>
            <span className='align-top'>{name}</span>
          </div>
          <span>
            <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1' />
          </span>
        </li>

        <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
          <div className='g-pr-10'>
            <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Email address</strong>
            <span className='align-top'>{email}</span>
          </div>
          <span>
            <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1' />
          </span>
        </li>

        <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
          <div className='g-pr-10'>
            <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Mobile number</strong>
            <span className='align-top'>{mobile}</span>
          </div>
          <span>
            <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1' />
          </span>
        </li>
      </ul>
  );
}