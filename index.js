document.addEventListener('DOMContentLoaded', () => {
    const token = fetchLoginToken();
    if (!token) {
        console.error('Token not found. Please ensure you are logged in.');
        return;
    }

    // Attach click event listeners to each district
    const districts = document.querySelectorAll('path[name]');
    districts.forEach(district => {
        district.addEventListener('click', () => {
            const districtName = district.getAttribute('name');
            fetchData(districtName, token)
                .then(data => displayWeatherData(data, districtName))
                .catch(error => console.error('Error fetching or displaying data:', error));
        });
    });

    // Fetch data initially and then every 5 seconds
    fetchDataPeriodically(token);
});

function fetchLoginToken() {
    return localStorage.getItem('token');
}

function fetchDataPeriodically(token) {
    setInterval(() => {
        fetchDataForAllDistricts(token);
    }, 5000); // 5 seconds in milliseconds
}

function fetchDataForAllDistricts(token) {
    const districts = document.querySelectorAll('path[name]');
    districts.forEach(district => {
        const districtName = district.getAttribute('name');
        fetchData(districtName, token)
            .catch(error => console.error('Error fetching data for', districtName, ':', error));
    });
}

function fetchData(districtName, token) {
    const apiUrl = `https://jade-nice-deer.cyclic.app/wcast/getnonExpired?district=${districtName}`;

    return fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

function displayWeatherData(data, districtName) {
    const districtEntries = data.filter(entry => entry.districtName === districtName);

    if (districtEntries.length === 0) {
        alert(`No data available for ${districtName}`);
        return;
    }

    const latestEntry = districtEntries[districtEntries.length - 1]; // Get the latest entry

    const weatherMessage = `
        <b>Temperature:</b> ${latestEntry.temperature} C°<br>
        <b>Humidity:</b> ${latestEntry.humidity} %<br>
        <b>Air Pressure:</b> ${latestEntry.airPressure} mbar<br>
        <b>Last Update:</b> ${latestEntry.dateTime}<br><br>
    `;

    const alertContent = `
        <div style="font-family: Arial, sans-serif;">
            <h2>${districtName}</h2>
            ${weatherMessage}
        </div>
    `;

    const dummyElement = document.createElement('div');
    dummyElement.innerHTML = alertContent;

    alert(dummyElement.textContent || dummyElement.innerText);
}
