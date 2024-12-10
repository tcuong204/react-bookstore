import Header from "@/Components/Header";

export default function Account() {
  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#ccc] w-full">
        <div className="flex justify-center w-[72%]">
          <div className="w-[25%] h-[500px] bg-[#fff]"></div>
          <div className="w-[75%] h-[500px] bg-[#fff]"></div>
        </div>
      </div>
    </>
  );
}
