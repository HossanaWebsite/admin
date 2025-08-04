const siteUrl = 'https://www.hcsem.org';

function generateOpenGraph({ url, title, description, images }) {
  return {
    url,
    title,
    description,
    siteName: 'HCSEM',
    images,
    locale: 'en_US',
    type: 'website',
  };
}

function generateTwitterCard({ title, description, images }) {
  return {
    card: 'summary_large_image',
    title,
    description,
    images,
  };
}

function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HCSEM',
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo.png`,
    sameAs: [
      'https://www.facebook.com/hcsem',
      'https://twitter.com/hcsem',
    ],
  };
}

module.exports = { siteUrl, generateOpenGraph, generateTwitterCard, generateOrganizationJsonLd };
