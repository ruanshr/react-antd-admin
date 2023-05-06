import React, { lazy, Suspense } from "react";
import { Skeleton } from "antd";
export const LazyComponent = ({ path }: any) => {
  const Component = lazy(() => import(/* @vite-ignore */ path));
  return (props: any) => (
    <Suspense fallback={<Skeleton />}>
      <Component {...props} />
    </Suspense>
  );
};
