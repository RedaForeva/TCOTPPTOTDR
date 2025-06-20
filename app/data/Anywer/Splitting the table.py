import sqlite3

# Подключение к базе данных
conn = sqlite3.connect('top_pincod_rust.db')
cursor = conn.cursor()

# Инициализируем словарь для подсчета
count_dict = {str(i): 0 for i in range(10)}  # Счетчики для 0-9

# Генерация префиксов от 0 до 999
prefixes = []
for length in range(1, 4):  # Длина от 1 до 3
    for i in range(10):
        prefix = str(i) * length  # Повторяем цифру i 'length' раз
        prefixes.append(prefix)  # Добавляем префикс в список
        count_dict[prefix] = 0  # Инициализация счетчика

# Создание таблиц для каждого префикса
for prefix in prefixes:
    table_name = f"table_{prefix}"  # Имя таблицы
    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pin_code TEXT NOT NULL
        )
    ''')

# Извлечение кодов из таблицы top_pincod_table
cursor.execute("SELECT pincode FROM top_pincod_table")  # Используем правильное имя столбца
pin_codes = cursor.fetchall()  # Получаем все коды

# Добавление кодов в соответствующие таблицы
for (pin_code,) in pin_codes:  # Извлекаем значение из кортежа
    # Определяем префикс (например, первые 1, 2 или 3 символа)
    prefix = pin_code[:3]  # Берем первые 3 символа как префикс
    if prefix in prefixes:  # Проверяем, существует ли префикс
        table_name = f"table_{prefix}"
        cursor.execute(f'''
            INSERT INTO {table_name} (pin_code) VALUES (?)
        ''', (pin_code,))

# Сохранение изменений и закрытие соединения
conn.commit()
conn.close()

