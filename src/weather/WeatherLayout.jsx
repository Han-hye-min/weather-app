import React from 'react';
import { wDescEngToKor } from '../utils/weatherTranslations'; // 번역 함수 임포트
import '../assets/weatherlayout.css';

function WeatherLayout({ weather }) {
    const weatherIcon = weather?.weather[0]?.icon; // 날씨 아이콘 코드 가져오기
    const weatherDescription = wDescEngToKor(weather?.weather[0]?.id); // 한글 번역된 날씨 설명
    console.log(weather);
    return (
        <div className='weather-layout'>
            <div>
                <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon" />
            </div>
            <div>{weather?.name}</div>
            <h2>{weather?.main?.temp}℃</h2>
            <h3>{weatherDescription}</h3>
        </div>
    );
}

export default WeatherLayout;
