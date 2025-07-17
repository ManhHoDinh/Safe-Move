# Sử dụng image Python chính thức
FROM python:3.10

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file requirements
COPY requirements.txt .

# Cài đặt các phụ thuộc
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn
COPY ./app /app/app

# Mở cổng 8000
EXPOSE 8000

# Chạy ứng dụng
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
