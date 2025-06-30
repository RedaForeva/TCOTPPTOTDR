import sqlite3

# Создаем соединение с базой данных
conn = sqlite3.connect('top_pincod_rust.db')  # Замените 'your_database.db' на имя вашей базы данных
cursor = conn.cursor()

# Список таблиц в нужном порядке
tables = [
    'table_0', 'table_00', 'table_000',
    'table_1', 'table_11', 'table_111',
    'table_2', 'table_22', 'table_222',
    'table_3', 'table_33', 'table_333',
    'table_4', 'table_44', 'table_444',
    'table_5', 'table_55', 'table_555',
    'table_6', 'table_66', 'table_666',
    'table_7', 'table_77', 'table_777',
    'table_8', 'table_88', 'table_888',
    'table_9', 'table_99', 'table_999'
]

# Проходим по списку таблиц и выполняем запросы
for table in tables:
    cursor.execute(f'SELECT * FROM {table}')
    rows = cursor.fetchall()  # Получаем все строки из таблицы

    # Выводим данные из текущей таблицы
    print(f'Данные из {table}:')
    if rows:  # Проверяем, есть ли данные
        for row in rows:
            print(row)
    else:
        print('Нет данных.')
    print()  # Пустая строка для разделения выводов

# Закрываем соединение
conn.close()