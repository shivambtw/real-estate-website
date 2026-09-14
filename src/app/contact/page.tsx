"use client";
import ContactForm from "@/components/common/contact-forn";
import Image from "next/image";
// import dynamic from "next/dynamic";

// Dynamically import the MapContainer from react-leaflet to disable SSR (Server-Side Rendering)
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );

export default function ContactPage() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24 px-6 py-12 lg:px-24 lg:py-20 bg-gray-50 text-lg mt-24 mx-auto">
      {/* <div className="text-center lg:text-left"></div> */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Let&apos;s get in touch !
        </h2>
        <div>
          <Image
            src="/images/dfgh.png"
            alt="Real Estate Agent"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="text-center max-w-2xl mt-8">
          <h2 className="text-3xl font-bold mb-4 text-teal-500">
            Shivam Arora
          </h2>
          <p className="text-lg mb-6">
            Dedicated real estate professional with over a decade of experience
            in helping clients find their dream homes and make smart
            investments.
          </p>
        </div>
      </div>
      <ContactForm />

      {/* <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
           <h3 className="text-2xl font-semibold mb-6">Let us know about you</h3>
   
           <form className="flex flex-col gap-4">
             {/* <select className="border rounded-md py-2 px-3">
               <option>I am</option>
               <option>Buyer</option>
               <option>Seller</option>
               <option>Agent</option>
             </select> */}

      {/* <div className="flex flex-col lg:flex-row gap-4">
               <input
                 type="text"
                 placeholder="First name"
                 className="border rounded-md py-2 px-3 w-full"
               />
               <input
                 type="text"
                 placeholder="Last name"
                 className="border rounded-md py-2 px-3 w-full"
               />
             </div>
   
             <div className="flex flex-col lg:flex-row gap-4">
               <input
                 type="email"
                 placeholder="Email"
                 className="border rounded-md py-2 px-3 w-full"
               />
               <input
                 type="tel"
                 placeholder="Phone No"
                 className="border rounded-md py-2 px-3 w-full"
               />
             </div>
   
             <textarea
               placeholder="Message"
               rows={4}
               className="border rounded-md py-2 px-3 w-full resize-none"
             ></textarea>
   
             <button
               type="submit"
               className="bg-black text-white py-3 rounded-md font-semibold mt-4"
             >
               Book A Free Consultation
             </button>
           </form> */}
      {/* </div> */}
    </div>
  );
}
