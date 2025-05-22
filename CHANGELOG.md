# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.29] - 2025-05-22

### Added

- Checkouts API endpoints:
  - Update the checkout details (step 1)
  - Update the shipping service (step 2)
  - Process payment (step 3)
  - Create a payment intent

## [1.0.0-beta.28] - 2025-05-20

### Added

- Shippings API endpoints:
  - Create a shipping zone
  - Update a shipping zone
  - Delete a shipping zone

## [1.0.0-beta.27] - 2025-05-19

### Removed

- Vendors API endpoints:
  - Update vendor's returns

### Added

- Vendors API endpoints:
  - Update vendor's shipping policy

## [1.0.0-beta.26] - 2025-05-16

### Added

- Shippings API endpoints:
  - List shipping services
  - Create a shipping service
  - Update a shipping service
  - Delete a shipping service

- Vendors API endpoints:
  - Update a vendor returns

## [1.0.0-beta.25] - 2025-05-15

### Added

- Commissions API endpoints:
  - List commission groups
  - Create a commission group
  - Update a commission group
  - Delete a commission group

## [1.0.0-beta.24] - 2025-04-23

### Fixed

- Removed `qs` package dependency

## [1.0.0-beta.23] - 2025-04-23

### Fixed

- Fixed handling array types in query parameters

## [1.0.0-beta.22] - 2025-04-16

### Fixed

- Fixed filtering in the `list` method in the Images API

## [1.0.0-beta.21] - 2025-04-15

### Fixed

- Fixed the `lookup` method in the Addresses API to use the correct parameter name

## [1.0.0-beta.20] - 2025-04-15

### Added

- Address API endpoints:
  - Lookup addresses by search term

## [1.0.0-beta.19] - 2025-04-02

### Added

- Auth API endpoints:
  - Logout

## [1.0.0-beta.18] - 2025-03-27

### Added

- Vendors API endpoints:
  - Update a vendor

## [1.0.0-beta.17] - 2025-03-27

### Added

- Vendors API endpoints:
  - Delete a vendor

## [1.0.0-beta.16] - 2025-03-26

### Added

- Files API endpoints:
  - Get list of files
  - Get file by id
  - Delete file by id
  - Download file by id
  - Update file
  - Register file

## [1.0.0-beta.15] - 2025-03-25

### Fixed

- Fixed the `register` method in the Images API to use the correct payload structure

## [1.0.0-beta.14] - 2025-03-24

### Added

- Images API endpoints:
  - Register an image

## [1.0.0-beta.13] - 2025-03-14

### Added

- Products API endpoints:
  - Count products
  - Create a product
  - Update a product by id
  - Delete a product by id
  - Delete all products
  - List of product variants
  - List of product options

## [1.0.0-beta.12] - 2025-03-14

### Added

- Images API endpoints:
  - Get list of images
  - Get image by id
  - Delete single image
  - Delete multiple images

### Updated

- Updated axios to version 1.8.3

## [1.0.0-beta.11] - 2025-03-05

### Fixed

- Products API endpoints:
  - Change `listWithFilters` method to use GET instead of POST

## [1.0.0-beta.10] - 2025-03-04

### Added

- Carts API endpoints:
  - Add product to cart
  - Apply coupon code
  - Apply promotion
  - Delete entire cart
  - Share cart via email
  - Fetch available promotions
  - Retrieve cart via shareable code
  - Update gift options
  - Remove product from cart
  - Retrieve cart details
  - Retrieve cart by id
  - Share cart via code
  - Update cart product quantity

## [1.0.0-beta.9]-2025-03-03

### Added

- Auth API endpoints:
  - Request a password reset link
  - Update a user's password

## [1.0.0-beta.8]-2025-03-03

### Added

- Orders API endpoints:
  - Get invoice by id
  - Get order by id
  - Get order by order number
  - Get list of orders
  - Get list of booking orders

## [1.0.0-beta.7]-2025-02-28

### Added

- Contacts API endpoints:
  - Submit to tenant
  - Submit to vendor
  - Submit repairs form

## [1.0.0-beta.6]-2025-02-27

### Updated

- Change to default params for `listPostsByCategory` method in the Blogs API for more flexibility

## [1.0.0-beta.5]-2025-02-27

### Fixed

- Fixed the `listPostsByCategory` method in the Blogs API to retrieve the posts

## [1.0.0-beta.4]-2025-02-21

### Added

- Reference Values API endpoint:
  - Retrieve reference values by category

## [1.0.0-beta.3]-2025-02-20

### Added

- Updated error handling

## [1.0.0-beta.2]-2025-02-18

### Added

- Added validation errors to the APIError class

### Fixed

- Fixed the `save` method in the Vendors API to handle validation errors properly

## [1.0.0-beta.1]-2025-02-11

### Added

- Updated version to beta.1

