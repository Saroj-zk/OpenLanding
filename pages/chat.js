import * as React from 'react';
import Head from 'next/head';
import { ChatStudio } from '@/components/ChatStudio';

// The /chat route in the reference app hides the header and footer 
// for an immersive studio experience.
export default function ChatPage() {
  return (
    <>
      <Head>
        <title>Chat - OpenLedger</title>
      </Head>
      <ChatStudio />
    </>
  );
}
