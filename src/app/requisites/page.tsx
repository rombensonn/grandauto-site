import Link from "next/link";
import { legalInfo, site } from "@/content/site";

export const metadata = {
  title: "Реквизиты исполнителя | Грант Авто",
  description: "Реквизиты исполнителя услуг автосервиса Грант Авто."
};

export default function RequisitesPage() {
  return (
    <main className="legal-page">
      <div className="container legal-page__inner">
        <Link className="legal-page__back" href="/">
          Вернуться на сайт
        </Link>
        <p className="eyebrow">Юридическая информация</p>
        <h1>Реквизиты исполнителя</h1>
        <dl className="legal-details">
          <div>
            <dt>Исполнитель</dt>
            <dd>Исполнитель: {legalInfo.executor}</dd>
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
            <dd>Юридический адрес / адрес регистрации: {legalInfo.legalAddress}</dd>
          </div>
          <div>
            <dt>Фактический адрес оказания услуг</dt>
            <dd>Фактический адрес оказания услуг: {legalInfo.actualAddress}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>E-mail для обращений: {legalInfo.email}</dd>
          </div>
          <div>
            <dt>Способы оплаты</dt>
            <dd>Способы оплаты: {legalInfo.paymentMethods}</dd>
          </div>
        </dl>
        <p>
          Актуальные сведения можно уточнить по телефону <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    </main>
  );
}
