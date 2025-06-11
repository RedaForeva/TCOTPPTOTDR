import sqlite3

# Подключение к базе данных
conn = sqlite3.connect('top_pincod_rust.db')
# Создаем курсор
cursor = conn.cursor()

# Выполняем SQL запрос для получения всех пин-кодов, начинающихся с цифр от '0' до '9'
cursor.execute("""
    SELECT * FROM top_pincod_table
    WHERE pincode LIKE '0%' OR
    pincode LIKE '1%' OR
    pincode LIKE '2%' OR
    pincode LIKE '3%' OR
    pincode LIKE '4%' OR
    pincode LIKE '5%' OR
    pincode LIKE '6%' OR
    pincode LIKE '7%' OR
    pincode LIKE '8%' OR
    pincode LIKE '9%' ORDER BY LENGTH(pincode) ASC, pincode ASC
""")

rows = cursor.fetchall()

# Альтернативный способ с использованием генератора словарей
#count_dict = {f"{digit * (i + 1)}": 0 for digit in range(10) for i in range(3)}

# Выводим данные и считаем количество пин-кодов
# Инициализируем словарь для подсчета
count_dict = {str(i): 0 for i in range(10)}  # Счетчики для 0-9
count_dict.update({str(i)*2: 0 for i in range(10)})  # Счетчики для 00-99
count_dict.update({str(i)*3: 0 for i in range(10)})  # Счетчики для 000-999

# Выводим данные и считаем количество пин-кодов
for row in rows:
    pincode = row[1]
    print("id:", row[0], "пин-код:", pincode)

    # Проверяем начальные символы
    for i in range(10):
        prefix1 = str(i)
        prefix2 = str(i) * 2
        prefix3 = str(i) * 3

        if pincode.startswith(prefix3):
            count_dict[prefix3] += 1
        elif pincode.startswith(prefix2):
            count_dict[prefix2] += 1
        elif pincode.startswith(prefix1):
            count_dict[prefix1] += 1

# Выводим результаты
for key, value in count_dict.items():
    print(f"Пин код {key}: кол-во раз: {value}")


# Закрываем базу данных
conn.close()