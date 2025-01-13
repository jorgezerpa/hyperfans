import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
          <Navbar />
          <div className="flex justify-start items-start">
              <div className="h-screen pt-[80px]">
                  <Sidebar isAdmin />
              </div>
              <div className="h-screen w-full overflow-hidden pt-[80px]">
                <div className="overflow-y-scroll h-full">
                  <Providers>
                    <div className="">
                      { children }
                    </div>
                  </Providers>
                </div>
              </div>
          </div>
    </div>
  );
}
