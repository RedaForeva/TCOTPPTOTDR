# Пример кода на Python для преобразования TXT в CSV
import csv

# Открываем текстовый файл и читаем пин-коды
with open('pincodes.txt', 'r') as txt_file:
    pincodes = txt_file.readlines()

# Убираем пробелы и символы новой строки
pincodes = [pincode.strip() for pincode in pincodes]

# Сохраняем в CSV файл
with open('pincodes.csv', 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    for pincode in pincodes:
        writer.writerow([pincode])  # Записываем каждый пин-код в отдельной строке