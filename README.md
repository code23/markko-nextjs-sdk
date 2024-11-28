# Markko NextJS SDK

A TypeScript SDK for integrating Markko API with NextJS applications.

## Installation
```bash
npm install markko-nextjs-sdk
```

## Setup

Add the following environment variables to your NextJS project's `.env.local` file:

```env
MPE_VERSION=
MPE_ORIGIN=
MPE_API_BASE_PATH=
MPE_PASSWORD_KEY=
MPE_PASSWORD_SECRET=
MPE_CLIENT_CREDENTIAL_KEY=
MPE_CLIENT_CREDENTIAL_SECRET=
```

> You should also set the `NODE_ENV` environment variable to `development` or `production` depending on your environment. In development the SSL certificate is not verified.

## SDK Usage

### Important Security Notice ⚠️

For Next.js applications, it's recommended to use this SDK in the following ways:

### Server-Side Usage (Recommended)
#### App Router (Next.js 13+)
- In Server Components (recommended)
- In Route Handlers (`app/api/**/route.ts`)

#### Pages Router (Legacy)
- In `getServerSideProps`
- In API routes (`pages/api/*`)

### Client-Side Usage (Use with caution)
Client-side usage should be limited to non-sensitive operations only. For sensitive operations, always use server-side API routes.

### Example Usage with App Router (Recommended)

```typescript
// app/vendors/page.tsx
import { MarkkoSDK } from 'markko-nextjs-sdk';

export default async function VendorsPage() {
  const sdk = new MarkkoSDK({
    // config
  });
  
  const vendors = await sdk.vendors.list();
  
  return (
    <div>
      {/* Your JSX */}
    </div>
  );
}
```

### Example Usage with Route Handlers

```typescript
// app/api/vendors/route.ts
import { MarkkoSDK } from 'markko-nextjs-sdk';

export async function GET() {
  const sdk = new MarkkoSDK({
    // config
  });
  
  const data = await sdk.vendors.list();
  return Response.json(data);
}
```

## API Documentation

### Vendors

#### `list(params = {})`

Fetches a list of vendors based on the provided parameters.

- `params`: Optional object containing query parameters
- Returns: Promise with the API response

Example parameters:
- `sort`: Sort order (e.g., 'created_at,desc')
- `with`: Include related resources
- `paginate`: Number of items per page
- `page`: Page number
- `is_approved`: Filter by approval status
- `is_onboarded`: Filter by onboarding status
- `is_rejected`: Filter by rejection status
- `condensed`: Return condensed response

#### `get(id: number, params = {})`

Fetches a single vendor by ID.

- `id`: The numeric ID of the vendor
- `params`: Optional object containing query parameters
- Returns: Promise with the API response

#### `save(data: Record<string, any>)`

Registers a new vendor with the provided data.

- `data`: Object containing the vendor registration data
- Returns: Promise<boolean> - Returns true if successful
- Throws: APIError if the request fails or returns an error

Example usage:

## Authentication

The SDK automatically handles OAuth2 authentication using client credentials. It will:
- Automatically obtain access tokens when needed
- Cache tokens until they expire
- Refresh tokens before they expire
- Add the Bearer token to all API requests

You don't need to handle authentication manually, but you can access the token if needed:

```typescript
const token = await sdk.getAccessToken();
```

## License

ISC