## [1.0.0-alpha.37]-2025-02-11

### Fixed

- Fixed the deafult params for the currencies API

## [1.0.0-alpha.36]-2025-02-10

### Added

- Currencies API endpoints:
  - Retrieve available currencies

## [1.0.0-alpha.35]-2025-02-07

### Added

- Specification Groups API endpoints:
  - Get a list of specification groups
  - Get a specific specification group by id

## [1.0.0-alpha.34]-2025-02-07

### Fixed

- Fix integrity error

## [1.0.0-alpha.33]-2025-02-07

### Added

- Specifications API endpoints:
  - Fetch a list of specifications
  - Fetch a specific specification by code

## [1.0.0-alpha.32]-2025-02-07

### Fixed

- Fixed various API endpoints to handle the oauth token properly at POST, PUT and PATCH requests

## [1.0.0-alpha.31]-2025-02-07

### Fixed

- Fixed the `sendMessage` method in the Messages API to handle the oauth token properly
- Fixed the `closeChannel` method in the Messages API to handle the oauth token properly

## [1.0.0-alpha.30]-2025-02-06

### Updated

- Send message
  - Updated Parameters:
  - `channel_name` (required if `is_update` is false)
  - `recipient_id` (required)
  - `message.body` (required)
  - Optional: `order_id`, `event_id`, `files`, `meta`

## [1.0.0-alpha.29]-2025-02-05

### Added

- Users API endpoints:
  - Retrieve currently authenticated user
  - Create a new user
  - Delete currently authenticated user
  - Check if an email exists in the team
  - Update user profile
  - Send email verification link
  - Retrieve user's wishlist
  - Add product to user's wishlist
  - Remove product from user's wishlist

## [1.0.0-alpha.28]-2025-02-05

### Added

- Messages API endpoints:
  - Get all channels
  - Get single channel
  - Load more messages
  - Send message
  - Close channel

## [1.0.0-alpha.27]-2025-02-04

### Added

- Reviews API endpoints:
  - List reviews
  - Create review
  - Update review
  - Delete review

## [1.0.0-alpha.26]-2025-02-04

### Added

- Products API endpoints:
  - List products
  - List products with filters
  - Get product by vendor and product slug
  - Get product by id
  - Get product by slug
  - Get latest products
  - Get product variant lookup

## [1.0.0-alpha.25]-2025-02-03

### Added

- Categories API endpoints:
  - List categories
  - List nested categories
  - Get category by id
  - Get category by slug

## [1.0.0-alpha.24]-2025-01-31

### Added

- Updated README.md and CHANGELOG.md

## [1.0.0-alpha.23]-2025-01-31

### Added

- Events API endpoints:
  - Get event by id
  - Save event
  - Cancel event

## [1.0.0-alpha.22]-2025-01-31

### Added

- Handle OAuth token
- Updated APIs to handle OAuth token
- Auth API endpoints:
  - Login
- Events API endpoints:
  - List events

## [1.0.0-alpha.21]-2025-01-29

### Added

- Tags API endpoints:
  - List tags

## [1.0.0-alpha.20]-2024-12-10

### Added

- Charities API endpoints:
  - List charities
  - Get charity by id
  - Save charity
  - Get charity by slug

## [1.0.0-alpha.19]-2024-12-09

### Added

- Donations API endpoints:
  - List donations
  - List donations by numbers
  - Get donation by slug with Number
  - Process donation for charity

## [1.0.0-alpha.18] - 2024-12-05

### Added

- Attributes API endpoints:
  - List attributes

## [1.0.0-alpha.17] - 2024-12-04

### Changed

- Updated package name and instructions

## [1.0.0-alpha.16] - 2024-11-30

### Added

- Address API endpoints:
  - Create new address
  - Delete address
  - Find addresses by postcode
  - Get nearby models by postcode
  - Set default address
  - Update existing address
- Error handling for address-related operations

## [1.0.0-alpha.15] - 2024-11-29

### Added

- Additional Vendor API endpoints:
  - List vendors by postcode
  - Get vendor by slug
  - Follow/unfollow vendor
  - Check store name uniqueness

## [1.0.0-alpha.12] - 2024-11-28

### Added

- Blog API endpoints:
  - List blog posts
  - List blog categories
  - Get posts by category
  - Get single post by id
  - Get post by slug
  - Get category by slug with posts

## [1.0.0-alpha.11] - 2024-11-26

### Added

- Vendor registration endpoint (`save` method)
- APIError class for better error handling

## [1.0.0-alpha.10] - 2024-11-26

### Added

- Initial SDK setup
- Basic authentication service
- Vendor endpoints:
  - List vendors
  - Get vendor details
- Context provider for React applications
- TypeScript support
- Next.js integration examples

### Changed

- N/A

### Deprecated

- N/A

### Removed

- N/A

### Fixed

- N/A

### Security

- N/A
