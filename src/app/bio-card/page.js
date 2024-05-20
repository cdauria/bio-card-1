'use client'

import React, { useState, useEffect } from 'react';
import styles from '../components/bioCard.module.css'


const HomePage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('API Response:', result);  // This will show you the entire response object
                setData(result.result);  // Check if 'result' key contains your desired data
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.toString());
                setIsLoading(false);
            }
        };        

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
            <div className={styles.card}>
                {data && data.map((item) => (
                    <div>
                        <p className={styles.header}>{item.name}</p>
                        <div className={styles.separator}></div>
                        <p className={styles.details}>werkzeuge / tools</p>
                        <div>
                        {item.media && (
                            <img src={item.media} alt={item.name} className={styles.media} />
                        )}
                        <div>
                        <p className={styles.details}><span>eingangsjahr / acquisition year</span>{item.acquisitionDate}</p>
                        <div className={styles.separator}></div>
                        <p className={styles.details}><span>funktion / function</span>{item.function}</p>
                        <div className={styles.separator}></div>
                        <p className={styles.details}><span>lager / storage</span>{item.storage}</p>
                        <div className={styles.separator}></div>
                        <p className={styles.details}><span>zerbrechlichkeit / fragility</span>{item.fragility}</p>
                        <div className={styles.separator}></div>
                        <p className={styles.details}><span>ausgestellt / exhibition</span>{item.exhibition}</p>
                        <div className={styles.separator}></div>
                        </div>
                        </div>
                        </div>
                    
                ))}
            </div>
    );
}

export default HomePage;



/* id: record.id,
name: record.fields.Name,
acquisitionDate: record.fields.AcquisitionDate,
function: record.fields.Function,
storage: record.fields.Storage,
fragility: record.fields.Fragility,
exhibition: record.fields.OnExhibition,
media: record.fields.Media,
*/