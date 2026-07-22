# Secure Stripe Payment Architecture (Next.js + Firebase)

This document serves as the official Payment Architecture Blueprint. It outlines the exact data flow, security requirements, and implementation steps to integrate Stripe securely using Next.js Route Handlers as a serverless backend, while utilizing Firebase for authentication and database management.

---

## 1. Core Architecture Principles

*   **Zero-Trust Client**: The frontend browser is never trusted with pricing data or secret keys.
*   **Serverless Backend**: Next.js API Routes (`src/app/api/...`) act as the secure Node.js backend.
*   **Single Source of Truth**: Firebase Firestore holds the canonical pricing and product data.
*   **Encrypted Processing**: All actual payment processing is offloaded to Stripe's PCI-compliant hosted checkout.

---

## 2. The Complete Data Flow

### Phase 1: Initiating Checkout (Client to Server)
1. **User Action**: The user clicks "Checkout" in the Next.js frontend.
2. **Auth Verification**: The frontend retrieves a secure JWT ID token from Firebase Auth (`user.getIdToken()`).
3. **API Request**: The frontend makes a `POST` request to the Next.js API route (`/api/checkout`), passing the Product ID/Cart Items in the body, and the Firebase ID token in the `Authorization` header.

### Phase 2: Secure Session Generation (Server to Stripe)
4. **Token Verification**: The Next.js API route uses the `firebase-admin` SDK to verify the ID token. If invalid, the request is rejected (401 Unauthorized).
5. **Price Resolution**: The Next.js API queries Firestore (`admin.firestore().collection('products')`) using the provided Product IDs to fetch the *true, unalterable price*.
6. **Session Creation**: The API route securely calls Stripe using the `STRIPE_SECRET_KEY` (hidden in `.env.local`) to generate a Stripe Checkout Session. It attaches the `userId` and `orderId` as invisible metadata.
7. **Redirection**: The server returns the secure Stripe URL to the frontend, which redirects the user to Stripe.

### Phase 3: Payment Processing & Fulfillment (Stripe to Server)
8. **Payment**: The user securely enters their credit card details on Stripe's domain.
9. **Webhook Trigger**: Upon success, Stripe fires a secure, encrypted `POST` request to the Next.js webhook endpoint (`/api/webhooks/stripe`).
10. **Signature Verification**: Next.js verifies the webhook signature using `STRIPE_WEBHOOK_SECRET` to ensure the payload actually came from Stripe.
11. **Fulfillment**: Next.js extracts the metadata (`userId`), connects to Firestore via `firebase-admin`, and creates a new "Order" document marked as `PAID`.

---

## 3. Required Environment Variables

To implement this locally and in production (e.g., Vercel), the following environment variables must be securely configured:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Safe for frontend
STRIPE_SECRET_KEY=sk_test_...                   # Server ONLY
STRIPE_WEBHOOK_SECRET=whsec_...                 # Server ONLY

# Firebase Admin Credentials (for Server)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# App URL (for Stripe redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 4. Implementation Checklist

### Step 1: Install Dependencies
```bash
npm install stripe firebase-admin
```

### Step 2: Create the Checkout API Route
**File:** `frontend/src/app/api/checkout/route.ts`
*   Initialize `stripe` and `firebase-admin`.
*   Extract Bearer token from headers.
*   Verify token using `admin.auth().verifyIdToken()`.
*   Fetch product prices from Firestore based on cart contents.
*   Call `stripe.checkout.sessions.create()`.
*   Return session URL to frontend.

### Step 3: Update Frontend Checkout Logic
**File:** `frontend/src/features/cart/CartView.tsx` (or similar)
*   Ensure user is logged in.
*   Get Firebase token (`getIdToken()`).
*   Call `/api/checkout` with token and cart data.
*   Handle the redirect to the returned Stripe URL.

### Step 4: Create the Webhook API Route
**File:** `frontend/src/app/api/webhooks/stripe/route.ts`
*   Export config to disable Next.js body parsing (Stripe needs the raw body to verify signatures).
    ```typescript
    export const config = { api: { bodyParser: false } };
    ```
*   Verify the signature using `stripe.webhooks.constructEvent()`.
*   Listen for `checkout.session.completed`.
*   Extract `metadata.userId` from the event.
*   Write order fulfillment data to Firestore (`admin.firestore().collection('orders')`).

### Step 5: Test the Webhook Locally
*   Install the Stripe CLI.
*   Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
*   Use the generated webhook secret in your `.env.local`.

---

## 5. Security & Scaling Considerations
*   **Never trust the client:** Always fetch prices from Firestore inside the API route.
*   **Idempotency:** Webhooks can sometimes fire twice. Ensure your Firestore write operation checks if the order was *already* fulfilled before fulfilling it again.
*   **Error Handling:** Ensure failed API routes return proper HTTP status codes (400, 401, 500) so the frontend can display fallback error messages gracefully.
