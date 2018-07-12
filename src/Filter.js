import React from 'react';

const Filter = (props) => {
  return (
    <input className="filter"
      type='text'
      value={props.searchTerm}
      onChange={props.handleSearchChange}
      placeholder="search cocktails"
    />
  )
}

export default Filter;
