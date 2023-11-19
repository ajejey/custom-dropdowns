import React, { useState, useEffect, useRef } from 'react';
import styles from './MultiSelection.module.css';
import { optionsData } from '../../../utils/data';


const MultiSelectDropdown = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownOptionsRef = useRef(null);

    const options = optionsData

    const handleOptionToggle = () => {
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
                onClick={handleOptionToggle}
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
                        <span style={{ color: 'gray' }}>Select Options</span>
                    }
                </span>
                <span>{isOpen ? '🞁' : '⏷'}</span>
            </div>
            {isOpen && (
                <div
                    ref={dropdownOptionsRef}
                    className={styles.dropdownOptions}
                >
                    {options.map((option) => (
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
            )}
            <p style={{ marginTop: '8px' }}>
                Selected Options: <b>{selectedOptions.join(', ')}</b>
            </p>
        </div>
    );
};

export default MultiSelectDropdown;