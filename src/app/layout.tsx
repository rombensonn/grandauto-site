import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import { site, visualAssets } from "@/content/site";

const headingFont = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Грант Авто — автосервис в Балашихе, мкр. Железнодорожный | Диагностика, ТО и ремонт авто",
  description:
    "Автосервис “Грант Авто” в Балашихе, микрорайон Железнодорожный. Диагностика, ТО, подвеска, тормоза, двигатель, трансмиссия, сход-развал. Рейтинг 5,0 на Яндекс Картах. Запись по телефону 8 (800) 505-65-67.",
  keywords: [
    "автосервис Балашиха",
    "автосервис Железнодорожный",
    "ремонт авто Балашиха",
    "ремонт авто Железнодорожный",
    "автотехцентр Железнодорожный",
    "диагностика автомобиля Балашиха",
    "компьютерная диагностика авто Железнодорожный",
    "ремонт подвески Балашиха",
    "замена тормозных колодок Балашиха",
    "сход-развал Железнодорожный",
    "замена масла Балашиха",
    "ремонт глушителя Балашиха",
    "замена ремня ГРМ Балашиха"
  ],
  openGraph: {
    title: "Грант Авто — диагностика, ТО и ремонт авто в Железнодорожном",
    description:
      "Автосервис в Балашихе, мкр. Железнодорожный: диагностика, ТО, подвеска, тормоза, двигатель, трансмиссия и сход-развал.",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: visualAssets[0].url,
        width: 1200,
        height: 630,
        alt: "Грант Авто — автосервис в Балашихе"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Московская область",
    addressLocality: "Балашиха",
    streetAddress: "микрорайон Железнодорожный, Темниково, 93"
  },
  areaServed: ["Балашиха", "микрорайон Железнодорожный", "Московская область"],
  openingHours: "С 09:00",
  paymentAccepted: site.payments.join(", "),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: "25",
    ratingCount: "33"
  },
  image: visualAssets.map((asset) => asset.url),
  url: "https://grandauto.local"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={headingFont.variable}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
