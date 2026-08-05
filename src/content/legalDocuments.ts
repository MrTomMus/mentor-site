import { CONSENT_TEXT_ID, PRIVACY_POLICY_VERSION } from '@/config/consent'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

export interface LegalDocument {
  title: string
  description: string
  versionLabel: string
  versionId: string
  effectiveLabel: string
  /** Optional banner; omit or leave empty to hide. */
  notice?: string
  sections: LegalSection[]
}

type Placeholders = {
  operatorName: string
  operatorLocation: string
  privacyEmail: string
  siteDomain: string
  effectiveDate: string
}

function fill(template: string, p: Placeholders): string {
  return template
    .replaceAll('[ФИО САМОЗАНЯТОГО]', p.operatorName)
    .replaceAll('[СТРАНА И ГОРОД]', p.operatorLocation)
    .replaceAll('[EMAIL ДЛЯ ОБРАЩЕНИЙ ПО ПЕРСОНАЛЬНЫМ ДАННЫМ]', p.privacyEmail)
    .replaceAll('[ДОМЕН САЙТА]', p.siteDomain)
    .replaceAll('[ДАТА ВСТУПЛЕНИЯ В СИЛУ]', p.effectiveDate)
    .replaceAll('[OPERATOR_NAME]', p.operatorName)
    .replaceAll('[OPERATOR_LOCATION]', p.operatorLocation)
    .replaceAll('[PRIVACY_EMAIL]', p.privacyEmail)
    .replaceAll('[SITE_DOMAIN]', p.siteDomain)
    .replaceAll('[EFFECTIVE_DATE]', p.effectiveDate)
}

const TELEGRAM_RECEIPT_RU =
  'Оператор получает сведения из заявки только после того, как пользователь самостоятельно отправляет сообщение через Telegram.'

const TELEGRAM_RECEIPT_EN =
  'The operator receives information from the request only after the user independently sends the message via Telegram.'

