import sqlite3

# Подключение к базе данных
conn = sqlite3.connect('top_pincod_rust.db')
cursor = conn.cursor()

# Укажите имя таблицы
table_name = 'top_pincod_table'  # Замените на имя вашей таблицы

# Получение данных из таблицы
cursor.execute(f"SELECT * FROM {table_name};")
rows = cursor.fetchall()

# Получение количества столбцов
column_count = len(cursor.description)

# Вывод количества строк и столбцов
print(f"Количество строк: {len(rows)}")
print(f"Количество столбцов: {column_count}")

# Вывод содержимого таблицы
for row in rows:
    print(row)

# Закрытие соединения
conn.close()