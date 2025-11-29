/**
 * SEO Component
 *
 * Gerencia as Meta Tags, Open Graph e JSON-LD para otimização em buscadores.
 * Deve ser usado em cada página para personalizar o título e descrição.
 */

import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical = "https://sistema-reembolso.vercel.app",
  type = "website",
}) => {
  const siteTitle = `${title} | Sistema de Reembolso`;

  // Dados estruturados (JSON-LD) para Software Application
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sistema de Reembolso",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    description: description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
  };

  return (
    <Helmet>
      {/* Tags Padrão */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Sistema de Reembolso" />
      <meta property="og:image" content="/pwa-icon.svg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/pwa-icon.svg" />

      {/* Dados Estruturados (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
