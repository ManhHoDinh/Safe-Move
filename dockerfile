# Sử dụng image NGINX chính thức
FROM nginx:alpine

# Copy file cấu hình NGINX vào container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose cổng 8080
EXPOSE 8080
