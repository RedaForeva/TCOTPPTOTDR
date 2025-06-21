// Массив для хранения пин-кодов
const pinCodes = [
    { code: '1234', status: '' },
    { code: '5678', status: '' },
    { code: '9101', status: '' }
];

// Массивы для хранения пин-кодов по статусу
const approvedPins = [];
const rejectedPins = [];

function setStatus(button, color) {
    // Находим родительский элемент <tr> (строку таблицы), к которому принадлежит кнопка
    const row = button.closest('tr');
    // Получаем ячейку статуса (третью ячейку в строке)
    const statusCell = row.cells[2];

    // Удаляем предыдущие классы 'green' и 'red' из строки
    row.classList.remove('green', 'red');

    // Обновляем статус в массиве
    const pinCodeCell = row.cells[0];
    const pinCode = pinCodes.find(pin => pin.code === pinCodeCell.textContent);
    
    if (pinCode) {
        // Удаляем пин-код из соответствующего массива, если он уже там есть
        if (pinCode.status === 'Подходит') {
            const index = approvedPins.findIndex(pin => pin.code === pinCode.code);
            if (index !== -1) {
                approvedPins.splice(index, 1);
            }
        } else if (pinCode.status === 'Не подходит') {
            const index = rejectedPins.findIndex(pin => pin.code === pinCode.code);
            if (index !== -1) {
                rejectedPins.splice(index, 1);
            }
        }

        // Устанавливаем новый статус
        pinCode.status = color === 'green' ? 'Подходит' : 'Не подходит';

        // Добавляем пин-код в соответствующий массив
        if (color === 'green') {
            approvedPins.push(pinCode);
            row.classList.add('green');
            statusCell.textContent = 'Одобрено';
            console.log(`Пин-код ${pinCode.code} подходит.`);
        } else if (color === 'red') {
            rejectedPins.push(pinCode);
            row.classList.add('red');
            statusCell.textContent = 'Отклонено';
            console.log(`Пин-код ${pinCode.code} не подходит.`);
        }

        // Обновляем таблицы одобренных и отклоненных пин-кодов
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
        row.innerHTML = `<td>${pin.code}</td><td>Одобрено</td>`;
        approvedTableBody.appendChild(row);
    });

    // Добавляем отклоненные пин-коды
    rejectedPins.forEach(pin => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${pin.code}</td><td>Отклонено</td>`;
        rejectedTableBody.appendChild(row);
    });
}

function generateCodes() {
    // Логика генерации новых пин-кодов
    console.log("Генерация новых пин-кодов...");
}

function shareWithFriend() {
    // Логика для поделиться с другом
    console.log("Поделиться с другом...");
}