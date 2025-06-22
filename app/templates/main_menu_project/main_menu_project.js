// Массив для хранения пин-кодов
const pinCodes = [
    { code: '1234', status: '' },
    { code: '5678', status: '' },
    { code: '9101', status: '' }
];

// Массивы для хранения пин-кодов по статусу
const approvedPins = [];
const rejectedPins = [];
let currentIndex = 0;

function displayCurrentPinCode() {
    const currentPinCodeElement = document.getElementById('currentPinCode');
    
    if (currentIndex < pinCodes.length) {
        currentPinCodeElement.textContent = pinCodes[currentIndex].code;
    } else {
        currentPinCodeElement.textContent = approvedPins.length > 0 
            ? 'Пароль найден, можно прекратить поиски' 
            : 'Все пин-коды обработаны';
    }
}

function setStatus(button, color) {
    const pinCode = pinCodes[currentIndex];

    if (pinCode) {
        if (color === 'green') {
            pinCode.status = 'Подходит';
            approvedPins.push(pinCode);
            console.log(`Пин-код ${pinCode.code} подходит.`);
        } else if (color === 'red') {
            pinCode.status = 'Не подходит';
            rejectedPins.push(pinCode);
            console.log(`Пин-код ${pinCode.code} не подходит.`);
        }

        currentIndex++;
        displayCurrentPinCode();
        updateStatusTables();
    }
}

function updateStatusTables() {
    const approvedTableBody = document.getElementById('approvedPinTableBody');
    const rejectedTableBody = document.getElementById('rejectedPinTableBody');

    // Очищаем таблицы
    approvedTableBody.innerHTML = '';
    rejectedTableBody.innerHTML = '';

    // Добавляем одобренные пин-коды
    approvedPins.forEach(pin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pin.code}</td>
            <td>Одобрено</td>
            <td>
                <button onclick="confirmPin('${pin.code}')">V</button>
                <button onclick="rejectPin('${pin.code}')">X</button>
            </td>
        `;
        approvedTableBody.appendChild(row);
    });

    // Добавляем отклоненные пин-коды
    rejectedPins.forEach(pin => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${pin.code}</td><td>Отклонено</td>`;
        row.style.backgroundColor = 'lightcoral'; // Красный цвет для отклоненного пин-кода
        rejectedTableBody.appendChild(row);
    });
}

function confirmPin(pinCode) {
    // Логика для подтверждения пин-кода
    console.log(`Пин-код ${pinCode} подтвержден. Поиск прекращен.`);
    // Здесь можно добавить логику для завершения поиска
}

function rejectPin(pinCode) {
    // Логика для отклонения пин-кода
    const index = approvedPins.findIndex(pin => pin.code === pinCode);
    if (index !== -1) {
        approvedPins.splice(index, 1);
        console.log(`Пин-код ${pinCode} отклонен.`);
        updateStatusTables();
    }
}

// Инициализация отображения первого пин-кода при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentPinCode();
});