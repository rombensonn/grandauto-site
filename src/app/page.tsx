import {
  Award,
  BadgeCheck,
  Banknote,
  CalendarCheck,
  Car,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Gauge,
  MapPin,
  Phone,
  Route,
  ShieldCheck,
  Star,
  Wrench
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import {
  MotionArticle,
  MotionAside,
  MotionBlockquote,
  MotionDiv,
  MotionListItem,
  MotionSection,
  MotionStagger,
  MotionStaggerList,
  MotionStaggerUnorderedList
} from "@/components/MotionPrimitives";
import { ReviewTrustPanel } from "@/components/ReviewTrustPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { TypographyTuner } from "@/components/TypographyTuner";
import {
  faq,
  footerDocumentLinks,
  footerServiceLinks,
  footerTrustBadges,
  heroProofs,
  legalInfo,
  priceCategories,
  processSteps,
  reviews,
  riskCards,
  services,
  site,
  symptoms,
  trustCards,
  visualAssets
} from "@/content/site";
import { typograph as tx } from "@/lib/typography";

function CtaLink({
  href,
  children,
  variant = "primary"
}: Readonly<{ href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }>) {
  return (
    <a className={`button button--${variant}`} href={href}>
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <main>
      <TypographyTuner />
      <SiteHeader />

      <section id="top" className="hero">
        <div className="container hero__grid">
          <MotionDiv className="hero__content">
            <p className="eyebrow">{tx("Автосервис в Балашихе, мкр. Железнодорожный")}</p>
            <h1>{tx("Автосервис в Железнодорожном — диагностика, ТО и ремонт автомобиля")}</h1>
            <p className="hero__claim">{tx("Ремонт без лишних работ и скрытых сюрпризов")}</p>
            <p className="hero__text">
              Диагностика, ТО, подвеска, тормоза, двигатель, трансмиссия, сход-развал и ремонт выхлопной
              системы. Рейтинг 5,0 на Яндекс Картах и награда “Хорошее место 2026”.
            </p>
            <div className="hero__buttons">
              <CtaLink href="#lead-form">
                <CalendarCheck size={19} aria-hidden="true" />
                Записаться на ремонт
              </CtaLink>
              <CtaLink href={site.phoneHref} variant="secondary">
                <Phone size={19} aria-hidden="true" />
                Позвонить в сервис
              </CtaLink>
            </div>
            <div className="proof-list" aria-label="Короткие преимущества">
              {heroProofs.map((proof) => (
                <span key={proof}>
                  <BadgeCheck size={16} aria-hidden="true" />
                  {tx(proof)}
                </span>
              ))}
            </div>
          </MotionDiv>

          <MotionAside className="trust-panel" aria-label="Панель доверия в первом экране">
            <div className="trust-panel__award">
              <span className="trust-panel__award-icon">
                <Award size={28} aria-hidden="true" />
              </span>
              <span>
                <strong>{tx(site.award)}</strong>
                <small>{tx("на Яндекс Картах")}</small>
              </span>
            </div>
            <div className="trust-panel__rating">
              <span className="trust-panel__stars" aria-hidden="true">
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </span>
              <strong>{site.rating}</strong>
              <span>рейтинг по отзывам клиентов</span>
            </div>
            <div className="trust-panel__stats">
              <span>
                <strong>{site.reviewsCount}</strong>
                <small>с живыми историями про ремонт</small>
              </span>
              <span>
                <strong>{site.ratingsCount}</strong>
                <small>оценки на карточке организации</small>
              </span>
            </div>
            <div className="trust-panel__facts">
              <span>
                <MapPin size={18} aria-hidden="true" />
                {tx(site.address)}
              </span>
              <span>
                <Clock size={18} aria-hidden="true" />
                {tx(site.workTime)}
              </span>
              <span>
                <CreditCard size={18} aria-hidden="true" />
                Карта, наличные, банковский перевод
              </span>
            </div>
          </MotionAside>
        </div>
      </section>

      <MotionSection className="section section--trust" id="trust">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Доверие</p>
            <h2>Почему в “Грант Авто” возвращаются</h2>
          </div>
          <MotionStagger className="card-grid card-grid--three">
            {trustCards.map((card) => (
              <MotionArticle className="info-card" key={card.title}>
                <ShieldCheck size={22} aria-hidden="true" />
                <h3>{tx(card.title)}</h3>
                <p>{tx(card.text)}</p>
              </MotionArticle>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="section section--split" id="diagnostics">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">Симптомы</p>
            <h2>Когда стоит приехать на диагностику</h2>
            <p className="section-lead">
              Если поведение автомобиля изменилось, лучше сначала понять причину. Диагностика автомобиля в
              Балашихе помогает не менять детали наугад и не тратить лишнее.
            </p>
            <CtaLink href="#lead-form" variant="primary">
              <Wrench size={18} aria-hidden="true" />
              Опишите проблему — подскажем, с чего начать
            </CtaLink>
          </div>
          <MotionStaggerUnorderedList className="symptom-list">
            {symptoms.map((symptom) => (
              <MotionListItem key={symptom}>
                <ChevronRight size={17} aria-hidden="true" />
                {tx(symptom)}
              </MotionListItem>
            ))}
          </MotionStaggerUnorderedList>
        </div>
      </MotionSection>

      <MotionSection className="section" id="services">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Услуги</p>
            <h2>Ремонт и обслуживание автомобиля в одном месте</h2>
            <p>
              Автотехцентр в Железнодорожном принимает задачи по ТО, диагностике, подвеске, тормозам,
              двигателю, трансмиссии, сход-развалу и выхлопной системе.
            </p>
          </div>
          <MotionStagger className="service-grid">
            {services.map((service) => (
              <MotionArticle className="service-card" key={service.title}>
                <div className="service-card__top">
                  <Car size={22} aria-hidden="true" />
                  <h3>{tx(service.title)}</h3>
                </div>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{tx(item)}</li>
                  ))}
                </ul>
              </MotionArticle>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="section section--prices" id="prices">
        <div className="container">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow">Цены</p>
              <h2>Популярные услуги и цены</h2>
              <p>Все цены указаны с приставкой «от». Итоговая стоимость зависит от автомобиля и объёма работ.</p>
            </div>
            <CtaLink href="#lead-form" variant="secondary">
              <Gauge size={18} aria-hidden="true" />
              Уточнить стоимость ремонта
            </CtaLink>
          </div>
          <MotionStagger className="price-category-grid" aria-label="Категории цен">
            {priceCategories.map((category) => (
              <MotionArticle className="price-category-card" key={category.title}>
                <div className="price-category-card__top">
                  <span>{tx(category.title)}</span>
                  <small>{category.items.length} услуг</small>
                </div>
                <p>{tx(category.note)}</p>
                <ul>
                  {category.items.map(([name, price]) => (
                    <li key={name}>
                      <span>{tx(name)}</span>
                      <strong>{price}</strong>
                    </li>
                  ))}
                </ul>
              </MotionArticle>
            ))}
          </MotionStagger>
          <p className="after-table">Не нашли нужную работу? Позвоните или оставьте заявку — подскажем по вашему автомобилю.</p>
        </div>
      </MotionSection>

      <MotionSection className="section" id="reviews">
        <div className="container reviews-grid">
          <div>
            <p className="eyebrow">Отзывы</p>
            <h2>Клиенты отмечают скорость, честность и качество работы</h2>
            <ReviewTrustPanel rating={site.rating} reviewsCount={site.reviewsCount} ratingsCount={site.ratingsCount} award={site.award} />
          </div>
          <MotionStagger className="review-list">
            {reviews.map((review) => (
              <MotionBlockquote key={review}>“{tx(review)}”</MotionBlockquote>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="visual-strip" aria-label="Атмосфера автосервиса">
        {visualAssets.map((asset) => (
          <div
            aria-label={asset.label}
            className="visual-strip__item"
            key={asset.label}
            role="img"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(8,10,12,.1), rgba(8,10,12,.72)), url(${asset.url})` }}
          >
            <span>{tx(asset.label)}</span>
          </div>
        ))}
      </MotionSection>

      <MotionSection className="section section--process" id="process">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Процесс</p>
            <h2>Как проходит ремонт</h2>
          </div>
          <MotionStaggerList className="process-list">
            {processSteps.map(([title, text], index) => (
              <MotionListItem key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{tx(title)}</h3>
                <p>{tx(text)}</p>
              </MotionListItem>
            ))}
          </MotionStaggerList>
        </div>
      </MotionSection>

      <MotionSection className="section" id="risks">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Не затягивать</p>
            <h2>Мелкая неисправность часто превращается в дорогой ремонт</h2>
            <p>
              Стук в подвеске, ошибка двигателя, износ тормозов или рывки коробки не проходят сами. Чем раньше
              провести диагностику, тем выше шанс решить проблему дешевле и быстрее.
            </p>
          </div>
          <MotionStagger className="card-grid card-grid--three">
            {riskCards.map(([title, text]) => (
              <MotionArticle className="info-card info-card--accent" key={title}>
                <h3>{tx(title)}</h3>
                <p>{tx(text)}</p>
              </MotionArticle>
            ))}
          </MotionStagger>
          <div className="center-cta">
            <CtaLink href="#lead-form">
              <CalendarCheck size={18} aria-hidden="true" />
              Записаться на диагностику
            </CtaLink>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section urgent-band">
        <div className="container urgent-band__inner">
          <div>
            <p className="eyebrow">Ближайшее окно</p>
            <h2>Нужно сделать быстро? Запишитесь на ближайшее время</h2>
            <p>
              Замена масла, фильтров, колодок, диагностика, подвеска и тормозная система — частые работы, с
              которыми в “Грант Авто” обращаются срочно. Позвоните, и мы подскажем ближайшее окно.
            </p>
          </div>
          <div className="urgent-band__actions">
            <CtaLink href={site.phoneHref} variant="secondary">
              <Phone size={18} aria-hidden="true" />
              Позвонить
            </CtaLink>
            <CtaLink href="#lead-form">
              <CalendarCheck size={18} aria-hidden="true" />
              Оставить заявку
            </CtaLink>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section" id="contacts">
        <div className="container contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Контакты</p>
            <h2>Грант Авто — автосервис в Балашихе, мкр. Железнодорожный</h2>
            <dl className="contact-list">
              <div>
                <dt>Адрес</dt>
                <dd>{tx(site.address)}</dd>
              </div>
              <div>
                <dt>Телефон</dt>
                <dd>
                  <a href={site.phoneHref}>{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Оплата</dt>
                <dd>карта, наличные, банковский перевод</dd>
              </div>
              <div>
                <dt>Удобства</dt>
                <dd>есть парковка, туалет, можно с собакой</dd>
              </div>
              <div>
                <dt>Запись</dt>
                <dd>{tx(`работа по предварительной записи, ${site.workTime.toLowerCase()}`)}</dd>
              </div>
            </dl>
            <div className="contact-actions">
              <CtaLink href={site.routeUrl} variant="secondary">
                <Route size={18} aria-hidden="true" />
                Построить маршрут
              </CtaLink>
              <CtaLink href={site.phoneHref} variant="ghost">
                <Phone size={18} aria-hidden="true" />
                Позвонить
              </CtaLink>
              <CtaLink href="#lead-form">
                <CalendarCheck size={18} aria-hidden="true" />
                Записаться онлайн
              </CtaLink>
            </div>
          </div>
          <div className="map-card map-placeholder" role="img" aria-label="Блок карты проезда к Грант Авто">
            <div className="map-placeholder__pin">
              <MapPin size={24} aria-hidden="true" />
              <strong>{tx(site.name)}</strong>
              <span>{tx(site.address)}</span>
            </div>
            <a className="button button--primary" href={site.routeUrl}>
              <Route size={18} aria-hidden="true" />
              Построить маршрут
            </a>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section section--form" id="lead">
        <div className="container form-section-grid">
          <div>
            <p className="eyebrow">Запись</p>
            <h2>Расскажите, что происходит с автомобилем</h2>
            <p className="section-lead">
              Подойдет короткое описание: марка, модель, симптомы и удобное время. Мастер свяжется, уточнит
              детали и подскажет, с чего начать.
            </p>
            <div className="mini-proof">
              <span>
                <Banknote size={18} aria-hidden="true" />
                Цены от 300 ₽
              </span>
              <span>
                <Star size={18} aria-hidden="true" />
                Рейтинг 5,0
              </span>
              <span>
                <Award size={18} aria-hidden="true" />
                {tx(site.award)}
              </span>
            </div>
          </div>
          <LeadForm />
        </div>
      </MotionSection>

      <MotionSection className="section" id="faq">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Частые вопросы</h2>
          </div>
          <MotionStagger className="faq-list">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{tx(question)}</summary>
                <p>{tx(answer)}</p>
              </details>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <footer className="footer" aria-label="Футер сайта">
        <div className="footer-cta">
          <div className="container footer-cta__inner">
            <div>
              <p className="eyebrow">Нужна подсказка мастера</p>
              <h2>Не уверены, что именно сломалось?</h2>
              <p>Опишите проблему — подскажем, с чего начать, и подберём удобное время для диагностики.</p>
            </div>
            <div className="footer-cta__actions">
              <CtaLink href="#lead-form">
                <CalendarCheck size={18} aria-hidden="true" />
                Записаться
              </CtaLink>
              <CtaLink href={site.phoneHref} variant="secondary">
                <Phone size={18} aria-hidden="true" />
                Позвонить
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="container footer__main">
          <div className="footer-grid" aria-label="Основная информация в футере">
            <section className="footer-column footer-column--brand">
              <h2>Грант Авто</h2>
              <p>
                Автосервис в Балашихе, мкр. Железнодорожный: диагностика, ТО, подвеска, тормоза, двигатель,
                трансмиссия, сход-развал и ремонт выхлопной системы.
              </p>
              <div className="footer-badges" aria-label="Доказательства доверия">
                {footerTrustBadges.map((badge) => (
                  <span className={badge.includes("Хорошее") || badge.includes("5,0") ? "footer-badge footer-badge--gold" : "footer-badge"} key={badge}>
                    <Star size={15} aria-hidden="true" />
                  {tx(badge)}
                  </span>
                ))}
              </div>
            </section>

            <section className="footer-column">
              <h2>Контакты и запись</h2>
              <a className="footer-phone" href={site.phoneHref}>
                <Phone size={20} aria-hidden="true" />
                {site.phone}
              </a>
              <div className="footer-actions">
                <CtaLink href={site.phoneHref} variant="secondary">
                  <Phone size={17} aria-hidden="true" />
                  Позвонить
                </CtaLink>
                <CtaLink href="#lead-form">
                  <CalendarCheck size={17} aria-hidden="true" />
                  Записаться на ремонт
                </CtaLink>
              </div>
              <p className="footer-note">Предварительная запись — чтобы принять автомобиль без ожидания.</p>
            </section>

            <section className="footer-column">
              <h2>Адрес и режим</h2>
              <ul className="footer-icon-list">
                <li>
                  <MapPin size={18} aria-hidden="true" />
                  <span>{tx(site.address)}</span>
                </li>
                <li>
                  <Clock size={18} aria-hidden="true" />
                  <span>Работаем с 9:00</span>
                </li>
                <li>
                  <CreditCard size={18} aria-hidden="true" />
                  <span>Карта, наличные, банковский перевод</span>
                </li>
              </ul>
              <div className="footer-actions">
                <CtaLink href={site.routeUrl} variant="secondary">
                  <Route size={17} aria-hidden="true" />
                  Построить маршрут
                </CtaLink>
                <a className="footer-link-button" href={site.routeUrl}>
                  <MapPin size={17} aria-hidden="true" />
                  Открыть на карте
                </a>
              </div>
            </section>

            <section className="footer-column">
              <h2>Документы и информация</h2>
              <nav aria-label="Документы сайта">
                <ul className="footer-link-list">
                  {footerDocumentLinks.map(([label, href]) => (
                    <li key={href}>
                      <a href={href}>
                        <FileText size={16} aria-hidden="true" />
                        {tx(label)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          </div>

          <div className="footer-mobile-accordion" aria-label="Мобильная информация футера">
            <details>
              <summary>Контакты</summary>
              <a className="footer-phone" href={site.phoneHref}>{site.phone}</a>
              <p className="footer-note">Предварительная запись — чтобы принять автомобиль без ожидания.</p>
            </details>
            <details>
              <summary>Адрес</summary>
              <p>{tx(site.address)}</p>
              <p>Работаем с 9:00</p>
              <a href={site.routeUrl}>Построить маршрут</a>
            </details>
            <details>
              <summary>Услуги</summary>
              <ul className="footer-link-list">
                {footerServiceLinks.map(([label, href]) => (
                  <li key={href}>
                    <a href={href}>{tx(label)}</a>
                  </li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Документы</summary>
              <ul className="footer-link-list">
                {footerDocumentLinks.map(([label, href]) => (
                  <li key={href}>
                    <a href={href}>{tx(label)}</a>
                  </li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Реквизиты</summary>
              <dl className="footer-legal-list">
                <div>
                  <dt>Исполнитель</dt>
                  <dd>{tx(`Исполнитель: ${legalInfo.executor}`)}</dd>
                </div>
                <div>
                  <dt>ИНН</dt>
                  <dd>ИНН: {legalInfo.inn}</dd>
                </div>
                <div>
                  <dt>ОГРН/ОГРНИП</dt>
                  <dd>ОГРН/ОГРНИП: {legalInfo.ogrn}</dd>
                </div>
                <div>
                  <dt>Фактический адрес</dt>
                  <dd>{tx(`Фактический адрес оказания услуг: ${legalInfo.actualAddress}`)}</dd>
                </div>
              </dl>
            </details>
          </div>

          <section className="footer-legal" aria-label="Юридическая информация">
            <div className="footer-legal__heading">
              <FileText size={20} aria-hidden="true" />
              <h2>Юридическая информация</h2>
            </div>
            <dl className="footer-legal-list">
              <div>
                <dt>Исполнитель</dt>
                <dd>{tx(`Исполнитель: ${legalInfo.executor}`)}</dd>
              </div>
              <div>
                <dt>ИНН</dt>
                <dd>ИНН: {legalInfo.inn}</dd>
              </div>
              <div>
                <dt>ОГРН/ОГРНИП</dt>
                <dd>ОГРН/ОГРНИП: {legalInfo.ogrn}</dd>
              </div>
              <div>
                <dt>Юридический адрес / адрес регистрации</dt>
                <dd>{tx(`Юридический адрес / адрес регистрации: ${legalInfo.legalAddress}`)}</dd>
              </div>
              <div>
                <dt>Фактический адрес</dt>
                <dd>{tx(`Фактический адрес оказания услуг: ${legalInfo.actualAddress}`)}</dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>{tx(`E-mail для обращений: ${legalInfo.email}`)}</dd>
              </div>
              <div>
                <dt>Способы оплаты</dt>
                <dd>{tx(`Способы оплаты: ${legalInfo.paymentMethods}`)}</dd>
              </div>
            </dl>
          </section>

          <div className="footer-bottom">
            <p>© 2026 Грант Авто. Все права защищены</p>
            <div className="footer-bottom__links">
              {footerDocumentLinks.slice(0, 3).map(([label, href]) => (
                <a href={href} key={href}>{tx(label)}</a>
              ))}
            </div>
            <p className="footer-disclaimer">
              Информация на сайте не является публичной офертой, окончательная стоимость зависит от марки автомобиля,
              состояния узла и объёма работ.
            </p>
          </div>
        </div>
      </footer>

      <a className="sticky-cta" href="#lead-form" aria-label="Быстрая запись">
        <CalendarCheck size={20} aria-hidden="true" />
        Записаться
      </a>

      <div className="mobile-actions" aria-label="Мобильные быстрые действия">
        <a href={site.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Позвонить
        </a>
        <a href="#lead-form">
          <CalendarCheck size={18} aria-hidden="true" />
          Записаться
        </a>
      </div>
    </main>
  );
}
