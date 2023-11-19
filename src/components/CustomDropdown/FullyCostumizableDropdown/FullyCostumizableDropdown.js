import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styles from './FullyCustomizableDropdown.module.css';

const FullyCustomizableDropdown = ({ options, singleSelect, search, sortable }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const dropdownRef = useRef(null);
    const dropdownOptionsRef = useRef(null);


    const groupedOptions = {};
    options.forEach((option) => {
        const { optionGroup } = option;

        if (optionGroup && !groupedOptions[optionGroup]) {
            groupedOptions[optionGroup] = [];
        }

        if (optionGroup) {
            groupedOptions[optionGroup].push(option);
        } else {
            groupedOptions['default'] = groupedOptions['default'] || [];
            groupedOptions['default'].push(option);
        }
    });

    const handleOptionToggle = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (value) => {
        if (singleSelect) {
            setSelectedOptions([value]);
        } else {
            if (selectedOptions.includes(value)) {
                setSelectedOptions(selectedOptions.filter((option) => option !== value));
            } else {
                setSelectedOptions([...selectedOptions, value]);
            }
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
                                {!singleSelect && (
                                    <span
                                        className={styles.removeOption}
                                        onClick={() => handleOptionChange(option)}
                                    >
                                        &times;
                                    </span>
                                )}

                            </span>
                        ))
                        :
                        <span style={{ color: 'gray' }}></span>
                    }
                    {search && (
                        <span>
                            <input
                                type="text"
                                placeholder="Search"
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </span>
                    )}
                </span>
                <div onClick={(event) => handleOptionToggle(event)}>{isOpen ? '🞁' : '⏷'}</div>
            </div>
            {isOpen && (
                <>
                    <div
                        ref={dropdownOptionsRef}
                        className={styles.dropdownOptions}
                    >
                        {sortable === true &&
                            <button
                                className={styles.sortButton}
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            >
                                {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                            </button>
                        }

                        {Object.entries(groupedOptions).map(
                            ([optionGroup, optionGroupOptions]) => (
                                <div key={optionGroup}>
                                    {console.log("optionGroup, optionGroupOptions", optionGroup, optionGroupOptions)}
                                    {
                                        (optionGroupOptions.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && optionGroup !== 'default')
                                        &&
                                        <div style={{ color: 'gray', margin: '4px 0' }}>{optionGroup}</div>
                                    }
                                    {optionGroupOptions
                                        .filter((option) => {
                                            if (search === false) {
                                                return true;
                                            }
                                            return option.label.toLowerCase().includes(searchQuery.toLowerCase())
                                        })
                                        .sort((a, b) => {
                                            if (sortable === false) {
                                                return 0;
                                            }
                                            if (sortOrder === "asc") {
                                                return a.label.localeCompare(b.label);
                                            } else {
                                                return b.label.localeCompare(a.label);
                                            }
                                        })
                                        .map((option) => (
                                            <label
                                                key={option.value}
                                                style={{ display: "block", margin: "4px 8px" }}
                                            >
                                                <input
                                                    type={singleSelect ? "radio" : "checkbox"}
                                                    checked={selectedOptions.includes(option.value)}
                                                    onChange={() => handleOptionChange(option.value)}
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                </div>
                            )
                        )}
                    </div>
                </>

            )}
            <p style={{ marginTop: '8px' }}>
                Selected Options:
                <ul>
                    {selectedOptions.map((option, index) => (
                        <li key={`${option}-${index}`}>{option}</li>
                    ))}
                </ul>
            </p>
        </div>
    );
}

export default FullyCustomizableDropdown


