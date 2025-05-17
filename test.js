function setStatus(button, color) {
    const row = button.closest('tr');
    const statusCell = row.cells[2];

    // Удаляем предыдущие классы
    row.classList.remove('green', 'red');

    // Добавляем новый класс в зависимости от нажатой кнопки
    if (color === 'green') {
        row.classList.add('green');
        statusCell.textContent = 'Одобрено';
    } else if (color === 'red') {
        row.classList.add('red');
        statusCell.textContent = 'Отклонено';
    }
}