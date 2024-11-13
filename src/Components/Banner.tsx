import CustomSwiper from "../utils/CustomSwiper";

export default function Banner() {
  return (
    <div className="flex justify-center algin-center">
      <div className="">
        <div className="flex">
          <CustomSwiper />
          <div className="ml-[8px]">
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/Trangdoitac_1024_Resize_Subbanner_392x156.png"
              alt=""
            ></img>
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/Trangdoitac_1024_Resize_Subbanner_392x156.png"
              alt=""
              className="mt-[4px]"
            ></img>
          </div>
        </div>
        <div className="flex mt-2">
          <div>
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/TrangCTthang10_Mainbanner_Resize_Smallbanner_310x210.png"
              alt=""
              className="w-[95%]"
            ></img>
          </div>
          <div>
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/TrangCTthang10_Mainbanner_Resize_Smallbanner_310x210.png"
              alt=""
              className="w-[95%]"
            ></img>
          </div>
          <div>
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/TrangCTthang10_Mainbanner_Resize_Smallbanner_310x210.png"
              alt=""
              className="w-[95%]"
            ></img>
          </div>
          <div>
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/TrangCTthang10_Mainbanner_Resize_Smallbanner_310x210.png"
              alt=""
              className="w-[95%]"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
