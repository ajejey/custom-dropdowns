import React from 'react'
import styles from './CustomDropdown.module.css'
import SingleSelection from './SingleSelection/SingleSelection'
import MultiSelection from './MultiSelection/MultiSelection'
import SearchAndSortSelection from './SearchAndSortSelection/SearchAndSortSelection'
import GroupingValues from './GroupingValues/GroupingValues'

const CustomDropdown = () => {
  return (
    <div className={styles.container}>
        <h3>Custom Dropdown</h3>
        <hr />
        <h4>P0-a Single Selection from the Dropdown List</h4>
        <SingleSelection />
        <hr />
        <h4>P0-b Multiple Selection from the Dropdown List</h4>
        <MultiSelection />
        <hr />
        <h4>P1 Search and Sort from the Dropdown List</h4>
        <SearchAndSortSelection />
        <hr />
        <h4>P2 Grouping of Values</h4>
        <GroupingValues />
        <hr />
    </div>
  )
}

export default CustomDropdown