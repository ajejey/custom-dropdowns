import React, { useEffect, useRef, useState } from 'react'
import styles from './reactGridLayout.module.css'
import { toWords } from '../../utils/utilFunctions';

const ReactGridLayout = ({columns, NumberOfBoxes}) => {
    const divRefs = useRef(Array(NumberOfBoxes).fill().map(() => React.createRef()));

    useEffect(() => {
        if(NumberOfBoxes === null) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // console.log("entry", entry);
                if (entry.isIntersecting) {
                    console.log(`divRef ${toWords(entry.target.id)} was called`);                    
                }
            });
        });

        divRefs.current.forEach((ref) => {
            observer.observe(ref.current);
        });
        

    }, []);

    return (
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gridGap: '8px'}}>
            {NumberOfBoxes !== null && Array.from(Array(NumberOfBoxes)).map((_, i) => (
                <div id={i+1} ref={divRefs.current[i]} key={i} className={styles.box}>
                    {toWords(i + 1)}
                </div>
            ))}
        </div>
    );
}

export default ReactGridLayout