import Sign from "@/components/sign";
import Image from "next/image";
import im from "../../../public/images.jpeg";
export default function Signin() {
  return (
    <>
      <div className="flex h-screen w-screen items-center   justify-center">
        <div className="p-5 m-10 bg-slate-700 flex-col sm:flex-row flex items-center justify-center md:w-auto md:h-auto">
          <Image
            src={im}
            alt="image"
            className="sm:m-8  mt-4 rounded-full sm:rounded-lg w-28 sm:w-64 sm:h-96"
          />
          <Sign
            inputFilds={[
              ["Enrollment No / Email", "text"],
              ["Password", "password"],
            ]}
            accountStatus="signin"
          />
        </div>
      </div>
    </>
  );
}
