import Link from "next/link";
import { footerDocumentLinks, footerServiceLinks } from "@/content/site";

export const metadata = {
  title: "Карта сайта | Грант Авто",
  description: "Карта сайта автосервиса Грант Авто."
};

export default function SitemapPage() {
  return (
    <main className="legal-page">
      <div className="container legal-page__inner">
        <Link className="legal-page__back" href="/">
          Вернуться на сайт
        </Link>
        <p className="eyebrow">Навигация</p>
        <h1>Карта сайта</h1>
        <section>
          <h2>Разделы лендинга</h2>
          <ul className="legal-link-list">
            {footerServiceLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Документы</h2>
          <ul className="legal-link-list">
            {footerDocumentLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
