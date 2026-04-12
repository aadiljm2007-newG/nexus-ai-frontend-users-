import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen z-10 relative">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        {children}
      </div>
    </div>
  );
}
