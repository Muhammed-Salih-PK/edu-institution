export async function generateMetadata() {
  return {
    title: "Course Panel - Manage Courses",
    robots: "noindex, follow", 
  };
}

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
