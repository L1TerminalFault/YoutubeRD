import { Suspense } from "react";

export default function ({ children }) {
  return (
  <div>
    <Suspense fallback={<div></div>}>
      {children}
    </Suspense>
  </div>
  )
}
