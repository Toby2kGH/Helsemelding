"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export function EnFlowHeader({
  nr,
  total,
  title,
  children,
}: {
  nr: number;
  total: number;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="text-sm text-blueberry-700 font-medium mb-1">
        Step {nr} of {total}
      </p>
      <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
      {children && <p className="text-neutral-600 mt-2">{children}</p>}
    </div>
  );
}

export function EnFlowNav({
  prevHref,
  onNext,
  nextLabel,
}: {
  prevHref: string;
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
      <Link
        href={prevHref}
        className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back
      </Link>
      <button
        onClick={onNext}
        className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-3 text-base font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2 transition"
      >
        {nextLabel}
        <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
