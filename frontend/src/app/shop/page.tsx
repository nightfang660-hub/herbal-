'use client';
import { Suspense } from 'react';
import ShopView from './ShopView';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopView />
    </Suspense>
  );
}
