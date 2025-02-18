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
import { MarkkoSDK } from "@meetmarkko/markko-nextjs-sdk";

export default async function VendorsPage() {
  const sdk = new MarkkoSDK({
    // config
  });

  const vendors = await sdk.vendors.list();

  return <div>{/* Your JSX */}</div>;
}
```

### Example Usage with Route Handlers

```typescript
// app/api/vendors/route.ts
import { MarkkoSDK } from "@meetmarkko/markko-nextjs-sdk";

export async function GET() {
  const sdk = new MarkkoSDK({
    // config
  });

  const data = await sdk.vendors.list();
  return Response.json(data);
}
```

## API Documentation

### Addresses

#### `create(data: Record<string, any>)`

Creates a new address.

- `data`: Object containing the address data
- `oauth`: The OAuth token data
- Returns: Promise with the created address
- Throws: APIError if the request fails

#### `delete(id: string)`

Deletes an address.

- `id`: The ID of the address to delete
- `oauth`: The OAuth token data
- Returns: Promise with the deleted address data

#### `findByPostcode(postcode: string)`

Looks up addresses by postcode.

- `postcode`: The postcode to search for (spaces are automatically removed)
- `oauth`: The OAuth token data
- Returns: Promise with a list of matching addresses

#### `getNearbyModel(postcode: string, model: string, radius = 10, limit = 10, relationships = null)`

Gets a list of nearby models by postcode.

- `postcode`: The postcode to search from
- `model`: The model type to search for
- `radius`: Search radius in miles (default: 10)
- `limit`: Maximum number of results (default: 10)
- `relationships`: Related data to include (optional)
- `oauth`: The OAuth token data
- Returns: Promise with a list of nearby models

#### `setDefault(id: string)`

Sets an address as the default.

- `id`: The ID of the address to set as default
- `oauth`: The OAuth token data
- Returns: Promise with the updated address data

#### `update(id: string, data: Record<string, any>)`

Updates an existing address.

- `id`: The ID of the address to update
- `data`: Object containing the update data
- `oauth`: The OAuth token data
- Returns: Promise with the updated address
- Throws: APIError if the request fails

### Attributes

#### `list(params = {})`

Fetches the active product attributes.

- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

Example parameters:

- `sort`: Sort order (e.g., 'created_at,desc')
- `with`: Include related resources
- `paginate`: Number of items per page
- `page`: Page number
- `is_active`: Filter by active status

### Auth

#### `login(data: Record<string, any>)`

Logs in a user.

- `data`: Object containing the login data
- Returns: Promise with the API response

### Blog Posts

#### `listPosts(params = {})`

Fetches a list of blog posts.

- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `listCategories(params = {})`

Fetches a list of blog categories. By default, returns only active categories.

- `params`: Optional object containing query parameters
  - Default includes `is_active: true`
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `listPostsByCategory(categoryId: number, params = {})`

Fetches a list of blog posts for a specific category.

- `categoryId`: The numeric ID of the category
- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `getPost(id: number, params = {})`

Fetches a single blog post by ID.

- `id`: The numeric ID of the blog post
- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `getPostBySlug(slug: string, params = {})`

Fetches a single blog post by its slug.

- `slug`: The URL slug of the blog post
- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `getCategoryBySlug(slug: string, params = {})`

Fetches a blog category by its slug, including associated posts. By default, returns only active categories.

- `slug`: The URL slug of the category
- `params`: Optional object containing query parameters
  - Default includes `is_active: true`
- `oauth`: The OAuth token data
- Returns: Promise with the API response

### Categories

#### `list(params = {})`

Fetches a list of all categories.

- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `listNested(params = {})`

Fetches a nested list of all categories.

- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `get(id: number, params = {})`

Fetches a single category by its ID.

- `id`: The numeric ID of the category
- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `getBySlug(slug: string, params = {})`

Fetches a single category by its slug.

- `slug`: The URL slug of the category
- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
- Returns: Promise with the API response

### Charities

#### `list(params = [])`

Fetches a list of all charities.

- `params`: Optional query parameters to filter the list of charities.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all charities.

#### `get(id: number, params = {})`

Fetches the details of a specific charity by its unique ID.

- `id`: (Required) The unique ID of the charity to retrieve.
- `params` : (Optional) An object containing additional query parameters for filtering or including related data.
- `oauth`: The OAuth token data
- Returns: A promise with the charity data.

#### `save(data: Record<string, any>)`

Registers a new charity with the provided data.

- `data`: Object containing the charity registration data
- `oauth`: The OAuth token data
- Returns: Promise<boolean> - Returns true if successful
- Throws: APIError if the request fails or returns an error

#### `getBySlug(slug: string, params = {})`

Fetches a single charity by their URL slug.

- `slug`: The URL slug of the charity
- `params`: Optional object containing query parameters
  - Default includes `is_active: 1`
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `nameIsUnique(name: string)`

Check if a charity (store) name is available.

- `name`: The store name to check
- `oauth`: The OAuth token data
- Returns: Promise with a boolean indicating if the name is unique

### Currencies

#### `list(params = {}, oauth = null)`

Fetches a list of available currencies.

- `params`: Optional object containing query parameters (default: `{ is_enabled: 1 }`)
- `oauth`: The OAuth token data (default: `null`)
- Returns: Promise with the API response containing a list of currencies

### Donations

#### `getByNumber(number: string, params = [])`

Fetches a donation based on its number.

- `number`: The donation number to filter by.
- `params`: Optional query parameters to filter the result.
- `oauth`: The OAuth token data
- Returns: A promise with the donation data matching the number.

#### `list(params = [])`

Fetches a list of all donations.

- `params`: Optional query parameters to filter the list of donations.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all donations.

#### `save(id: string, data: Record<string, any>)`

Processes a donation for a specific charity.

- `id`: The ID of the charity to donate to.
- `data`: An object containing the donation details, such as amount, donor information, etc.
- `oauth`: The OAuth token data
- Returns: A promise with the donation response data, including transaction status and details.

### Events

#### `list(params = [])`

Fetches a list of all events.

- `params`: Optional query parameters to filter the list of events.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all events.

#### `get(id: number, params = {})`

Fetches a single event by its unique ID.

- `id`: The unique ID of the event to retrieve.
- `params`: Optional query parameters to filter the event details.
- `oauth`: The OAuth token data
- Returns: A promise with the event data.

#### `save(id: string, data: Record<string, any>)`

Saves an event with the provided data.

- `id`: The ID of the event to update.
- `data`: An object containing the event data to be saved.
- `oauth`: The OAuth token data
- Returns: A promise with the saved event data.

#### `cancel(id: number, data: Record<string, any>)`

Cancels an event.

- `id`: The ID of the event to cancel.
- `data`: An object containing the event data to be saved.
- `oauth`: The OAuth token data
- Returns: A promise with the saved event data.

### Messages

#### `getAllChannels(params = {}, oauth = null)`

Fetches a list of all messaging channels.

- `params`: Optional query parameters to filter the list of channels.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all channels.

#### `getChannel(channelId: string, params = {}, oauth = null)`

Fetches a single channel by its unique ID.

- `channelId`: The unique ID of the channel to retrieve.
- `params`: Optional query parameters (includes pagination settings).
- `oauth`: The OAuth token data
- Returns: A promise with the channel data and messages.

#### `loadMoreMessages(channelId: string, params = {}, oauth = null)`

Loads more messages for a specific channel.

- `channelId`: The ID of the channel to load messages from.
- `params`: Pagination parameters (page, paginate).
- `oauth`: The OAuth token data
- Returns: A promise with the messages data.

#### `sendMessage(params = {}, oauth = null)`

Sends a new message.

- `params`: Object containing message data:
  - `order_id`: Optional order ID reference
  - `event_id`: Optional event ID reference
  - `is_update`: Boolean flag for update messages (required to be false if `channel_name` is not provided)
  - `channel_name`: Optional name of the channel to send the message to (required if `is_update` is false)
  - `recipient_id`: The ID of the recipient (required)
  - `message`: Object containing the message details:
    - `body`: The content of the message (required)
    - `files`: Optional array of files to attach
  - `meta`: Optional metadata related to the message
- `oauth`: The OAuth token data
- Returns: A promise with the sent message data.

#### `closeChannel(channelId: string, oauth = null)`

Closes a messaging channel.

- `channelId`: The ID of the channel to close.
- `oauth`: The OAuth token data
- Returns: A promise with the response data from closing the channel.

### Products

#### `list(params = {}, oauth = null)`

Fetches a list of all products.

- `params`: Optional query parameters to filter the list of products.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all products.

#### `listWithFilters(params = {}, oauth = null)`

Fetches a filtered list of products with advanced filtering options.

- `params`: The filter parameters for the products query (includes pagination support).
- `oauth`: The OAuth token data
- Returns: A promise with the filtered list of products.

#### `get(vendorSlug: string, productSlug: string, params = {}, oauth = null)`

Fetches a single product by vendor and product slug.

- `vendorSlug`: The slug of the vendor
- `productSlug`: The slug of the product
- `params`: Optional API parameters
- `oauth`: The OAuth token data
- Returns: A promise with the product data.

#### `getById(id: number, params = {}, oauth = null)`

Fetches a single product by its unique ID.

- `id`: The unique ID of the product to retrieve
- `params`: Optional API parameters
- `oauth`: The OAuth token data
- Returns: A promise with the product data.

#### `getBySlug(slug: string, params = {}, oauth = null)`

Fetches a single product by its slug.

- `slug`: The slug of the product to retrieve
- `params`: Optional API parameters
- `oauth`: The OAuth token data
- Returns: A promise with the product data.

#### `latest(count = 3, params = {}, oauth = null)`

Fetches the most recently added products.

- `count`: The number of products to retrieve (default = 3)
- `params`: Optional API parameters
- `oauth`: The OAuth token data
- Returns: A promise with the list of latest products.

#### `variantLookup(id: number, code: string, oauth = null)`

Looks up a product variant by code.

- `id`: Product ID
- `code`: Variant code (e.g., '1.4-2.12-6.7')
- `oauth`: The OAuth token data
- Returns: A promise with the product variant data.

### reference values

#### `byCategory(params = {}, oauth = null)`
Fetches reference values based on the given category.

params: Optional object containing query parameters
oauth: The OAuth token data (optional)
Returns: Promise with the API response

### Reviews

#### `list(params = {}, oauth = null)`

Fetches a list of all reviews.

- `params`: Optional query parameters to filter the list of reviews.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all reviews.

#### `create(data: Record<string, any>, oauth = null)`

Creates a new review.

- `data`: Object containing the review data
- `oauth`: The OAuth token data
- Returns: A promise with the created review data.

#### `update(data: Record<string, any>, oauth = null)`

Updates an existing review.

- `data`: Object containing the updated review data
- `oauth`: The OAuth token data
- Returns: A promise with the updated review data.

#### `delete(id: number, oauth = null)`

Deletes an existing review.

- `id`: The ID of the review to delete
- `oauth`: The OAuth token data
- Returns: A promise with the deleted review data.


### Specifications

#### Overview

The Specifications API provides endpoints for managing specifications, including fetching a list of specifications and retrieving specific specifications by their code.

#### API Methods

##### `list(params: {}, oauth: TokenData | null = null)`

Fetches a list of specifications.

- `params`: The query parameters for the request
- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the data from the response

##### `get(code: string, params: {}, oauth: TokenData | null = null)`

Fetches a specific specification by code.

- `code`: The code of the specification to retrieve
- `params`: The query parameters for the request
- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the data from the response

### Specification Groups

#### `list(params = {}, oauth = null)`

Fetches a list of all specification groups.

- `params`: Optional query parameters to filter the list of specification groups.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all specification groups.

#### `get(id: string, params = {}, oauth = null)`

Fetches a specific specification group by ID.

- `id`: The ID of the specification group to retrieve.
- `params`: Optional query parameters to filter the specification group.
- `oauth`: The OAuth token data
- Returns: A promise with the specification group data.

### Tags

#### `list(params = [])`

Fetches a list of all tags.

- `params`: Optional query parameters to filter the list of tags.
- `oauth`: The OAuth token data
- Returns: A promise with the list of all tags.

### Users

#### Overview

The Users API provides endpoints for managing user accounts, including user registration, profile management, email verification, and wishlist functionality.

#### API Methods

##### `get(oauth: TokenData | null = null)`

Retrieves the currently authenticated user.

- `oauth`: The OAuth token data
- Returns: Promise with the user data

##### `create(data: { first_name: string; last_name: string; email: string; password: string; password_confirmation: string; terms: boolean; currency_id: string; phone?: string; }, oauth: TokenData | null = null)`

Creates a new user.

- `data`: Object containing user registration data
- `oauth`: The OAuth token data
- Returns: Promise with success or failure message
- Throws: Error if the API call fails or validation fails

##### `delete(oauth: TokenData | null = null)`

Deletes the currently authenticated user.

- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the response data from the deletion operation
- Throws: Error if the API call fails

##### `emailExistsInTeam(email: string, oauth: TokenData | null = null)`

Checks if an email exists in the team.

- `email`: The email address to check
- `oauth`: The OAuth token data (optional)
- Returns: Promise with a boolean indicating if the email exists

##### `updateProfile(data: { first_name: string; last_name: string; phone?: string; password?: string; password_confirmation?: string; currency_id: string; }, oauth: TokenData | null = null)`

Updates the user's profile with the provided data.

- `data`: Object containing user profile data to update
- `oauth`: The OAuth token data (optional)
- Returns: Promise with the updated user data
- Throws: Error if the API call fails or if validation fails

##### `sendEmailVerificationLink(oauth: TokenData | null = null)`

Sends an email verification link to the user.

- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the result of the operation, typically a success message
- Throws: Error if the API call fails

##### `wishlist(oauth: TokenData | null = null)`

Retrieves the user's wishlist.

- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the response data containing the user's wishlist items

##### `wishlistAdd(id: number, oauth: TokenData | null = null)`

Adds a product to the authenticated user's wishlist.

- `id`: The ID of the product to add to the wishlist
- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the updated wishlist

##### `wishlistRemove(id: number, oauth: TokenData | null = null)`

Removes a product from the authenticated user's wishlist.

- `id`: The ID of the product to remove from the wishlist
- `oauth`: The OAuth token data (optional) for authentication
- Returns: Promise with the response data indicating the result of the operation

### Vendors

#### `list(params = {})`

Fetches a list of vendors based on the provided parameters.

- `params`: Optional object containing query parameters
- `oauth`: The OAuth token data
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
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `getBySlug(slug: string, params = {})`

Fetches a single vendor by their URL slug.

- `slug`: The URL slug of the vendor
- `params`: Optional object containing query parameters
  - Default includes `is_active: 1`
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `follow(id: number)`

Follow a vendor.

- `id`: The numeric ID of the vendor to follow
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `unfollow(id: number)`

Unfollow a vendor.

- `id`: The numeric ID of the vendor to unfollow
- `oauth`: The OAuth token data
- Returns: Promise with the API response

#### `isStoreNameUnique(name: string)`

Check if a vendor (store) name is available.

- `name`: The store name to check
- `oauth`: The OAuth token data
- Returns: Promise with a boolean indicating if the name is unique

#### `save(data: Record<string, any>)`

Registers a new vendor with the provided data.

- `data`: Object containing the vendor registration data
- `oauth`: The OAuth token data
- Returns: Promise<boolean> - Returns true if successful
- Throws: APIError if the request fails or returns an error

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
