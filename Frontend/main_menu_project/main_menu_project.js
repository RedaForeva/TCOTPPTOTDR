function setStatus(button, color) {
    // Находим родительский элемент <tr> (строку таблицы), к которому принадлежит кнопка
    const row = button.closest('tr');
    // Получаем ячейку статуса (третью ячейку в строке)
    const statusCell = row.cells[2];

    // Удаляем предыдущие классы 'green' и 'red' из строки
    row.classList.remove('green', 'red');

    // Добавляем новый класс в зависимости от переданного цвета
    if (color === 'green') {
        // Если цвет 'green', добавляем класс 'green' к строке
        row.classList.add('green');
        // Устанавливаем текст ячейки статуса на 'Одобрено'
        statusCell.textContent = 'Одобрено';
    } else if (color === 'red') {
        // Если цвет 'red', добавляем класс 'red' к строке
        row.classList.add('red');
        // Устанавливаем текст ячейки статуса на 'Отклонено'
        statusCell.textContent = 'Отклонено';
    }
}