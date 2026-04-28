"use client";

import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

const navItems = [
  ["Услуги", "#services"],
  ["Цены", "#prices"],
  ["Отзывы", "#reviews"],
  ["Как работаем", "#process"],
  ["Контакты", "#contacts"]
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Грант Авто, вверх страницы" onClick={closeMenu}>
        <span className="brand__mark">GA</span>
        <span>
          <strong>{site.name}</strong>
          <small>{site.locationShort}</small>
        </span>
      </a>

      <nav className="topbar__nav" aria-label="Основная навигация">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="topbar__actions">
        <a className="topbar__phone" href={site.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          <span className="topbar__phone-text">{site.phone}</span>
        </a>
        <a className="button button--primary button--small" href="#lead-form">
          <CalendarCheck size={17} aria-hidden="true" />
          Записаться
        </a>
        <button
          className="topbar__menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>

      <div className={isOpen ? "topbar__mobile-nav topbar__mobile-nav--open" : "topbar__mobile-nav"} id="mobile-nav">
        <nav aria-label="Мобильная навигация">
          {navItems.map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
