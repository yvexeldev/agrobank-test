# API Документация

## Регистрация пользователя

Сначала вам нужно зарегистрировать пользователя с помощью этой мутации в GraphQL Playground:

```graphql
mutation {
  registerUser(registerUserInput: {
    email: "email@gmail.com",
    name: "ВАШЕ ИМЯ",
    password: "пароль"
  })
}
```

После успешной регистрации вы получите код OTP на вашу электронную почту, который необходимо подтвердить. Проверка кода OTP осуществляется через код, сохраненный в хранилище Redis:

```graphql
mutation {
  verifyOtp(id: 9, otp: "479140")
}
```

## Вход пользователя

Для входа используйте следующую мутацию:

```graphql
mutation {
  loginUser(loginUserInput: {
    email: "email@email.com",
    password: "пароль"
  })
}
```

## Получение всех пользователей

Для получения списка всех пользователей (требуется токен аутентификации в заголовках):

```graphql
query {
  users {
    id
    name
    email
    events {
      id
      title
      startDate
      endDate
    }
  }
}
```

## Получение информации о себе

Для получения информации о текущем пользователе (требуется токен):

```graphql
query {
  user {
    id
    name
    email
  }
}
```

## Обновление данных пользователя

Для обновления ваших данных (требуется токен):

```graphql
mutation {
  updateUser(updateUserInput: {
    name: "НОВОЕ ИМЯ"
  }) {
    id
    name
  }
}
```

---

## Создание события

Чтобы создать новое событие, используйте следующую мутацию (требуется токен):

```graphql
mutation {
  createEvent(createEventInput: {
    title: "Название события",
    description: "Описание события",
    startDate: "2024-10-30T10:00:00Z",
    endDate: "2024-10-30T12:00:00Z",
    location_id: 1
  }) {
    id
    title
    startDate
    endDate
  }
}
```

### Входные данные для создания события

- `title`: Название события.
- `description`: Описание события.
- `startDate`: Дата и время начала события.
- `endDate`: Дата и время окончания события.
- `location_id`: ID места проведения события.

---

## Получение всех событий

Чтобы получить список всех событий (требуется токен):

```graphql
query {
  events {
    id
    title
    startDate
    endDate
  }
}
```

### Фильтры для получения событий

Вы можете использовать следующие фильтры при получении событий:

```graphql
query {
  events(filters: {
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    location_id: 1
  }) {
    id
    title
  }
}
```

---

## Обновление события

Для обновления существующего события:

```graphql
mutation {
  updateEvent(updateEventInput: {
    id: 1,
    title: "Обновленное название события",
    description: "Новое описание события",
    startDate: "2024-10-30T10:00:00Z",
    endDate: "2024-10-30T12:00:00Z",
    location_id: 1
  }) {
    id
    title
    startDate
    endDate
  }
}
```

---

## Удаление события

Для удаления события:

```graphql
mutation {
  removeEvent(id: 1) {
    id
    title
  }
}
```

---

## Создание и обновление локации

Для создания новой локации:

```graphql
mutation {
  createLocation(createLocationInput: {
    title: "Название локации",
    longitude: "34.1234",
    latitude: "45.1234"
  }) {
    id
    title
  }
}
```

Для обновления существующей локации:

```graphql
mutation {
  updateLocation(updateLocationInput: {
    id: 1,
    title: "Обновленное название локации"
  }) {
    id
    title
  }
}
```

---

## Изменение пароля

Для изменения пароля используйте следующую мутацию:

```graphql
mutation {
  changePassword(changePasswordInput: {
    current_password: "текущий_пароль",
    new_password: "новый_пароль",
    new_password_check: "новый_пароль_повторно"
  }) {
    success
    message
  }
}
```

---

Эта документация описывает основные операции с пользователями, событиями и локациями в вашей системе. Убедитесь, что вы используете актуальные токены и правильно указываете входные данные.