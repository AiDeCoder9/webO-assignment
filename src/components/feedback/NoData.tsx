import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

export default function NoData(props: NoDataProps) {
  const {
    title = 'No Favorites yet',
    type = 'favorite',
    description = 'Your selected favorite items will appear here.'
  } = props;
  return (
    <div className="noData-container">
      <div className="icon">
        {type === 'favorite' ? (
          <AiFillHeart aria-label="favorite" size={32} />
        ) : (
          <BiSearch aria-label="search" size={32} />
        )}
      </div>
      <h6 className="noData-title">{title}</h6>
      <p className="noData-description">{description}</p>
    </div>
  );
}
