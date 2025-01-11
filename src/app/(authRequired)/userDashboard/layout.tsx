import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar />
        <div className="flex justify-start items-start">
            <div className="h-screen w-[200px]">
                <Sidebar />
            </div>
            <div className="h-screen w-full">
                { children }
            </div>
        </div>
    </div>
  );
}
