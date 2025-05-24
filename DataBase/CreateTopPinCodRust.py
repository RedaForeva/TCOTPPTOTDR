import sqlite3

# Подключаемся к базе данных (или создаем ее)
conn = sqlite3.connect('top_pincod_rust.db')
cursor = conn.cursor()

# Создаем таблицу с одной колонкой
cursor.execute('CREATE TABLE top_pincod_table (id INTEGER PRIMARY KEY, value TEXT);')

# Генерируем и вставляем 1000 строк
for i in range(1, 10001):
    cursor.execute('INSERT INTO top_pincod_table (value) VALUES (?);', (i,))

# Сохраняем изменения и закрываем соединение
conn.commit()
conn.close()
