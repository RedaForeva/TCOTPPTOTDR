import pandas as pd

# Чтение файла TXT
df = pd.read_csv('pincodes.txt', dtype=str, header=None)  # Указываем, что все данные - строки и нет заголовка

# Добавление кавычек к каждому значению
df[0] = '"' + df[0] + '"'

# Установка названия столбца
df.columns = ['pincodes']  # Устанавливаем название столбца

# Сохранение в CSV с названием столбца
df.to_csv('pincodes.csv', index=False, header=True, quoting=1)  # quoting=1 добавляет кавычки к строкам