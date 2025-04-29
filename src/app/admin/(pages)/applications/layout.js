export async function generateMetadata() {
  return {
    title: "Admin Panel - Manage Applications",
    robots: "noindex, nofollow", // Prevent search engines from indexing this page
  };
}

export default function ApplicationLayout({ children }) {
  return <>{children}</>;
}