export function getPrivacyDocument(locale: 'ru' | 'en', p: Placeholders): LegalDocument {
  if (locale === 'en') {
    return {
      title: 'Privacy Policy',
      description: 'How personal data from mentorship requests is processed on this website.',
      versionLabel: 'Document version',
      versionId: PRIVACY_POLICY_VERSION,
      effectiveLabel: 'Effective date',
      sections: [
        {
          id: 'general',
          title: '1. General provisions',
          paragraphs: [
            'This Privacy Policy describes how personal data submitted through the mentorship request form on [SITE_DOMAIN] is processed.',
            'By submitting the form and providing consent, you confirm that you have read this Policy.',
          ].map((t) => fill(t, p)),
        },
        {
          id: 'controller',
          title: '2. Controller / operator details',
          paragraphs: [
            'Personal data operator:',
            '[OPERATOR_NAME],',
            'self-employed individual of the Russian Federation.',
            'Location:',
            '[OPERATOR_LOCATION].',
            'Contact for personal data processing matters:',
            '[PRIVACY_EMAIL]',
          ].map((t) => fill(t, p)),
        },
        {
          id: 'data',
          title: '3. Categories of personal data',
          paragraphs: [
            'The following may be processed from the request form: name; email address; Telegram username; message text; submission date and time; form language; page from which the form was submitted.',
            'The hosting provider may automatically process technical data necessary for operation, security, and diagnostics of the website (for example, IP address, date and time of the request, page address, and browser and device information).',
            'Special categories of personal data are not requested through the form.',
            'Users are advised not to include in the message text information about health, political opinions, religious or philosophical beliefs, intimate life, or other special categories of personal data.',
          ],
        },
        {
          id: 'purposes',
          title: '4. Purposes of processing',
          paragraphs: [
            'Personal data is processed to review mentorship requests, contact the user, and discuss the request, terms, and format of services.',
            'Form data is not used for advertising newsletters, marketing profiling, or sale to third parties.',
          ],
        },
        {
          id: 'legal-basis',
          title: '5. Legal bases',
          paragraphs: [
            'Personal data is processed on the basis of the data subject’s consent in accordance with the applicable legislation of the Russian Federation and, where applicable, to take steps at the user’s request before entering into a contract.',
          ],
        },
        {
          id: 'methods',
          title: '6. Processing methods',
          paragraphs: [
            'The user enters personal data in the form on the website.',
            'The entered information is used in the user’s browser to compose the request message text.',
            'After consent is confirmed, the website opens a personal Telegram chat with a prepared message.',
            TELEGRAM_RECEIPT_EN,
            'Telegram Bot API, server-side message delivery, and automatic transfer of the request to the operator are not used.',
            'Processing actions may include collection, recording, storage, retrieval, use, transfer to the operator via Telegram after the user independently sends the message, cessation of processing, and deletion.',
          ],
        },
        {
          id: 'retention',
          title: '7. Retention period',
          paragraphs: [
            'The operator stores personal data until the processing purposes are achieved, but for no longer than 12 months from the last interaction with the user, unless a longer retention period is required by the legislation of the Russian Federation or by performance of a contract.',
            'Requests may be retained in Telegram correspondence. The operator takes reasonable measures to periodically delete outdated requests.',
          ],
        },
        {
          id: 'recipients',
          title: '8. Recipients and service providers',
          paragraphs: [
            'The website is hosted on Timeweb Cloud infrastructure.',
            'The hosting provider may process technical data necessary for operation, security, and diagnostics of the website (for example, IP address, date and time of the request, page address, and browser and device information). Form field values are not sent to the hosting provider as part of the request submission.',
            'To submit a request, the website opens a personal Telegram chat with the operator via a t.me link with a pre-filled message text.',
            'The user independently reviews the message and presses the “Send” button.',
            TELEGRAM_RECEIPT_EN,
            'Telegram Bot API, server-side request delivery, and automatic message transfer to the operator are not used.',
            'The website loads the Manrope and Sora fonts from Google Fonts servers (fonts.googleapis.com and fonts.gstatic.com). Font loading is not used to process personal data from the form.',
          ],
        },
        {
          id: 'transfers',
          title: '9. Cross-border transfer',
          paragraphs: [
            'The website is hosted on Timeweb Cloud infrastructure in a data centre located in the Russian Federation.',
            'To receive requests, the operator uses Telegram.',
            TELEGRAM_RECEIPT_EN,
            'Because Telegram is used, such information may be processed by that service’s infrastructure in accordance with its privacy policy and terms of use.',
          ],
        },
        {
          id: 'security',
          title: '10. Data security',
          paragraphs: [
            'The operator takes reasonable organizational and technical measures to protect personal data, including limiting access to messages, using two-factor authentication for the Telegram account, and periodically deleting outdated requests.',
            'At the same time, no method of transmitting information over the Internet or method of storing data can guarantee absolute security.',
          ],
        },
        {
          id: 'rights',
          title: '11. Your rights',
          paragraphs: [
            'Subject to applicable law, you may request access, rectification, restriction or cessation of processing, withdrawal of consent, and erasure of personal data.',
            'Where applicable, you may lodge a complaint with a competent supervisory authority.',
          ],
        },
        {
          id: 'withdraw',
          title: '12. Withdrawal of consent',
          paragraphs: [
            'You may withdraw consent at any time by emailing [PRIVACY_EMAIL]. Withdrawal does not affect the lawfulness of processing performed before the withdrawal.',
          ].map((t) => fill(t, p)),
        },
        {
          id: 'contact',
          title: '13. Contact for personal data processing matters',
          paragraphs: [
            'Requests related to personal data processing may be sent to:',
            '[PRIVACY_EMAIL]',
            'It is recommended that the request briefly describe its substance.',
          ].map((t) => fill(t, p)),
        },
        {
          id: 'cookies',
          title: '14. Cookies and analytics',
          paragraphs: [
            'The website currently does not use advertising pixels or optional analytics systems (Google Analytics, Yandex Metrica, Meta Pixel, and similar services).',
            'The website may use only technical local browser storage (for example, localStorage) to save user settings.',
            'A separate cookie banner is not displayed because optional cookies and tracking tools are not used.',
          ],
        },
        {
          id: 'version',
          title: '15. Effective date and version',
          paragraphs: [
            'Effective date: [EFFECTIVE_DATE].',
            'This Policy may be updated when the form, infrastructure, or processing practices change. The current version is published on this page.',
          ].map((t) => fill(t, p)),
        },
      ],
    }
  }

  return {
    title: 'Политика конфиденциальности',
    description: 'Как обрабатываются персональные данные из заявок на менторство на этом сайте.',
    versionLabel: 'Версия документа',
    versionId: PRIVACY_POLICY_VERSION,
    effectiveLabel: 'Дата вступления в силу',
    sections: [
      {
        id: 'general',
        title: '1. Общие положения',
        paragraphs: [
          'Настоящая Политика конфиденциальности описывает, как обрабатываются персональные данные, которые пользователь передаёт через форму заявки на менторство на сайте [ДОМЕН САЙТА].',
          'Отправляя форму и давая согласие, пользователь подтверждает, что ознакомился с настоящей Политикой.',
        ].map((t) => fill(t, p)),
      },
      {
        id: 'controller',
        title: '2. Сведения об операторе',
        paragraphs: [
          'Оператор персональных данных:',
          '[ФИО САМОЗАНЯТОГО],',
          'самозанятый гражданин Российской Федерации.',
          'Местоположение:',
          '[СТРАНА И ГОРОД].',
          'Контакт по вопросам обработки персональных данных:',
          '[EMAIL ДЛЯ ОБРАЩЕНИЙ ПО ПЕРСОНАЛЬНЫМ ДАННЫМ]',
        ].map((t) => fill(t, p)),
      },
      {
        id: 'data',
        title: '3. Какие данные собираются',
        paragraphs: [
          'Из формы заявки могут обрабатываться: имя; адрес электронной почты; имя пользователя Telegram; текст обращения; дата и время отправки; язык формы; страница, с которой отправлена форма.',
          'Хостинг-провайдер может автоматически обрабатывать технические сведения, необходимые для работы, безопасности и диагностики сайта (например IP-адрес, дату и время запроса, адрес страницы, сведения о браузере и устройстве).',
          'Через форму не запрашиваются специальные категории персональных данных.',
          'Пользователю рекомендуется не указывать в тексте обращения сведения о состоянии здоровья, политических взглядах, религиозных или философских убеждениях, интимной жизни и иные специальные категории персональных данных.',
        ],
      },
      {
        id: 'purposes',
        title: '4. Цели обработки',
        paragraphs: [
          'Персональные данные обрабатываются для рассмотрения заявки на менторство, связи с пользователем, обсуждения запроса, условий и формата оказания услуг.',
          'Данные формы не используются для рекламных рассылок, маркетингового профилирования или продажи третьим лицам.',
        ],
      },
      {
        id: 'legal-basis',
        title: '5. Правовые основания',
        paragraphs: [
          'Обработка персональных данных осуществляется на основании согласия субъекта персональных данных в соответствии с применимым законодательством Российской Федерации, а также, когда это применимо, для совершения действий по запросу пользователя до заключения договора.',
        ],
      },
      {
        id: 'methods',
        title: '6. Способы обработки',
        paragraphs: [
          'Пользователь вводит персональные данные в форму на сайте.',
          'Введённые сведения используются в браузере пользователя для формирования текста заявки.',
          'После подтверждения согласия сайт открывает личный чат Telegram с заранее подготовленным сообщением.',
          TELEGRAM_RECEIPT_RU,
          'Telegram Bot API, серверная отправка сообщений и автоматическая передача заявки оператору не используются.',
          'Действия с данными могут включать сбор, запись, хранение, извлечение, использование, передачу оператору через Telegram после самостоятельной отправки сообщения пользователем, прекращение обработки и удаление.',
        ],
      },
      {
        id: 'retention',
        title: '7. Срок хранения',
        paragraphs: [
          'Оператор хранит персональные данные до достижения целей обработки, но не более 12 месяцев с момента последнего взаимодействия с пользователем, если более длительное хранение не требуется законодательством Российской Федерации либо исполнением договора.',
          'Заявки могут сохраняться в переписке Telegram. Оператор принимает разумные меры для периодического удаления устаревших заявок.',
        ],
      },
      {
        id: 'recipients',
        title: '8. Получатели и используемые сервисы',
        paragraphs: [
          'Для размещения сайта используется инфраструктура Timeweb Cloud.',
          'Хостинг-провайдер может обрабатывать технические сведения, необходимые для работы, безопасности и диагностики сайта (например IP-адрес, дату и время запроса, адрес страницы, сведения о браузере и устройстве). Значения полей формы заявки хостинг-провайдеру при отправке заявки не передаются.',
          'Для отправки заявки сайт открывает личный чат с оператором в Telegram по ссылке t.me с заранее заполненным текстом сообщения.',
          'Пользователь самостоятельно проверяет сообщение и нажимает кнопку «Отправить».',
          TELEGRAM_RECEIPT_RU,
          'Telegram Bot API, серверная отправка заявок и автоматическая передача сообщений оператору не используются.',
          'Сайт загружает шрифты Manrope и Sora с серверов Google Fonts (fonts.googleapis.com и fonts.gstatic.com). Загрузка шрифтов не используется для обработки персональных данных из формы.',
        ],
      },
      {
        id: 'transfers',
        title: '9. Трансграничная передача',
        paragraphs: [
          'Сайт размещён на инфраструктуре Timeweb Cloud в дата-центре, расположенном в Российской Федерации.',
          'Для получения заявок оператор использует Telegram.',
          TELEGRAM_RECEIPT_RU,
          'В связи с использованием Telegram такие сведения могут обрабатываться инфраструктурой этого сервиса в соответствии с его политикой конфиденциальности и условиями использования.',
        ],
      },
      {
        id: 'security',
        title: '10. Защита данных',
        paragraphs: [
          'Оператор принимает разумные организационные и технические меры для защиты персональных данных, включая ограничение доступа к сообщениям, использование двухфакторной аутентификации аккаунта Telegram и периодическое удаление устаревших заявок.',
          'При этом ни один способ передачи информации через Интернет или способ хранения данных не может гарантировать абсолютную безопасность.',
        ],
      },
      {
        id: 'rights',
        title: '11. Права пользователя',
        paragraphs: [
          'Пользователь вправе направить запрос о доступе к данным, их уточнении, прекращении обработки, отзыве согласия и удалении данных — в объёме, предусмотренном применимым законодательством.',
          'При наличии соответствующих оснований пользователь может обратиться с жалобой в уполномоченный надзорный орган.',
        ],
      },
      {
        id: 'withdraw',
        title: '12. Порядок отзыва согласия',
        paragraphs: [
          'Отозвать согласие можно в любой момент, направив сообщение на [EMAIL ДЛЯ ОБРАЩЕНИЙ ПО ПЕРСОНАЛЬНЫМ ДАННЫМ]. Отзыв не влияет на законность обработки, выполненной до отзыва.',
        ].map((t) => fill(t, p)),
      },
      {
        id: 'contact',
        title: '13. Контакт по вопросам обработки персональных данных',
        paragraphs: [
          'Запросы, связанные с обработкой персональных данных, можно направить по адресу:',
          '[EMAIL ДЛЯ ОБРАЩЕНИЙ ПО ПЕРСОНАЛЬНЫМ ДАННЫМ]',
          'В обращении рекомендуется кратко описать суть запроса.',
        ].map((t) => fill(t, p)),
      },
      {
        id: 'cookies',
        title: '14. Использование cookies и аналитики',
        paragraphs: [
          'В настоящее время сайт не использует рекламные пиксели и необязательные системы аналитики (Google Analytics, Яндекс Метрика, Meta Pixel и аналогичные сервисы).',
          'Сайт может использовать исключительно техническое локальное хранилище браузера (например localStorage) для сохранения пользовательских настроек.',
          'Отдельный cookie-баннер не отображается, поскольку необязательные cookies и средства отслеживания не используются.',
        ],
      },
      {
        id: 'version',
        title: '15. Дата вступления в силу и версия документа',
        paragraphs: [
          'Дата вступления в силу: [ДАТА ВСТУПЛЕНИЯ В СИЛУ].',
          'Политика может обновляться при изменении формы, инфраструктуры или практики обработки. Актуальная версия публикуется на этой странице.',
        ].map((t) => fill(t, p)),
      },
    ],
  }
}

