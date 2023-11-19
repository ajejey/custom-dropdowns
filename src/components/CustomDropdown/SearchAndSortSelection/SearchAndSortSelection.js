import React, { useEffect, useRef, useState } from 'react'
import styles from './SearchAndSortSelection.module.css'
import { optionsData } from '../../../utils/data';

const SearchAndSortSelection = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const dropdownRef = useRef(null);
    const dropdownOptionsRef = useRef(null);

    const options = optionsData;

    const handleOptionToggle = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (value) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target) && !dropdownOptionsRef?.current?.contains(event?.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div
                ref={dropdownRef}
                className={styles.select}
                onClick={() => setIsOpen(true)}
            >
                <span>
                    {selectedOptions.length > 0 ?
                        selectedOptions.map((option, index) => (
                            <span key={`${option}-${index}`} className={styles.selectedOption}>
                                <span>{option}</span>
                                <span
                                    className={styles.removeOption}
                                    onClick={() => handleOptionChange(option)}
                                >
                                    &times;
                                </span>
                            </span>
                        ))
                        :
                        <span style={{ color: 'gray' }}></span>
                    }
                    <span>
                        <input
                            type="text"
                            placeholder="Search"
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </span>
                </span>
                <div onClick={(event) => handleOptionToggle(event)}>{isOpen ? '🞁' : '⏷'}</div>
            </div>
            {isOpen && (
                <>
                    <div
                        ref={dropdownOptionsRef}
                        className={styles.dropdownOptions}
                    >
                        <button
                            className={styles.sortButton}
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                        </button>
                        {options
                            .filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
                            .sort((a, b) => {
                                if (sortOrder === 'asc') {
                                    return a.label.localeCompare(b.label);
                                } else {
                                    return b.label.localeCompare(a.label);
                                }
                            })
                            .map((option) => (
                                <label key={option.value} style={{ display: 'block' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => handleOptionChange(option.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                    </div>
                </>

            )}
            <p style={{ marginTop: '8px' }}>
                Selected Options: <b>{selectedOptions.join(', ')}</b>
            </p>
        </div>
    );
}

export default SearchAndSortSelection