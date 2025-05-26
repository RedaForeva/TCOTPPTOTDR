import pandas as pd
import sqlite3

# Шаг 1: Чтение CSV файла
csv_file_path = 'pincodes.csv'  # Укажите путь к вашему CSV файлу

# Чтение данных из CSV
data = pd.read_csv(csv_file_path)

# Преобразование столбца с PIN-кодами в строку, чтобы избежать потери данных
# Замените 'pin_code' на фактическое имя столбца в вашем CSV файле
if 'pin_code' in data.columns:
    data['pin_code'] = data['pin_code'].astype(str)

# Шаг 2: Подключение к базе данных SQLite (или создание новой базы данных)
conn = sqlite3.connect('pincodes.db')  # Укажите имя вашей базы данных

# Шаг 3: Запись данных в таблицу
# Если таблица не существует, она будет создана автоматически
data.to_sql('top_pincode', conn, if_exists='replace', index=False)

# Шаг 4: Закрытие соединения
conn.close()

print("Данные успешно записаны в базу данных 'pincodes.db' в таблицу 'top_pincode'.")