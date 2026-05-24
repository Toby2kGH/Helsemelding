"use client";

import React, { ReactNode } from "react";

type Category = "min_behandling" | "samarbeid_om_meg" | "bidra_til_fremtiden";

interface ConsentSectionProps {
  title: string;
  description: string;
  category: Category;
  children: ReactNode;
}

const categoryColors: Record<Category, { header: string; border: string }> = {
  min_behandling: {
    header: "bg-blue-50 border-blue-200",
    border: "border-blue-200",
  },
  samarbeid_om_meg: {
    header: "bg-green-50 border-green-200",
    border: "border-green-200",
  },
  bidra_til_fremtiden: {
    header: "bg-purple-50 border-purple-200",
    border: "border-purple-200",
  },
};

const categoryTitleColors: Record<Category, string> = {
  min_behandling: "text-blue-900",
  samarbeid_om_meg: "text-green-900",
  bidra_til_fremtiden: "text-purple-900",
};

export default function ConsentSection({
  title,
  description,
  category,
  children,
}: ConsentSectionProps) {
  const colors = categoryColors[category];
  const titleColor = categoryTitleColors[category];

  return (
    <div className={`border rounded-lg p-6 mb-6 ${colors.border} bg-white`}>
      <div className={`${colors.header} -mx-6 -mt-6 px-6 py-4 rounded-t-lg mb-6`}>
        <h2 className={`text-xl font-bold ${titleColor} mb-2`}>{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
