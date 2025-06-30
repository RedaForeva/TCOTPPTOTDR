// Массив для хранения пин-кодов с их статусами
const pinCodes = [
    { code: '1234', status: '' },
    { code: '5678', status: '' },
    { code: '9101', status: '' }
];

// Массивы для хранения пин-кодов по статусу
const approvedPins = [];
const rejectedPins = [];
let currentIndex = 0;

// Отображение текущего пин-кода или сообщения о завершении
function displayCurrentPinCode() {
    const currentPinCodeElement = document.getElementById('currentPinCode');
    if (currentIndex < pinCodes.length) {
        currentPinCodeElement.textContent = pinCodes[currentIndex].code;
    } else {
        const hasApproved = approvedPins.some(pin => pin.status === 'Пароль подтвержден');
        currentPinCodeElement.textContent = hasApproved 
            ? 'Пароль найден, можно прекратить поиски' 
            : 'Все пин-коды обработаны';
    }
}

// Установка статуса пин-кода и обновление индекса
function setStatus(button, color) {
    const pinCode = pinCodes[currentIndex];
    if (pinCode) {
        pinCode.status = color === 'green' ? 'Подходит' : 'Не подходит';
        (color === 'green' ? approvedPins : rejectedPins).push(pinCode);
        console.log(`Пин-код ${pinCode.code} ${color === 'green' ? 'подходит' : 'не подходит'}.`);
        currentIndex++;
        displayCurrentPinCode();
        updateStatusTables();
    }
}

// Обновление таблиц одобренных, отклоненных и необработанных пин-кодов
function updateStatusTables() {
    const approvedTableBody = document.getElementById('approvedPinTableBody');
    const rejectedTableBody = document.getElementById('rejectedPinTableBody');
    const unprocessedTableBody = document.getElementById('unprocessedPinTableBody');

    // Очищаем таблицы
    approvedTableBody.innerHTML = '';
    rejectedTableBody.innerHTML = '';
    unprocessedTableBody.innerHTML = '';

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

    // Добавляем необработанные пин-коды
    pinCodes.forEach(pin => {
        if (!pin.status) { // Проверяем, что пин-код еще не обработан
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pin.code}</td>
                <td>Необработан</td>
                <td>
                    <button onclick="setStatus(this, 'green')">Одобрить</button>
                    <button onclick="setStatus(this, 'red')">Отклонить</button>
                </td>
            `;
            unprocessedTableBody.appendChild(row);
        }
    });
}

// Подтверждение пин-кода и обновление таблицы
function confirmPin(pinCode) {
    const index = approvedPins.findIndex(pin => pin.code === pinCode);
    if (index !== -1) {
        const confirmedPin = approvedPins.splice(index, 1)[0];
        updateStatusTables();
        const approvedTableBody = document.getElementById('approvedPinTableBody');
        approvedTableBody.innerHTML = `<tr><td>${confirmedPin.code}</td><td>Пароль подтвержден</td></tr>`;
        document.getElementById('currentPinCode').textContent = 'Пароль подтвержден';
        console.log(`Пин-код ${pinCode} подтвержден. Поиск прекращен.`);
    }
}

// Отклонение пин-кода и обновление таблицы
function rejectPin(pinCode) {
    const index = approvedPins.findIndex(pin => pin.code === pinCode);
    if (index !== -1) {
        // Перемещаем отклоненный пин-код из одобренных в отклоненные
        rejectedPins.push(approvedPins.splice(index, 1)[0]);
        console.log(`Пин-код ${pinCode} отклонен.`);
        updateStatusTables(); // Обновляем таблицы после отклонения
    }
}

// Инициализация отображения первого пин-кода при загрузке страницы
document.addEventListener('DOMContentLoaded', displayCurrentPinCode);
