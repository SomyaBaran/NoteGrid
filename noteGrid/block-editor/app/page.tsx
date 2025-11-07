import Image from "next/image";
import Editor from "./components/Editor/Editor";

export default function Home() {
  return (
    <div className="bg-[#000000] min-h-screen flex justify-center items-center overflow-hidden p-8">
      <div className="w-full max-w-10xl h-[93vh] border border-[#2E2E2E] rounded-2xl flex p-3 gap-6">

        {/* left component */}
        <div className="flex-1 flex flex-col gap-3">

          {/* nav bar */}
          <div className="flex items-center justify-start gap-10 mt-3 ml-3">
            <div>
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </div>
            <nav className="flex gap-8 text-white font-medium text-lg">
              <a href="#docs" className="hover:text-gray-500 transition">Docs</a>
              <a href="#ai" className="hover:text-gray-500 transition">AI</a>
              <a href="#examples" className="hover:text-gray-500 transition">Examples</a>
              <a href="#pricing" className="hover:text-gray-500 transition">Pricing</a>
              <a href="#about" className="hover:text-gray-500 transition">About</a>
            </nav>
          </div>
          {/* main title  */}
          <h1 className="font-bold text-white text-6xl mt-45 ml-7">
            The block-based editor<br />
            <span className='font-extrabold text-[#ababab]'>built for clarity<br /></span>
            <span className='font-semibold'>rich text editor</span>
          </h1>

          {/* paragraph  */}
          <p
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="text-[#5d5d5d] text-[18px] ml-7 mt-[10px]"
          >
            Create a seamless text editor experience that feels intuitive <br />
            and fast. Easily integrate it into your app and delight users <br />
            with smooth editing. Extend it with custom features like <br />
            interactive blocks or AI enhancements.
          </p>
          {/* Button */}
          <button
            className="h-11 w-35 text-white bg-[#0D0D0D] border border-[#2E2E2E] rounded-3xl m-3 ml-7 pt-2 pb-2 
            transition-all duration-300 
            hover:border-transparent 
            hover:shadow-[0_0_12px_2px_rgba(72,145,255,0.5),0_0_20px_4px_rgba(0,102,255,0.4),0_0_30px_6px_rgba(0,162,255,0.3)]"
          >
            Get Started
          </button>


        </div>

        {/* right component */}
        <div className="relative w-[40%] h-[75%] mt-[90px] mr-[40px]">
          <div
            className="absolute top-20 -left-20 w-140 h-72 bg-[#2c5a8fc6] rounded-full opacity-90"
            style={{ filter: 'blur(100px)' }}
          ></div>
          <div className="relative w-full h-full border bg-[#131313] rounded-xl p-4 text-[#2E2E2E]">
            <Editor />
          </div>
        </div>
      </div>

    </div >
  );
}
