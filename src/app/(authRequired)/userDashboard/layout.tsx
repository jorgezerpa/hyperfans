import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-x-hidden">
        <Navbar />
        <div className="flex justify-start items-start">
            <div className="h-screen pt-[80px]">
                <Sidebar />
            </div>
            <div className="h-screen w-full overflow-hidden pt-[80px]">
              <div className="overflow-y-scroll h-full">
                { children }
              </div>
            </div>
        </div>
    </div>
  );
}
