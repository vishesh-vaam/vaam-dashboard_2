"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade";
import HighlightText from "@/components/global/highlight-text";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/global/ModeToggle";

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  return (
    <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
        {isMobile ? (
          <BlurFade delay={0.1} inView>
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-black">
                Your Fare. <br />
                <span className="text-gray-500">Your Money.</span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mt-2 text-black">
                <HighlightText text="Zero Commission!" />
              </h2>
              <p className="text-lg md:text-xl text-[#151515] mt-6 leading-relaxed">
                VAAM is an upcoming revolutionary ridesharing company with zero
                commission, empowering drivers to earn more and take control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/drive-with-us">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-[#ffd342] text-black font-medium hover:bg-[#ffcc00]"
                  >
                    Drive with us
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-black">0%</h3>
                  <p className="text-sm md:text-base text-gray-500">Commission on rides</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-black">£25</h3>
                  <p className="text-sm md:text-base text-gray-500">Weekly subscription</p>
                </div>
              </div>
            </div>
          </BlurFade>
        ) : (
          <motion.div
            className="max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-black">
              Your Fare.{" "}
              <span className="text-gray-500">Your Money.</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mt-2 text-black">
              <HighlightText text="Zero Commission!" />
            </h2>
            <p className="text-lg md:text-xl text-[#151515] mt-6 leading-relaxed">
              VAAM is an upcoming revolutionary ridesharing company with zero
              commission, empowering drivers to earn more and take control.
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/drive-with-us">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-[#ffd342] text-black font-medium hover:bg-[#ffcc00]"
                >
                  Drive with us
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-black">0%</h3>
                <p className="text-sm md:text-base text-gray-500">Commission on rides</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-black">£25</h3>
                <p className="text-sm md:text-base text-gray-500">Weekly subscription</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="relative mt-8 md:mt-0 hidden md:block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariant}
        >
          <div className="relative max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd342]/20 to-transparent rounded-full blur-3xl" />
            <img
              src="/vaam-car-logo-removebg.png"
              alt="VAAM Car"
              className="w-full h-full object-contain relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="w-full p-4 bg-black shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[#ffd342]">VAAM</div>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 text-black bg-[#ffd342] rounded-lg hover:bg-[#ffcc00] font-medium"
          >
            Dashboard
          </button>
		  {/* <div className="hidden md:block">
			<ModeToggle />
		  </div> */}
        </div>
      </nav>
      <Hero />
    </div>
  );
}