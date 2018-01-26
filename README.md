# Приложение находится в разработке
---

# Техническое задание.

1. Приложение должно поддерживать аутентификацию по паре логин и пароль.
2. Иметь разграничение прав доступа (Администратор, Менеджер)

- Администратор имеет право:
  создавать новых пользователей,
  менять пароли для всех пользователей,
  блокировать учетную запись пользователя,
  выставлять территориальный коэффициент (3 территории, каждая имеет процентный коэффициент надбавки; 0,5%, 1%, 1,5%),
  менять срок выдачи займа.

- Менеджер имеет право:
  создавать клиента,
  изменять данные по клиенту,
  пометить клиента на удаление.

4. Создание клиента:
  ФИO (обязательное поле)
  паспортные данные (обязательное поле)
  телефон (обязательное поле)
  территория,
  email,

5. Создание менеджера (пользователя программы), (все поля обязательны):
  ФИО,
  территория,
  телефон,
  логин,
  пароль

7. В случае неудачного входа в программу больше 4 раз,
  запись блокируется и администратору программы высылается
  письмо о возможном взломе программы.

8. У каждого клиента создается своя страница (карточка клиента) в ней содержатся данные:
  ФИО,
  территория,
  телефон,
  Email,
  паспортные данные,
  коэффициент надбавки,
  сумма выданных денег.
  А так же имеется 2 кнопки; «Назад» и «Выдать займ».

9. По нажатию кнопки «Выдать займ»;
  открывается новая страничка с данными о клиенте, вверху страницы ФИО клиента, и уже выданные займы и дата погашения каждого из выданных займа
  (на каждый займ по умолчанию ставится максимальный срок 30 календарных дней).
  Ниже по странице (надо будет отделить вверх страницы и низ страницы, чтобы было понятно, что вверху информационные данные,
  а ниже уже введение новых данных по займу)
  простая форма выдачи займа состоящая из 5 полей:
  Сумма займа,
  Дата выдача займа,
  Коэффициент выдачи займа (равен территориальному коэффициенту, менеджер не может его менять),
  Дата окончания погашения займа(менеджер ее может поменять, но по умолчанию она рассчитывается сроком на 30 календарных дней),
  Итого сумма возврата займа.
  Итого считается по следующему принципу: Сумма займа * коэффициент + 1 календарный день займа (равный 1% надбавки к общей суммы займа).

  Пример: 10 000 * 0,5% + 105 = Итого к погашению
          сумма займа    коэффиц.    1 день займа

10. В случае просрочки одного дня займа,
  а просрочка считается с того момента, когда кончился основной срок погашения 30 календарных дней,
  Итого будет высчитываться по следующему принципу;
  Сумма займа * коэффициент + 1 календарный день просрочки (равный 15% от общей суммы займа).

  Пример: 10 000 * 0,5% + 1507,5 = Итого к погашению
          сумма займа    коэффиц.       1 день займа

11. В случае обновления страницы данные,
  которые вводил менеджер или администратор, не сбрасываются,
  что бы не вводить их повторно.
