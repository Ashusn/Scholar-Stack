import React from "react";
import Hero from "../components/Hero";

import { benefitOne } from "../components/data";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-900 overflow-hidden">
      <div>
        <Hero />

        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
          <div className="text-center">
            <h1 className="font-bold text-4xl text-purple-500">Benefits</h1>
            <div className="bg-violet-400 h-[4px] w-1/5 mx-auto mt-1"></div>
            <Benefits data={benefitOne} />
          </div>
        </div>

        <div className="flex flex-col w-[100vw] h-[100vh] justify-center  items-center">
          <div className="text-center">
            <h1 className="font-bold text-4xl text-purple-500">
              Our Testimonials
            </h1>
            <div className="bg-violet-400 h-[4px] w-1/5 mx-auto mt-1"></div>
            <Testimonials />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
