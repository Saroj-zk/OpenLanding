import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoreFeaturesSection from '@/components/CoreFeaturesSection';
import SupportedModelsSection from '@/components/SupportedModelsSection';
import WhyAskMultipleModelsSection from '@/components/WhyAskMultipleModelsSection';
import ProductMatrixSection from '@/components/ProductMatrixSection';
import PricingSection from '@/components/PricingSection';
import TokenOptimizationSection from '@/components/TokenOptimizationSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import ApiSection from '@/components/ApiSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>OpenLedger Studio | AI Assistant</title>
        <meta
          name="description"
          content="OpenLedger Studio - A private, multi-model AI experience with no account required to start."
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Header />

      <Box component="main" sx={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', transition: 'background-color 0.35s ease' }}>
        <HeroSection />
        <CoreFeaturesSection />
        <SupportedModelsSection />
        <WhyAskMultipleModelsSection />
        <ProductMatrixSection />
        <PricingSection />
        <TokenOptimizationSection />
        <ApiSection />
        <EnterpriseSection />
      </Box>
    </>
  );
}

