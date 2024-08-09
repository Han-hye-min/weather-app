import React, { useEffect, useState } from 'react';
import '../assets/layout.css';
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from '../weather/WeatherButton';
import WeatherLayout from '../weather/WeatherLayout';
import WeatherSearchBox from '../weather/WeatherSearch';

// 지역 배열 정의
const regions = [
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    // 추가 지역 가능
];

function Layout(props) {
    // weather 상태를 정의합니다. 초기 값은 null입니다.
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null); // 에러 상태 정의

    // 현재 위치 정보를 가져오는 함수  
    const getCurrentLocation = () => {
        // navigator.geolocation API를 사용하여 현재 위치를 가져옵니다.
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude; // 위도
            let lon = position.coords.longitude; // 경도
            // 현재 위치를 사용하여 날씨 정보를 가져오는 함수 호출
            getWeatherByCurrentLocation(lat, lon);
        });
    }

    // 주어진 위도와 경도를 사용하여 날씨 정보를 가져오는 함수
    const getWeatherByCurrentLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c507d4ef0032a44f85ade5f0b271db9d&units=metric`;
        try {
            let response = await fetch(url); // API 요청을 보냅니다.
            let data = await response.json(); // JSON 응답을 파싱합니다.
            if (response.ok) {
                setWeather(data); // weather 상태를 업데이트 합니다.
                setError(null); // 에러 상태를 초기화합니다.
            } else {
                throw new Error(data.message); // 응답이 실패하면 에러를 발생시킵니다.
            }
        } catch (error) {
            setError(error.message); // 에러 상태를 업데이트 합니다.
        }
    }


    // 주어진 도시 이름을 사용하여 날씨 정보를 가져오는 함수
    const getWeatherByCity = async (city) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c507d4ef0032a44f85ade5f0b271db9d&units=metric`;
        try {
            let response = await fetch(url); // API 요청을 보냅니다.
            let data = await response.json(); // JSON 응답을 파싱합니다.
            if (response.ok) {
                setWeather(data); // weather 상태를 업데이트 합니다.
                setError(null); // 에러 상태를 초기화합니다.
            } else {
                throw new Error(data.message); // 응답이 실패하면 에러를 발생시킵니다.
            }
        } catch (error) {
            setError(error.message); // 에러 상태를 업데이트 합니다.
        }
    }

    // 컴포넌트가 마운트될 때 현재 위치 정보를 가져오는 함수 호출
    useEffect(() => {
        getCurrentLocation();
    }, []);

    // 검색을 실행하는 함수
    const handleSearch = (query) => {
        getWeatherByCity(query);
    }

    const handleRegionSelect = (lat, lon) => {
        getWeatherByCurrentLocation(lat, lon);
    };
    return (
        <div className='head'>
            <div className='container'>
                {/* 에러 메시지 표시 */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {/* SearchBox 컴포넌트 추가 */}
                <WeatherSearchBox onSearch={handleSearch} />
                {/* WeatherLayout 컴포넌트에 weather 상태를 전달하여 날씨 정보를 표시합니다. */}
                <WeatherLayout weather={weather}></WeatherLayout>
                <WeatherButton weather={getCurrentLocation} regions={regions} onRegionSelect={handleRegionSelect} />
            </div>
        </div>
    );
}

export default Layout;
