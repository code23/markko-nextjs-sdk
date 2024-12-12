# Markko NextJS SDK

A TypeScript SDK for integrating Markko API with NextJS applications.

## Installation
```bash
npm install @meetmarkko/markko-nextjs-sdk
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
import { MarkkoSDK } from '@meetmarkko/markko-nextjs-sdk';

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
import { MarkkoSDK } from '@meetmarkko/markko-nextjs-sdk';

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

#### `listByPostcode(postcode: string, params = {})`

Fetches vendors filtered by postcode.

- `postcode`: The postcode to filter vendors by (spaces are automatically removed)
- `params`: Optional object containing query parameters
  - Default includes `is_active: 1`
- Returns: Promise with the API response

#### `getBySlug(slug: string, params = {})`

Fetches a single vendor by their URL slug.

- `slug`: The URL slug of the vendor
- `params`: Optional object containing query parameters
  - Default includes `is_active: 1`
- Returns: Promise with the API response

#### `follow(id: number)`

Follow a vendor.

- `id`: The numeric ID of the vendor to follow
- Returns: Promise with the API response

#### `unfollow(id: number)`

Unfollow a vendor.

- `id`: The numeric ID of the vendor to unfollow
- Returns: Promise with the API response

#### `isStoreNameUnique(name: string)`

Check if a vendor (store) name is available.

- `name`: The store name to check
- Returns: Promise with a boolean indicating if the name is unique

#### `save(data: Record<string, any>)`

Registers a new vendor with the provided data.

- `data`: Object containing the vendor registration data
- Returns: Promise<boolean> - Returns true if successful
- Throws: APIError if the request fails or returns an error

Example usage:

### Blog Posts

#### `listPosts(params = {})`

Fetches a list of blog posts.

- `params`: Optional object containing query parameters
- Returns: Promise with the API response

#### `listCategories(params = {})`

Fetches a list of blog categories. By default, returns only active categories.

- `params`: Optional object containing query parameters
  - Default includes `is_active: true`
- Returns: Promise with the API response

#### `listPostsByCategory(categoryId: number, params = {})`

Fetches a list of blog posts for a specific category.

- `categoryId`: The numeric ID of the category
- `params`: Optional object containing query parameters
- Returns: Promise with the API response

#### `getPost(id: number, params = {})`

Fetches a single blog post by ID.

- `id`: The numeric ID of the blog post
- `params`: Optional object containing query parameters
- Returns: Promise with the API response

#### `getPostBySlug(slug: string, params = {})`

Fetches a single blog post by its slug.

- `slug`: The URL slug of the blog post
- `params`: Optional object containing query parameters
- Returns: Promise with the API response

#### `getCategoryBySlug(slug: string, params = {})`

Fetches a blog category by its slug, including associated posts. By default, returns only active categories.

- `slug`: The URL slug of the category
- `params`: Optional object containing query parameters
  - Default includes `is_active: true`
- Returns: Promise with the API response

### Example Usage with Blog Posts

### Addresses

#### `create(data: Record<string, any>)`

Creates a new address.

- `data`: Object containing the address data
- Returns: Promise with the created address
- Throws: APIError if the request fails

#### `delete(id: string)`

Deletes an address.

- `id`: The ID of the address to delete
- Returns: Promise with the deleted address data

#### `findByPostcode(postcode: string)`

Looks up addresses by postcode.

- `postcode`: The postcode to search for (spaces are automatically removed)
- Returns: Promise with a list of matching addresses

#### `getNearbyModel(postcode: string, model: string, radius = 10, limit = 10, relationships = null)`

Gets a list of nearby models by postcode.

- `postcode`: The postcode to search from
- `model`: The model type to search for
- `radius`: Search radius in miles (default: 10)
- `limit`: Maximum number of results (default: 10)
- `relationships`: Related data to include (optional)
- Returns: Promise with a list of nearby models

#### `setDefault(id: string)`

Sets an address as the default.

- `id`: The ID of the address to set as default
- Returns: Promise with the updated address data

#### `update(id: string, data: Record<string, any>)`

Updates an existing address.

- `id`: The ID of the address to update
- `data`: Object containing the update data
- Returns: Promise with the updated address
- Throws: APIError if the request fails

### Attributes

#### `list(params = {})`

Fetches the active product attributes.

- `params`: Optional object containing query parameters
- Returns: Promise with the API response

Example parameters:
- `sort`: Sort order (e.g., 'created_at,desc')
- `with`: Include related resources
- `paginate`: Number of items per page
- `page`: Page number
- `is_active`: Filter by active status

### Booking Reviews

### `create(data: { booking_id: string; review: string; rating: number })`

Creates a new booking review.

- `data`: Object containing the following fields:
  - `booking_id`: The ID of the booking to associate with the review.
  - `review`: The review text.
  - `rating`: The rating as a number.
- Returns: A promise that resolves to the created review.
- Throws: APIError if the request fails.

### `updatebookingreview(data: { booking_id: string; review: string; rating: number })`

Updates an existing booking review.

- `data`: Object containing the following fields:
  - `booking_id`: The ID of the booking to update the review for.
  - `review`: The updated review text.
  - `rating`: The updated rating as a number.
- Returns: A promise that resolves to the updated review.
- Throws: APIError if the request fails.

### `deletebookingreview(id: string)`

Deletes a booking review.

- `id`: The ID of the booking review to delete.
- Returns: A promise that resolves to the deleted review data.
- Throws: APIError if the request fails.

### `listReviews({ ids, paginate, page, with: relationships, sort }: ListReviewsParams)`

Fetches a list of booking reviews. By default, it returns all reviews.

- `ids`: Object containing model and ID pairs to filter by (e.g., { booking_id: 1 }).
- `paginate`: Number of items per page (default: 10, use 0 for no pagination).
- `page`: The pagination page to retrieve (default: 1).
- `with`: Related data to include (optional).
- `sort`: Field to sort results by (optional).
- Returns: A promise that resolves to an array of booking reviews.
- Throws: APIError if the request fails.

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

