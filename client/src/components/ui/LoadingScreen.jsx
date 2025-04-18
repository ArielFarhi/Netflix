import React from "react";
import { Loader as SpinnerIcon } from "lucide-react";

function LoadingScreen() {
  return (
    <section className="w-screen h-screen flex items-center justify-center bg-black">
      <SpinnerIcon className="text-white animate-spin" size={48} strokeWidth={1.5} />
    </section>
  );
}

export default LoadingScreen;