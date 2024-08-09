import React, { Fragment, useState } from 'react';
import '../assets/weathersearch.css';

function WeatherSearchBox({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearch(query);
            setQuery(''); // 검색 후 입력 필드를 초기화합니다.
        }
    }

    return (
        <Fragment>
            <h1>검색</h1>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Enter city name" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyPress={handleKeyPress} 
            />
        </Fragment>
    );
}

export default WeatherSearchBox;
