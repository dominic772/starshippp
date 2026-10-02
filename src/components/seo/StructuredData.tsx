import React, { useEffect } from 'react';
import type { FaqItem } from '../../types';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface HowToData {
  name: string;
  description: string;
  steps: HowToStep[];
}

export interface RatingData {
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
}

interface StructuredDataProps {
  pageTitle?: string;
  pageDescription?: string;
  canonicalUrl?: string;
  faqs?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
  howTo?: HowToData;
  includeTools?: boolean;
  rating?: RatingData;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  pageTitle = 'starshippp.com | Bulky & DIM-Weight 3PL Fulfillment | Pontiac, Michigan',
  pageDescription = 'Specialized 3PL for large boxes and low weight. Negotiated carrier DIM factor relief, cheap bulk storage, transparent $250/mo minimum, and direct floor Slack access in Pontiac, MI.',
  canonicalUrl = 'https://starshippp.com',
  faqs = [],
  breadcrumbs = [],
  howTo,
  includeTools = false,
  rating,
}) => {
  useEffect(() => {
    // 1. Update Title and Meta in DOM
    document.title = pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 2. Build Structured Data Schema Graph
    const schemaGraph: any[] = [
      {
        '@type': 'Organization',
        '@id': 'https://starshippp.com/#organization',
        name: 'starshippp.com',
        url: 'https://starshippp.com',
        logo: 'https://starshippp.com/images/starshippp-logo.png',
        slogan: 'Precision, Postage, Partnership. The Anti-Mega-3PL.',
        description:
          'A modern, tech-native boutique 3PL and fulfillment hub located in Pontiac, Michigan specializing in bulky, high-cube, and DIM-weight e-commerce.',
        foundingLocation: {
          '@type': 'Place',
          name: 'Pontiac, Michigan',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-248-555-0199',
          contactType: 'Customer Service & Floor Operations',
          areaServed: 'US',
          availableLanguage: ['English'],
        },
        sameAs: ['https://twitter.com/starshippp_3pl', 'https://linkedin.com/company/starshippp'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://starshippp.com/#localbusiness',
        name: 'starshippp.com Pontiac Fulfillment Center',
        image: 'https://starshippp.com/images/og-social-card.jpg',
        telephone: '+1-248-555-0199',
        priceRange: '$$ - $250 Fair Monthly Minimum',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '391 E Wilson Ave',
          addressLocality: 'Pontiac',
          addressRegion: 'MI',
          postalCode: '48341',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 42.6305,
          longitude: -83.2801,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '06:00',
            closes: '19:00',
          },
        ],
      },
      {
        '@type': 'LogisticsService',
        '@id': `${canonicalUrl}#service`,
        name: 'Bulky & DIM-Weight E-commerce Pick, Pack & Ship',
        provider: {
          '@id': 'https://starshippp.com/#organization',
        },
        serviceType: 'Bulky & Large Box 3PL Fulfillment',
        areaServed: 'United States',
        description:
          'Specialized 3PL offering negotiated carrier DIM factor relief, transparent $250/mo account commitment, high-bay bulk storage, USPS Ground Advantage & FedEx Home Delivery, and direct floor Slack access.',
        ...(rating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: rating.ratingValue,
                reviewCount: rating.reviewCount,
                bestRating: rating.bestRating || '5',
                worstRating: '1',
              },
            }
          : {}),
      },
    ];

    // FAQs Schema
    if (faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // BreadcrumbList Schema
    if (breadcrumbs.length > 0) {
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      });
    }

    // HowTo Schema (e.g. 3-Step Zero-Downtime Migration Protocol)
    if (howTo && howTo.steps.length > 0) {
      schemaGraph.push({
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#howto`,
        name: howTo.name,
        description: howTo.description,
        step: howTo.steps.map((st, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: st.name,
          text: st.text,
        })),
      });
    }

    // WebApplication / SoftwareApplication Schema for Link-Magnet Tools
    if (includeTools) {
      schemaGraph.push(
        {
          '@type': 'WebApplication',
          '@id': 'https://starshippp.com/#dim-calculator',
          name: 'Free Dimensional (DIM) Weight Shipping Calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All Modern Web Browsers',
          browserRequirements: 'Requires JavaScript',
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD',
          },
          description:
            'Free interactive calculator to compute dimensional freight weight factors (139 vs 166 divisor) and identify carrier packaging surcharge leaks for DTC founders.',
        },
        {
          '@type': 'WebApplication',
          '@id': 'https://starshippp.com/#roi-calculator',
          name: 'In-House Fulfillment vs Boutique 3PL Cost Comparison Engine',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All Modern Web Browsers',
          browserRequirements: 'Requires JavaScript',
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD',
          },
          description:
            'Interactive ROI modeler comparing warehouse lease, warehouse labor, packing supplies, and carrier rates against Starshippp flat fulfillment pricing.',
        }
      );
    }

    // 3. Inject JSON-LD Script tag into DOM
    let scriptTag = document.getElementById('starshippp-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'starshippp-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    });

    return () => {
      // Kept clean across page navigation
    };
  }, [pageTitle, pageDescription, canonicalUrl, faqs, breadcrumbs, howTo, includeTools, rating]);

  return null;
};
