This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### GET api/contacts/<contact-id>

- If a contact with `ID` value `<contact-id>` exists:
  - the response HTTP status should be: `200 OK`;
  - the response `Content-Type` header should be: `application/json`;
  - the response body should be: a JSON object with details of that contact loaded from
    the database (`ID`, `name`, `phone` and an array of strings `addressLines`).
- If a contact with `ID` value `<contact-id>` does not exist:
  - the response HTTP status should be: `404 Not Found`.

### DELETE api/contacts/<contact-id>

- If a contact with `ID` value `<contact-id>` exists:
  - the response HTTP status should be: `204 No Content`;
  - that contact is deleted, which means it is no longer included in the response to
    `GET /contacts` requests and its details are no longer available when making
    the `GET /contacts/<contact-id>` request.
- If a contact with `ID` value `<contact-id>` does not exist:
  - the response HTTP status should be: `404 Not Found`.

### GET api/ping (has already been implemented)

- The response HTTP status should be: `200 OK`.
- The response `Content-Type` header should be: `text/plain`.
- The response body should be: `pong`.

### POST api/contacts/<contact-id>

- Insert a contact with `ID` value `<contact-id>`
- body: JSON.stringify({
  id: contact.id,
  name: contact.name,
  phone: contact.phone,
  addressLines: contact.addressLines,
  }),

### PATCH api/contacts/<contact-id>

- Update a contact with `ID` value `<contact-id>`
- body: JSON.stringify({
  id: contact.id,
  name: contact.name,
  phone: contact.phone,
  addressLines: contact.addressLines,
  }),
