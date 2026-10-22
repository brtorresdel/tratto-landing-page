import React from 'react';

export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tratto.devtorres.com.br';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Tratto',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Browser',
        description:
          'Plataforma editorial para gestão e geração de contratos a partir de modelos .docx com controle de vigência e reajustes pelo IPCA.',
        url: baseUrl,
        author: {
          '@type': 'Person',
          name: 'Bruno Torres',
          url: 'https://www.devtorres.com.br',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
          description: 'Acesso antecipado gratuito na fase beta',
        },
      },
      {
        '@type': 'Organization',
        name: 'Tratto',
        url: baseUrl,
        logo: `${baseUrl}/icon.svg`,
        founder: {
          '@type': 'Person',
          name: 'Bruno Torres',
          url: 'https://www.devtorres.com.br',
        },
        sameAs: [
          'https://www.devtorres.com.br',
          'https://www.linkedin.com/in/brtorresdel/',
          'https://github.com/brtorresdel',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
