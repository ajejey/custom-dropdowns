import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styles from './GroupingValues.module.css';

const GroupingValues = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const dropdownRef = useRef(null);
    const dropdownOptionsRef = useRef(null);

    const options = [
        { value: 'Maharashtra', label: 'Maharashtra', region: 'central' },
        { value: 'Karnataka', label: 'Karnataka', region: 'south' },
        { value: 'TamilNadu', label: 'TamilNadu', region: 'south' },
        { value: 'Kerala', label: 'Kerala', region: 'south' },
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh', region: 'south' },
        { value: 'West Bengal', label: 'West Bengal', region: 'east' },
        { value: 'Chhattisgarh', label: 'Chhattisgarh', region: 'central' },
        { value: 'Madhya Pradesh', label: 'Madhya Pradesh', region: 'central' },
        { value: 'Jharkhand', label: 'Jharkhand', region: 'north' },
        { value: 'Rajasthan', label: 'Rajasthan', region: 'west' },
        { value: 'Gujarat', label: 'Gujarat', region: 'west' },
        { value: 'Delhi', label: 'Delhi', region: 'north' },
        { value: 'Haryana', label: 'Haryana', region: 'north' },
        { value: 'Punjab', label: 'Punjab', region: 'north' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh', region: 'north' },
        { value: 'Himachal Pradesh', label: 'Himachal Pradesh', region: 'north' }
    ];


    const groupedOptions = {};
    options.forEach((option) => {
        const { region } = option;
        if (!groupedOptions[region]) {
            groupedOptions[region] = [];
        }
        groupedOptions[region].push(option);
    });

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
                        {Object.entries(groupedOptions).map(
                            ([region, regionOptions]) => (
                                <div key={region}>
                                    {console.log("region, regionOptions", region, regionOptions)}
                                    {
                                        regionOptions.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase())).length > 0
                                        &&
                                        <div style={{ color: 'gray', margin: '4px 0' }}>{region}</div>
                                    }
                                    {regionOptions
                                        .filter((option) =>
                                            option.label
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase()
                                                )
                                        )
                                        .sort((a, b) => {
                                            if (sortOrder === "asc") {
                                                return a.label.localeCompare(
                                                    b.label
                                                );
                                            } else {
                                                return b.label.localeCompare(
                                                    a.label
                                                );
                                            }
                                        })
                                        .map((option) => (
                                            <label
                                                key={option.value}
                                                style={{ display: "block", marginLeft: "8px" }}
                                            >
                                                <input
                                                    type="checkbox"
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
                Selected Options: <b>{selectedOptions.join(', ')}</b>
            </p>
        </div>
    );
}

export default GroupingValues


