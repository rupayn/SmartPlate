import Sign from "@/components/sign"
import Image from "next/image";
import im from "../../public/images.jpeg";


export default function HomePage(){
  return (
    <>
      <div className="flex h-auto w-auto items-center   justify-center">
        <div className="p-5 my-10 bg-slate-700 flex-col sm:flex-row flex items-center justify-center md:w-auto md:h-auto">
          <Image
            src={im}
            alt="image"
            className="sm:m-8  mb-3 rounded-full sm:rounded-lg w-28 sm:w-72 sm:h-96"
          />
          <Sign
            inputFilds={[
              ["Full Name", "text"],
              ["Enrollment No", "text"],
              ["Email", "email"],
              ["Password", "password"],
              ["Re-enter Password", "password"],
            
            ]}
            link="/api/signup"
            accountStatus="signup"
          />
          
        </div>
      </div>
    </>
  );
}