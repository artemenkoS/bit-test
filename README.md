Для запуска проекта локально необходимо:

1. Установить зависимости - yarn
2. Добавить в файл .env в переменную VITE_API_KEY ключ от API Яндекс Геокодера. Ключ можно получить здесь: https://yandex.ru/dev/maps/geocoder/
3. Запустить приложение - yarn start

В ТЗ не было описано пожеланий по архитектуре приложения, мной была использована архитектура Feature Sliced Design (https://feature-sliced.design/ru/docs/get-started/overview)

Mock Service Worker сейчас идет в сборку потому-что production версии данного проекта не предусмотрено.
