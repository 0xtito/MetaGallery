// import Web3AuthProvider from "@/components/client/providers/SafeAuthProvider";
// import XRLoginPage from "@/components/client/XRLoginPage";
import WebXRInit from "@/components/client/xr/WebXRInit";

export default function XRPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      {/* <Web3AuthProvider>
        <XRLoginPage />
      </Web3AuthProvider> */}
      <WebXRInit />
    </div>
  );
}
