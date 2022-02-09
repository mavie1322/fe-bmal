import React from 'react';

export function Queries({sortBy, order}) {
  const handleSortChange = (event) => {
    event.preventDefault();
    sortBy(event.target.value)
  }
  const handleOrderChange = (event) => {
    event.preventDefault();
    order(event.target.value)
  }
  
  return (
  <>
  <div>
      <select className='' onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="author">author</option>
          <option value="created_at">Date</option>
      </select>
  </div>
  <div>
      <select name="" onChange={handleOrderChange}>
        <option value="">Order By</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
  </div>
  </>
  );
}


