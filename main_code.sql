-- Создание таблицы
CREATE TABLE pincode_table (
    id INT PRIMARY KEY,
    pincode VARCHAR(4) NOT NULL
);

-- Генерация и вставка всех возможных 4-значных комбинаций PIN-кодов
DECLARE @id INT = 1;
DECLARE @pincode VARCHAR(4);

WHILE @id <= 9999
BEGIN
    -- Форматируем id как 4-значный PIN-код
    SET @pincode = RIGHT('0000' + CAST(@id AS VARCHAR(4)), 4);
    
    -- Вставляем в таблицу
    INSERT INTO pincode_table (id, pincode) VALUES (@id, @pincode);
    
    SET @id = @id + 1;
END;