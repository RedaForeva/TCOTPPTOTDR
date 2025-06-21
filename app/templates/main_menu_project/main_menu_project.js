// Массив для хранения пин-кодов
const pinCodes = [
    { code: '1234', status: '' },
    { code: '5678', status: '' },
    { code: '9101', status: '' }
];

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
        pinCode.status = color === 'green' ? 'Подходит' : 'Не подходит';
    }

    // Добавляем новый класс в зависимости от переданного цвета
    if (color === 'green') {
        // Если цвет 'green', добавляем класс 'green' к строке
        row.classList.add('green');
        // Устанавливаем текст ячейки статуса на 'Одобрено'
        statusCell.textContent = 'Одобрено';
        console.log(`Пин-код ${pinCode.code} подходит.`);
    } else if (color === 'red') {
        // Если цвет 'red', добавляем класс 'red' к строке
        row.classList.add('red');
        // Устанавливаем текст ячейки статуса на 'Отклонено'
        statusCell.textContent = 'Отклонено';
        console.log(`Пин-код ${pinCode.code} не подходит.`);
    }
}

function generateCodes() {
    // Логика генерации новых пин-кодов
    console.log("Генерация новых пин-кодов...");
}

function shareWithFriend() {
    // Логика для поделиться с другом
    console.log("Поделиться с другом...");
}