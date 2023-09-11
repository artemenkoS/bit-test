Для запуска проекта локально необходимо:

1. Установить зависимости - yarn
2. Добавить файл .env с переменной VITE_API_KEY, в переменной хранить ключ от API Яндекс Геокодера. Ключ можно получиьт здесь: https://yandex.ru/dev/maps/geocoder/
3. Запустить приложение - yarn start

В ТЗ не было описано пожеланий по архитектуре приложения, мной была использована архитектура Feature Sliced Design (https://feature-sliced.design/ru/docs/get-started/overview)

Mock Service Worker сейчас идет в сборку потому-что production версии данного проекта не предусмотрено.