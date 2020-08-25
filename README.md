![Test](https://github.com/WarhamsterBoo/reactjs-dev/workflows/CI/badge.svg)

# ReactJS Developer course

# Final Project

Цель: Реализовать готовое для продакшн приложение

Требования
- конфигурируем приложение самостоятельно через webpack + babel
- разработка компонентов ведется отдельно в библиотеке компонентов
- четко прослеживаемая архитектура
- saga для управления всеми side effects
- устойчиво к изменениям за счет тестов
- не менее 50% прокрытие тестами
- оценка качества через stryker должна быть на высоком уровне
- полная работоспособность и решение конкретной задачи
- минимально сконфигурированный и работоспособный SSR

Критерии оценки:
+ 1 балл за правильную конфигурацию
+ 2 балла за хорошую архитектуру
+ 2 балла за хорошо проработанную библиотеку компонентов
+ 2 балла за хорошие тест кейсы
+ 2 балла за работоспособность и решение поставленной задачи
+ 1 балл за SSR

# Implementation

## SSR

Для запуска приложения на express с SSR через puppeteer-renderer:
1. Склонировать [puppeteer-renderer](https://github.com/zenato/puppeteer-renderer.git)
2. Прописать в запуске puppeteer флаг `'--disable-web-security'` вот [тут](https://github.com/zenato/puppeteer-renderer/blob/e78bda694a474990f94ce9d9b1e924226453a4cb/src/renderer.js#L109)
3. `npm i`
4. `npm start` с портом по умолчанию 3000
5. Вернуться репозиторий `reactjs-dev` и выполнить `npm start` из дирректории `./ssr`
6. Приложение будет доступно по ссылке `http://localhost:5005`


---

# Webpack + babel + typescript базовая настройка
Webpack + babel + typescript базовая настройка
Цель: В результате получим базовый скелет webpack + typescript проекта
Необходимо:
- [x] развернуть npm проект (npm init)
- [x] установить и настроить webpack
- [x] установить и настроить babel
- [x] установить и настроить typescript через babel preset
- [x] установить и настроить jest
- [x] установить и настроить eslint + prettier

Критерии оценки: + 2 балл за npm проект
+ 2 балла за установку webpack
+ 2 балла за typescript через babel loader
+ 2 балла за jest
+ 2 балла за eslint + prettier

# Установка и настройка React
Цель: Самостоятельно сконфигурировать ReactJS-проект. В результате получим готовый шаблон приложения для дальнейшей разработки.
Необходимо:
- [x] добавить конфигурации для JSX/TSX через babel используем preset-react
- [x] развернуть storybook https://storybook.js.org/
- [x] написать свой первый простой компонент "Hello World, ${username}", добавив к нему Storybook + Jest тест
- [x] настроить jest
- [x] настроить loki

Критерии оценки: +1 балл за конфигурации JSX/TSX
+ 1 балл за конфигурацию storybook
+ 1 балл за компонент "Hello World"
+ 1 балл за storybook для компонента "Hello World, ${username}"
+ 1 балл за тест

# SX как основа ReactJS. Functional components
Разрабатываем поле и наполняем его квадратиками. Родительский компонент "держит" данные. Дочерние компоненты реагируют на клик: меняют состояние.

Требования:
- разработку ведем по TDD
- разработка ведется от storybook

Что нужно сделать?
- [x] устанавливаем и настраиваем storybook knobs для манипуляции данными
- [x] родительский компонент должен принимать данные для отображения
- [x] проектируем родительский компонент, который будет выводить лист дочерних компонентов
- [x] правильно добавляем обработчик события click, меняющий состояние дочернего компонента
- [x] покрываем обработчики тестами

Критерии оценки:
+ 1 балл за настройку storybook knobs
+ 2 балла за компоненты с правильной иерархией
+ 1 балл за обработчик событий
+ 1 балл за тесты

# Components lifecycle
Используем styled-components для разработки и манипуляции стилями. Добавим стили в компоненты, разработанные в рамках предыдущего ДЗ

Что нужно сделать?
- [x] в поле пробрасываются параметры с размерами x/y - сделать так, чтобы размеры поля менялись, при изменении этих параметров. При этом состояние отмеченных клеток должно сохраняться (игра не сбрасывается) 
- [x] добавить анимацию в любом виде для клеток, которые меняют свое состояние

Критерии оценки:
+ 2 балла за использование минимум 2 разных методов жизненного цикла, в минимум 2х компонентах
+ 2 за покрытие нового функционала тестами
+ 1 балл за stories демонстрирующие изменения

# Списки, события, формы
Добавить элемены управления в приложение:
- [x] размер поля
- [x] начальный процент заполнености
- [x] управление скоростью - пауза, ускорить, замедлить, текущая скорость
- [x] остановить / сбросить
- [x] разрабатываем форму для ввода имени с кнопкой "start", поле и кнопка должны быть отцентрованы
- [x] покрываем тестами обработчики событий

Реализуем элементы управления в storybook
Элементы управления должны быть удобны для взаимодействия с пользователем, продумать UX

Критерии оценки:
+ 1 балл за реализацию всех элементов управления
+ 1 балл за форму для ввода
+ 2 балла за тесты
+ 1 балла за UX

# React patterns
Требуется:
- [x] реализуем функцию рандомного наполнения массива, в зависимости от выбранного процента заполненности
- [x] реализуем начальное заполнение поля, на основе сгенерированных данных
- [x] при смене процента заполненности, меняются данные в поле, работающая кнопка reset
- [x] планируем и разделяем ответственность между контейнерами
- [x] объединяем все элементы управления и отображения

Критерии оценки:
+ 1 балл за подготовленный шаблон приложения
+ 2 балла за функцию рандомного наполнения
+ 2 балла если при смене процента заполненности, меняются данные в поле, работающая кнопка reset

# React router
Требуется:
- [x] при старте приложения пользователь вводит имя и нажимает кнопку "start"
- [x] после ввода имени идет перенаправление на страницу с приложением
- [x] пользователь должен видеть экран приветствия только один раз
- [x] после ввода имени в приложении должно показываться имя пользователя
- [x] добавить кнопку выход, при нажатии на которую сбрасывается информация о пользователе
- [x] данные о пользователе хранить в local storage

- [x] Покрыть тестами базовые сценарии входа / выхода
- [x] Покрыть тестами функционал экрана входа

Критерии оценки:
+ 2 балла за реализацию стартового экрана
+ 2 балла за кнопку выход
+ 1 балла если все работает по сценарию

# Redux-saga intro
Цель: Подключим redux в react приложение

Требуется:
- [x] Подключаем redux, переводим стейт приложения на redux.
- [x] Добавить тесты для connect
- [x] Подключить redux-saga в наше приложение
- [x] Реализовать одну сагу в нашем приложении, которая делает полезную работу (по выбору) + тесты для этой саги

Критерии оценки:
+ 1 балл за установку и настройку redux-saga
+ 2 балла за сагу
+ 2 балла за качественные тест кейсы

# Архитектура React-приложения
Цель: Повышаем качество кодовой базы

- [x] рефакторим приложение с архитектурной точки зрения
- [x] покрываем логику работы нашего приложения интеграционными тестами

Критерии оценки:
+ 3 балла за добавление интеграционных тестов
+ 2 балла за поиск и устранение архитектурных недостатков

# Redux-saga advanced concept
Цель: Реализуем движок генерации поколений в приложении. Сосредоточьте внимание на redux+saga.

- [x] переводим стейт нашего приложения на redux + saga
- [x] используем тесты, чтобы бороться к регрессией
- [x] рефакторим тесты, повышаем их эффективность
- [x] реализуем правила работы генерации поколений в игровом поле
- [x] проверяем работоспособность всех элементов управления

Критерии оценки:
+ 2 балла за удаление стейта из react компонентов
+ 1 балл за добавление нового (новых) редюсеров и саг
+ 1 балл за работоспособное приложение
+ 1 балл за добавление / улучшение тестов

# Продвинутая конфигурация приложения
Цель: Повысим качество приложения, добавим SSR

- [ ] тестируем 2 и более приложений ваших коллег
- [ ] если находите функциональные недостатки, заводите баг репорт через issue на github
- [ ] факсим баги и устраняем проблемы, которые озвучили ваши коллеги
- [ ] разрабатываем новую фичу (SSR) по git flow.
- [ ] настраиваем простую конфигурацию SSR на приложении.

Критерии оценки:
+ 2 балла за 2+ QA проверки
+ 2 балла за оперативное исправление проблем
+ 1 балл за SSR

# Test quality tools
Цель: Повышаем качество тестов до максимума

- [x] Установка и настройка stryker
- [x] Установка и настройка jest-puppeteer
- [x] Оцениваем качество тестов и рефакторим их до максимально достижимого значения

Критерии оценки:
+ 1 балл за настройку страйкера
+ 1 балл за настройку jest-puppeteer
+ 1 балл за добавление по крайней мере одного автотеста
+ 2 балла за поиск проблем с помощью stryker и рефакторинг тестов
