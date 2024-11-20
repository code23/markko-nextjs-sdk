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

## Usage

### Initialize the SDK

```typescript
import MarkkoSDK from 'markko-nextjs-sdk';

const config = {
  version: process.env.MPE_VERSION!,
  origin: process.env.MPE_ORIGIN!,
  apiBasePath: process.env.MPE_API_BASE_PATH!,
  passwordKey: process.env.MPE_PASSWORD_KEY!,
  passwordSecret: process.env.MPE_PASSWORD_SECRET!,
  clientCredentialKey: process.env.MPE_CLIENT_CREDENTIAL_KEY!,
  clientCredentialSecret: process.env.MPE_CLIENT_CREDENTIAL_SECRET!,
  isDevelopment: process.env.NODE_ENV === 'development'
};

const sdk = new MarkkoSDK(config);
```

For client components, you'll need to pass the config through an API route:

```typescript
// pages/api/config.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const config = {
    version: process.env.MPE_VERSION,
    origin: process.env.MPE_ORIGIN,
    apiBasePath: process.env.MPE_API_BASE_PATH,
    passwordKey: process.env.MPE_PASSWORD_KEY,
    passwordSecret: process.env.MPE_PASSWORD_SECRET,
    clientCredentialKey: process.env.MPE_CLIENT_CREDENTIAL_KEY,
    clientCredentialSecret: process.env.MPE_CLIENT_CREDENTIAL_SECRET,
    isDevelopment: process.env.NODE_ENV === 'development'
  };
  
  res.status(200).json(config);
}

// In your client component:
const [sdk, setSdk] = useState<MarkkoSDK | null>(null);

useEffect(() => {
  async function initSDK() {
    const response = await fetch('/api/config');
    const config = await response.json();
    setSdk(new MarkkoSDK(config));
  }
  
  initSDK();
}, []);
```

### Vendors API

#### List Vendors

```typescript
// Get vendors with custom parameters
const vendors = await sdk.vendors.list({
    sort: 'created_at,desc',
    with: 'users,commission_group,currency,commission',
    paginate: 10,
    page: 1,
    is_approved: 1,
    is_onboarded: 1,
    is_rejected: 0,
    condensed: true
});
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
