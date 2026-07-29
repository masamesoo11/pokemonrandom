import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Pokemon Random",
  description: "Internal admin dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
