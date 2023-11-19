import React, { useState } from 'react'
import styles from './CustomDropdown.module.css'
import SingleSelection from './SingleSelection/SingleSelection'
import MultiSelection from './MultiSelection/MultiSelection'
import SearchAndSortSelection from './SearchAndSortSelection/SearchAndSortSelection'
import GroupingValues from './GroupingValues/GroupingValues'
import { optionsData, optionsWithGroups, optionsWithGroupsData } from '../../utils/data'
import FullyCustomizableDropdown from './FullyCostumizableDropdown/FullyCostumizableDropdown'

const CustomDropdown = () => {
  const [singleSelect, setSingleSelect] = useState(false);
  const [search, setSearch] = useState(true);
  const [sortable, setSortable] = useState(true);
  const [grouped, setGrouped] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>

      <form className={`${styles.form} ${styles.container}`}>
        <h3 className={styles.heading}>Fully Customizable Dropdown</h3>
        <label className={styles.label}>
          Multi Select:
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={singleSelect}
            onChange={(event) => setSingleSelect(event.target.checked)}
          />
        </label>
        <label className={styles.label}>
          Search:
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={search}
            onChange={(event) => setSearch(event.target.checked)}
          />
        </label>
        <label className={styles.label}>
          Sortable:
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={sortable}
            onChange={(event) => setSortable(event.target.checked)}
          />
        </label>
        <label className={styles.label}>
          Grouped:
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={grouped}
            onChange={(event) => setGrouped(event.target.checked)}
          />
        </label>
        {/* <button className={styles.submit} type="submit">Submit</button> */}
      </form>

      <div className={styles.dropdownContainer}>
        <div>
          <h3>Your Custom Dropdown: </h3>

          <FullyCustomizableDropdown
            singleSelect={!singleSelect}
            search={search}
            sortable={sortable}
            options={grouped ? optionsWithGroups : optionsData}
          />
        </div>
      </div>



      {/* <h4>P0-a Single Selection from the Dropdown List</h4>
      <SingleSelection options={optionsData} />
      <hr />
      <h4>P0-b Multiple Selection from the Dropdown List</h4>
      <MultiSelection options={optionsData} />
      <hr />
      <h4>P1 Search and Sort from the Dropdown List</h4>
      <SearchAndSortSelection options={optionsData} />
      <hr />
      <h4>P2 Grouping of Values</h4>
      <GroupingValues options={optionsWithGroupsData} />
      <hr /> */}
    </div>
  )
}

export default CustomDropdown