import React from "react";
import HightLighttxt from "./HightLighttxt";
import { Link } from "react-router-dom";
import HeightBtn from "./HeightBtn";
import { TypeAnimation } from "react-type-animation";

const CodeComponts = ({ codeblock }) => {
  return (
    <div className="w-11/12 mx-auto flex">
      <div className="flex-col flex">
        <div className="w-[50%]">
          <div className="text-2xl font-semibold capitalize">
            <p className="w-[100%] flex">
              Unlock your{" "}
                <HightLighttxt text="coding potential"></HightLighttxt>
              
              With Our Online Courses
            </p>
          </div>

          <div>
            Our courses are designed and taught by industry experts who have
            years of experience in coding and are passionate about sharing their
            knowledge with you.
          </div>

          <div className="flex gap-4 ">
            <Link
              to="/login"
              className="hover:scale-105 transition-all duration-200"
            >
              <HeightBtn
                text="Lern More"
                textColor="text-richblack-900"
                Bgcolor="bg-yellow-50"
                BorderColor="border-richblack-600"
              />
            </Link>

            <Link to="/signup">
              <HeightBtn
                text="Book a Demo"
                textColor="text-richblack-100"
                Bgcolor="bg-richblack-600"
                BorderColor="border-yellow-50"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className=" text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
        </div>

        <div className="flex flex-col w-[90%] text-richblack-400 font-inter font-bold">
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            speed={50}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeComponts;