export function getConsentDocument(locale: 'ru' | 'en', p: Placeholders): LegalDocument {
  if (locale === 'en') {
    return {
      title: 'Personal Data Processing Consent',
      description: 'Consent for processing personal data submitted via the mentorship request form.',
      versionLabel: 'Consent version',
      versionId: CONSENT_TEXT_ID,
      effectiveLabel: 'Effective date',
      sections: [
        {
          id: 'operator',
          title: '1. Operator',
          paragraphs: [
            'I provide this consent to Bukin Sergey Sergeyevich, who is the personal data operator and applies the special tax regime “Professional Income Tax”, for the processing of my personal data on the terms set out below.',
            'Operator location:',
            '[OPERATOR_LOCATION].',
            'Contact for personal data processing matters:',
            '[PRIVACY_EMAIL]',
          ].map((t) => fill(t, p)),
        },
        {
          id: 'data',
          title: '2. Data covered by consent',
          paragraphs: [
            'Name;',
            'email address and/or Telegram username;',
            'message text;',
            'submission details included in the message (date, time, language, page where the form was opened).',
          ],
        },
        {
          id: 'purpose',
          title: '3. Purpose',
          paragraphs: [
            'Reviewing my mentorship request, contacting me, and discussing the request, terms, and service format.',
          ],
        },
        {
          id: 'actions',
          title: '4. Processing actions',
          paragraphs: [
            'Collection,',
            'recording,',
            'storage,',
            'retrieval,',
            'use,',
            'transfer to the operator via Telegram after the user independently sends the message,',
            'cessation of processing,',
            'deletion.',
          ],
        },
        {
          id: 'methods',
          title: '5. Methods and channels',
          paragraphs: [
            'The user enters personal data in the form on the website.',
            'The entered information is used in the user’s browser to compose the request message text.',
            'After consent is confirmed, the website opens a personal Telegram chat with a prepared message.',
            TELEGRAM_RECEIPT_EN,
            'Telegram Bot API, server-side message delivery, and automatic transfer of the request to the operator are not used.',
          ],
        },
        {
          id: 'term',
          title: '6. Term of consent',
          paragraphs: [
            'This consent remains valid until the processing purposes are achieved or until it is withdrawn by the user, subject to the retention periods provided for in the Privacy Policy and the legislation of the Russian Federation.',
          ],
        },
        {
          id: 'withdraw',
          title: '7. Withdrawal',
          paragraphs: [
            'Consent may be withdrawn at any time by sending a request to:',
            '[PRIVACY_EMAIL]',
            'Withdrawal of consent does not affect the lawfulness of processing performed before the operator received the withdrawal.',
            'After receiving the withdrawal, the operator ceases processing of personal data and deletes them, unless further retention is required by the legislation of the Russian Federation or by performance of a contract.',
          ].map((t) => fill(t, p)),
        },
        {
          id: 'policy',
          title: '8. Privacy Policy',
          paragraphs: [
            'Details of processing are described in the Privacy Policy published on this website (page /en/privacy).',
            'Document version / effective date: [EFFECTIVE_DATE].',
          ].map((t) => fill(t, p)),
        },
      ],
    }
  }

  return {
    title: 'Согласие на обработку персональных данных',
    description: 'Согласие на обработку персональных данных, передаваемых через форму заявки на менторство.',
    versionLabel: 'Версия согласия',
    versionId: CONSENT_TEXT_ID,
    effectiveLabel: 'Дата вступления в силу',
    sections: [
      {
        id: 'operator',
        title: '1. Оператор',
        paragraphs: [
          'Я даю согласие Букину Сергею Сергеевичу, являющемуся оператором персональных данных и применяющему специальный налоговый режим «Налог на профессиональный доход», на обработку моих персональных данных на условиях, изложенных ниже.',
          'Местоположение оператора:',
          '[СТРАНА И ГОРОД].',
          'Контакт по вопросам обработки персональных данных:',
          '[EMAIL ДЛЯ ОБРАЩЕНИЙ ПО ПЕРСОНАЛЬНЫМ ДАННЫМ]',
        ].map((t) => fill(t, p)),
      },
      {
        id: 'data',
        title: '2. Перечень данных',
        paragraphs: [
          'Имя;',
          'адрес электронной почты и/или имя пользователя Telegram;',
          'текст сообщения;',
          'служебные сведения, включаемые в текст заявки (дата, время, язык, страница открытия формы).',
        ],
      },
      {
        id: 'purpose',
        title: '3. Цель обработки',
        paragraphs: [
          'Рассмотрение заявки на менторство, связь со мной, обсуждение запроса, условий и формата оказания услуг.',
        ],
      },
      {
        id: 'actions',
        title: '4. Перечень действий с данными',
        paragraphs: [
          'Сбор,',
          'запись,',
          'хранение,',
          'извлечение,',
          'использование,',
          'передача оператору через Telegram после самостоятельной отправки сообщения пользователем,',
          'прекращение обработки,',
          'удаление.',
        ],
      },
      {
        id: 'methods',
        title: '5. Способы обработки',
        paragraphs: [
          'Пользователь вводит персональные данные в форму на сайте.',
          'Введённые сведения используются в браузере пользователя для формирования текста заявки.',
          'После подтверждения согласия сайт открывает личный чат Telegram с заранее подготовленным сообщением.',
          TELEGRAM_RECEIPT_RU,
          'Telegram Bot API, серверная отправка сообщений и автоматическая передача заявки оператору не используются.',
        ],
      },
      {
        id: 'term',
        title: '6. Срок действия согласия',
        paragraphs: [
          'Согласие действует до достижения целей обработки либо до его отзыва пользователем с учётом сроков хранения, предусмотренных Политикой конфиденциальности и законодательством Российской Федерации.',
        ],
      },
      {
        id: 'withdraw',
        title: '7. Способ отзыва',
        paragraphs: [
          'Отозвать согласие можно в любое время, направив обращение на адрес:',
          '[EMAIL ДЛЯ ОБРАЩЕНИЙ ПО ПЕРСОНАЛЬНЫМ ДАННЫМ]',
          'Отзыв согласия не влияет на законность обработки, выполненной до момента его получения оператором.',
          'После получения отзыва оператор прекращает обработку персональных данных и удаляет их, если дальнейшее хранение не требуется законодательством Российской Федерации либо исполнением договора.',
        ].map((t) => fill(t, p)),
      },
      {
        id: 'policy',
        title: '8. Политика конфиденциальности',
        paragraphs: [
          'Подробности обработки описаны в Политике конфиденциальности, размещённой на этом сайте (страница /privacy).',
          'Версия / дата документа: [ДАТА ВСТУПЛЕНИЯ В СИЛУ].',
        ].map((t) => fill(t, p)),
      },
    ],
  }
}
