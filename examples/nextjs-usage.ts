import { MarkkoSDK } from '@meetmarkko/markko-nextjs-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// App Router Usage (Next.js 13+ Recommended)
// app/vendors/page.tsx
export async function VendorsPage() {
  const sdk = new MarkkoSDK({ /* config */ });
  const data = await sdk.vendors.list();

  return (
    <div>
      {/* Server Component - Safe to use SDK directly */}
      {data.map(vendor => (
        <div key={vendor.id}>{vendor.name}</div>
      ))}
    </div>
  );
}

// Pages Router Usage (Legacy)
// pages/vendors.tsx
export async function getServerSideProps() {
  const sdk = new MarkkoSDK({ /* config */ });
  const data = await sdk.vendors.list();

  return {
    props: {
      vendors: data
    }
  };
}

// API Route (for client-side operations)
// pages/api/vendors.ts or app/api/vendors/route.ts
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const sdk = new MarkkoSDK({ /* config */ });
  const data = await sdk.vendors.list();
  return Response.json(data);
}

// Client Component (use with caution)
'use client';
const ClientComponent = () => {
  const fetchPublicData = async () => {
    // First fetch config from your secure API route
    const response = await fetch('/api/sdk-config');
    const config = await response.json();

    const sdk = new MarkkoSDK(config);
    // Only use for public, non-sensitive operations
  };

  return <button onClick={fetchPublicData}>Fetch Data</button>;
};
