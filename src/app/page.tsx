'use client'
import React from "react";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <Link href={'/question'}>
      <p>Start</p>
      </Link>
    </div>
  );
}
