import React from 'react';

export type LegalContent = {
  title: string;
  body: React.ReactNode;
};

export type LegalTranslationMap = {
  privacy: LegalContent;
  terms: LegalContent;
};

export const legalTranslations: Record<string, LegalTranslationMap> = {
  ja: {
    privacy: {
      title: "プライバシーポリシー",
      body: (
        <>
          <p>「believe」はお客様のプライバシーと静かな時間を何よりも大切にしています。</p>
          <h3>1. データの保存について</h3>
          <p>あなたが設定した「想う相手の名前」や「写真」は、すべてお使いのデバイス（ブラウザのローカルストレージ）内にのみ保存されます。これらの個人的なデータが外部のサーバーに送信されることは一切ありません。</p>
          <h3>2. 匿名の統計データの扱い</h3>
          <p>世界中の人々がどれだけの時間を「想う」ことに費やしたかを表現するため、あなたが想った「時間」の長さ（秒数）のみを匿名データとして送信・集計しています。このデータから個人を特定することは不可能です。</p>
          <h3>3. 第三者への情報提供</h3>
          <p>法令に基づく場合を除き、お預かりした情報（匿名の時間データを含む）を第三者に提供・販売することは決してありません。</p>
          <h3>4. お問い合わせ</h3>
          <p>プライバシーに関するご質問がある場合は、サポート窓口までご連絡ください。</p>
        </>
      )
    },
    terms: {
      title: "利用規約",
      body: (
        <>
          <p>この利用規約は、「believe」（以下「本アプリ」）の利用条件を定めるものです。</p>
          <h3>1. サービスの目的</h3>
          <p>本アプリは、大切な誰かを「想う」ためのパーソナルで穏やかな儀式をサポートする目的で作成されました。この目的に反する用途、または他人を傷つける目的での利用を固く禁じます。</p>
          <h3>2. 免責事項</h3>
          <p>本アプリは現状有姿で提供されます。本アプリの利用によって生じたいかなるトラブルや損害についても、開発者は一切の責任を負いかねますので、ご自身の責任においてご利用ください。</p>
          <h3>3. 知的財産権</h3>
          <p>本アプリに関するデザイン、テキスト、画像、プログラム等のすべての権利は、開発者に帰属します。許可なく複製・転載等を行うことを禁じます。</p>
          <h3>4. 規約の変更</h3>
          <p>開発者は、必要と判断した場合には、ユーザーに事前通知することなく本規約を変更することができるものとします。</p>
        </>
      )
    }
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p>"believe" values your privacy and quiet time above all else.</p>
          <h3>1. Data Storage</h3>
          <p>The "Name" and "Photo" of the person you think of are saved exclusively on your device (browser's local storage). This deeply personal data is never transmitted to external servers.</p>
          <h3>2. Anonymous Statistics</h3>
          <p>To visualize how much time people worldwide spend "thinking," we only transmit and aggregate the total duration (in seconds) of your thoughts as anonymous data. It is impossible to identify any individual from this data.</p>
          <h3>3. Third-Party Sharing</h3>
          <p>Except as required by law, we will never provide or sell your information (including anonymous time data) to third parties.</p>
          <h3>4. Contact Us</h3>
          <p>If you have questions regarding privacy, please contact support.</p>
        </>
      )
    },
    terms: {
      title: "Terms of Use",
      body: (
        <>
          <p>These Terms of Use govern the conditions for using "believe" (hereafter "the App").</p>
          <h3>1. Purpose of Service</h3>
          <p>The App was created to support a personal, peaceful ritual of "thinking" about someone important. Any use contrary to this purpose or intended to harm others is strictly prohibited.</p>
          <h3>2. Disclaimer</h3>
          <p>The App is provided "as is". The developers assume no liability for any trouble or damages arising from the use of the App. Please use it at your own risk.</p>
          <h3>3. Intellectual Property</h3>
          <p>All rights related to the design, text, images, and programming of the App belong to the developers. Unauthorized reproduction or redistribution is prohibited.</p>
          <h3>4. Changes to Terms</h3>
          <p>The developers reserve the right to modify these terms without prior notice when deemed necessary.</p>
        </>
      )
    }
  },
  es: {
    privacy: {
      title: "Política de Privacidad",
      body: (
        <>
          <p>"believe" valora su privacidad y su tranquilidad por sobre todas las cosas.</p>
          <h3>1. Almacenamiento de Datos</h3>
          <p>El "Nombre" y la "Foto" de la persona en la que piensa se guardan exclusivamente en su dispositivo. Esta información no se transmite a servidores externos.</p>
          <h3>2. Estadísticas Anónimas</h3>
          <p>Para visualizar globalmente el tiempo que la gente pasa "pensando", solo transmitimos la duración (en segundos) como datos anónimos. Es imposible identificarle a partir de estos datos.</p>
          <h3>3. Compartir con Terceros</h3>
          <p>Salvo que la ley lo exija, nunca proporcionaremos ni venderemos su información a terceros.</p>
          <h3>4. Contacto</h3>
          <p>Si tiene preguntas sobre privacidad, contáctenos.</p>
        </>
      )
    },
    terms: {
      title: "Términos de Uso",
      body: (
        <>
          <p>Estos Términos de Uso establecen las condiciones de la aplicación "believe".</p>
          <h3>1. Propósito</h3>
          <p>Esta aplicación fue creada para apoyar un ritual pacífico de "pensar" en alguien importante. Está prohibido el uso con el fin de dañar a otros.</p>
          <h3>2. Descargo de Responsabilidad</h3>
          <p>La aplicación se proporciona "tal cual". No asumimos responsabilidad por daños derivados de su uso.</p>
          <h3>3. Propiedad Intelectual</h3>
          <p>Todos los derechos sobre el diseño y el código de la aplicación nos pertenecen. Se prohíbe su reproducción.</p>
          <h3>4. Cambios</h3>
          <p>Nos reservamos el derecho a modificar estos términos sin previo aviso.</p>
        </>
      )
    }
  },
  fr: {
    privacy: {
      title: "Politique de Confidentialité",
      body: (
        <>
          <p>"believe" valorise votre vie privée avant tout.</p>
          <h3>1. Stockage des Données</h3>
          <p>Le "Nom" et la "Photo" de la personne sont enregistrés uniquement sur votre appareil. Elles ne sont jamais transmises à des serveurs externes.</p>
          <h3>2. Statistiques Anonymes</h3>
          <p>Nous ne collectons que la durée de vos pensées (en secondes) sous forme anonyme pour afficher des statistiques mondiales.</p>
          <h3>3. Tiers</h3>
          <p>Nous ne vendrons ni ne partagerons jamais vos données avec des tiers, sauf obligation légale.</p>
          <h3>4. Contact</h3>
          <p>En cas de questions, veuillez contacter notre support.</p>
        </>
      )
    },
    terms: {
      title: "Conditions d'Utilisation",
      body: (
        <>
          <p>Ces conditions régissent l'utilisation de l'application "believe".</p>
          <h3>1. Objectif du Service</h3>
          <p>L'application a été créée pour soutenir un rituel paisible. Toute utilisation visant à nuire à autrui est strictement interdite.</p>
          <h3>2. Avis de non-responsabilité</h3>
          <p>Fournie "telle quelle". Les développeurs déclinent toute responsabilité pour tout dommage.</p>
          <h3>3. Propriété Intellectuelle</h3>
          <p>Tous les droits de conception et de code nous appartiennent.</p>
          <h3>4. Modifications</h3>
          <p>Nous pouvons modifier ces conditions sans préavis.</p>
        </>
      )
    }
  },
  de: {
    privacy: {
      title: "Datenschutzerklärung",
      body: (
        <>
          <p>"believe" schätzt Ihre Privatsphäre.</p>
          <h3>1. Datenspeicherung</h3>
          <p>Name und Foto der Person werden nur lokal auf Ihrem Gerät gespeichert und niemals an Server gesendet.</p>
          <h3>2. Anonyme Statistiken</h3>
          <p>Wir aggregieren lediglich die Dauer (Sekunden) anonym, um globale Gedankenzeiten darzustellen.</p>
          <h3>3. Dritte</h3>
          <p>Ihre Daten werden ohne gesetzliche Pflicht niemals an Dritte verkauft.</p>
          <h3>4. Kontakt</h3>
          <p>Bei Fragen kontaktieren Sie unseren Support.</p>
        </>
      )
    },
    terms: {
      title: "Nutzungsbedingungen",
      body: (
        <>
          <p>Diese Bedingungen regeln die Nutzung der App "believe".</p>
          <h3>1. Zweck</h3>
          <p>Die App unterstützt das friedliche Ritual, an eine Person zu denken. Missbrauch ist untersagt.</p>
          <h3>2. Haftungsausschluss</h3>
          <p>Bereitstellung "wie besehen". Wir haften nicht für Schäden.</p>
          <h3>3. Geistiges Eigentum</h3>
          <p>Design und Code sind unser Eigentum.</p>
          <h3>4. Änderungen</h3>
          <p>Änderungen der Bedingungen bleiben vorbehalten.</p>
        </>
      )
    }
  },
  zh: {
    privacy: {
      title: "隐私政策",
      body: (
        <>
          <p>“believe”最看重您的隐私和安宁的时光。</p>
          <h3>1. 数据存储</h3>
          <p>您设置的“思念对象的姓名”和“照片”仅保存在您的设备本地。此类个人数据绝不会发送到外部服务器。</p>
          <h3>2. 匿名统计</h3>
          <p>为了展示全球人们“思念”的时间，我们仅收集并汇总时间的长度（秒）作为匿名数据。无法通过这些数据识别个人。</p>
          <h3>3. 第三方提供</h3>
          <p>除非法律要求，否则我们绝不会向第三方出售或提供您的数据。</p>
          <h3>4. 联系方式</h3>
          <p>如有隐私相关问题，请联系我们。</p>
        </>
      )
    },
    terms: {
      title: "使用条款",
      body: (
        <>
          <p>本使用条款规定了“believe”的使用条件。</p>
          <h3>1. 服务目的</h3>
          <p>本应用程序旨在为“思念”重要之人提供一个平静的仪式支持。严禁用于恶意目的。</p>
          <h3>2. 免责声明</h3>
          <p>本应用按“现状”提供，开发者对因使用造成的损害概不负责。</p>
          <h3>3. 知识产权</h3>
          <p>有关本应用程序的所有权利归开发者所有。禁止未经授权的复制。</p>
          <h3>4. 条款修改</h3>
          <p>开发者有权在不事先通知的情况下修改本条款。</p>
        </>
      )
    }
  },
  ko: {
    privacy: {
      title: "개인정보 처리방침",
      body: (
        <>
          <p>'believe'는 귀하의 프라이버시를 가장 소중히 여깁니다.</p>
          <h3>1. 데이터 저장</h3>
          <p>입력하신 '이름'과 '사진'은 모두 기기 내부에만 저장됩니다. 외부에 전송되지 않습니다.</p>
          <h3>2. 익명 통계</h3>
          <p>전 세계의 생각하는 시간을 표시하기 위해 길이(초)만을 익명화하여 집계합니다.</p>
          <h3>3. 제3자 제공</h3>
          <p>법적 요구가 없는 한 데이터를 제3자에게 판매하거나 제공하지 않습니다.</p>
          <h3>4. 문의</h3>
          <p>질문이 있으시면 지원팀에 문의해 주세요.</p>
        </>
      )
    },
    terms: {
      title: "이용약관",
      body: (
        <>
          <p>본 약관은 'believe'의 이용조건을 정합니다.</p>
          <h3>1. 서비스 목적</h3>
          <p>소중한 사람을 조용히 '생각'하기 위한 앱입니다. 악의적인 사용을 금합니다.</p>
          <h3>2. 면책조항</h3>
          <p>앱 사용으로 인한 손해에 대해 개발자는 책임지지 않습니다.</p>
          <h3>3. 지적재산권</h3>
          <p>앱의 모든 권리는 개발자에게 있습니다.</p>
          <h3>4. 약관 변경</h3>
          <p>사전 통지 없이 약관이 변경될 수 있습니다.</p>
        </>
      )
    }
  },
  it: {
    privacy: {
      title: "Informativa sulla Privacy",
      body: (
        <>
          <p>"believe" tiene molto alla tua privacy.</p>
          <h3>1. Archiviazione dei dati</h3>
          <p>Il "Nome" e la "Foto" sono salvati solo sul tuo dispositivo e mai su server esterni.</p>
          <h3>2. Statistiche Anonime</h3>
          <p>Raccogliamo solo la durata in secondi, in forma anonima.</p>
          <h3>3. Terze Parti</h3>
          <p>Non vendiamo i tuoi dati a terzi.</p>
          <h3>4. Contatti</h3>
          <p>Contattaci per qualsiasi domanda.</p>
        </>
      )
    },
    terms: {
      title: "Termini e Condizioni",
      body: (
        <>
          <p>Questi termini regolano l'uso di "believe".</p>
          <h3>1. Scopo</h3>
          <p>Supportare un rituale sereno per "pensare" a qualcuno. Vietato l'uso improprio.</p>
          <h3>2. Disclaimer</h3>
          <p>Non ci assumiamo alcuna responsabilità per i danni.</p>
          <h3>3. Proprietà Intellettuale</h3>
          <p>Tutti i diritti sono riservati ai creatori.</p>
          <h3>4. Modifiche</h3>
          <p>I termini possono variare senza preavviso.</p>
        </>
      )
    }
  },
  pt: {
    privacy: {
      title: "Política de Privacidade",
      body: (
        <>
          <p>"believe" valoriza muito sua privacidade.</p>
          <h3>1. Armazenamento</h3>
          <p>Nome e Foto são salvos apenas no dispositivo.</p>
          <h3>2. Estatísticas</h3>
          <p>Apenas a duração dos pensamentos (em segundos) é enviada anonimamente.</p>
          <h3>3. Terceiros</h3>
          <p>Nunca venderemos seus dados.</p>
          <h3>4. Contato</h3>
          <p>Se tiver dúvidas, entre em contato.</p>
        </>
      )
    },
    terms: {
      title: "Termos de Uso",
      body: (
        <>
          <p>Condições para o uso do "believe".</p>
          <h3>1. Propósito</h3>
          <p>Para um ritual tranquilo. O uso indevido é proibido.</p>
          <h3>2. Isenção</h3>
          <p>O uso é por sua conta e risco. Sem garantias.</p>
          <h3>3. Direitos</h3>
          <p>Todos os direitos de design reservados.</p>
          <h3>4. Alterações</h3>
          <p>Os termos podem mudar a qualquer momento.</p>
        </>
      )
    }
  },
  ru: {
    privacy: {
      title: "Политика конфиденциальности",
      body: (
        <>
          <p>"believe" ценит вашу конфиденциальность.</p>
          <h3>1. Хранение данных</h3>
          <p>Данные сохраняются только на устройстве.</p>
          <h3>2. Анонимная статистика</h3>
          <p>Сбор только анонимной продолжительности в секундах.</p>
          <h3>3. Третьи лица</h3>
          <p>Мы не передаем данные третьим лицам.</p>
          <h3>4. Контакты</h3>
          <p>Свяжитесь с нами при наличии вопросов.</p>
        </>
      )
    },
    terms: {
      title: "Условия использования",
      body: (
        <>
          <p>Условия использования "believe".</p>
          <h3>1. Цель</h3>
          <p>Приложение для спокойного ритуала.</p>
          <h3>2. Отказ от ответственности</h3>
          <p>Используйте на свой страх и риск.</p>
          <h3>3. Права</h3>
          <p>Все права защищены.</p>
          <h3>4. Изменения</h3>
          <p>Условия могут быть изменены.</p>
        </>
      )
    }
  },
  hi: {
    privacy: {
      title: "गोपनीयता नीति",
      body: (
        <>
          <p>"believe" आपकी गोपनीयता का सम्मान करता है।</p>
          <h3>1. डेटा संग्रहण</h3>
          <p>डेटा केवल आपके डिवाइस पर सहेजा जाता है।</p>
          <h3>2. बेनामी आँकड़े</h3>
          <p>हम केवल बेनामी अवधि का डेटा एकत्र करते हैं।</p>
          <h3>3. तीसरे पक्ष</h3>
          <p>हम आपका डेटा नहीं बेचते हैं।</p>
          <h3>4. संपर्क</h3>
          <p>प्रश्नों के लिए हमसे संपर्क करें।</p>
        </>
      )
    },
    terms: {
      title: "उपयोग की शर्तें",
      body: (
        <>
          <p>"believe" के लिए उपयोग की शर्तें।</p>
          <h3>1. उद्देश्य</h3>
          <p>शांत और व्यक्तिगत अनुष्ठान के लिए।</p>
          <h3>2. अस्वीकरण</h3>
          <p>अपने जोखिम पर उपयोग करें।</p>
          <h3>3. अधिकार</h3>
          <p>सर्वाधिकार सुरक्षित।</p>
          <h3>4. परिवर्तन</h3>
          <p>शर्तें बदल सकती हैं।</p>
        </>
      )
    }
  },
  ar: {
    privacy: {
      title: "سياسة الخصوصية",
      body: (
        <>
          <p>"believe" تقدر خصوصيتك.</p>
          <h3>1. تخزين البيانات</h3>
          <p>تُحفظ البيانات على جهازك فقط.</p>
          <h3>2. إحصائيات مجهولة</h3>
          <p>نجمع فقط مدة الأفكار (بالثواني) كمجهول.</p>
          <h3>3. الأطراف الثالثة</h3>
          <p>لا نشارك بياناتك مع أطراف ثالثة.</p>
          <h3>4. اتصال</h3>
          <p>لأي أسئلة، يرجى الاتصال بنا.</p>
        </>
      )
    },
    terms: {
      title: "شروط الاستخدام",
      body: (
        <>
          <p>شروط استخدام "believe".</p>
          <h3>1. الغرض</h3>
          <p>طقوس هادئة للصمت والتفكير.</p>
          <h3>2. إخلاء مسؤولية</h3>
          <p>الاستخدام على مسؤوليتك الخاصة.</p>
          <h3>3. الحقوق</h3>
          <p>جميع حقوق التصميم محفوظة.</p>
          <h3>4. تغييرات</h3>
          <p>السياسات قابلة للتغيير دون إشعار.</p>
        </>
      )
    }
  }
};

export const useLegalTranslations = () => {
  const fullCode = navigator.language;
  const shortCode = fullCode.split('-')[0].toLowerCase();
  
  if (fullCode in legalTranslations) {
    return legalTranslations[fullCode];
  }
  if (shortCode in legalTranslations) {
    return legalTranslations[shortCode];
  }
  return legalTranslations.en;
};
