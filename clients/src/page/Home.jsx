import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import HightLighttxt from "../components/core/home/HightLighttxt";
import HeightBtn from "../components/core/home/HeightBtn";
import Banner from "../assets/Images/banner.mp4";
import CodeComponts from "../components/core/home/CodeComponts";

const Home = () => {
  return (
    <div className="bg-richblack-900 text-white">
      <div className="w-11/12 mx-auto relative">
        {/* Section - 01 */}
        <div className="flex flex-col items-center justify-center gap-4 pt-[70px]">
          <div>
            <button className="border border-richblack-700 px-3 py-2 rounded-xl hover:scale-x-105 duration-200 bg-richblack-700">
              <Link to="/" className="flex items-center justify-center">
                Become an Instructor
                <span>
                  <GrFormNextLink />
                </span>
              </Link>
            </button>
          </div>

          <div className="w-7/12 flex flex-col gap-5 items-center justify-center">
            <div className="flex gap-1">
              <p className="text-2xl font-semibold items-center justify-center">
                Empower Your Future with
              </p>
              <span>
                <HightLighttxt text="Coding Skills" />{" "}
              </span>
            </div>
            <p className=" text-center text-sm text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </p>
          </div>

          <div className="flex gap-4 ">
            <Link
              to="/login"
              className=" hover:scale-105 transition-all duration-200"
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

          <div className="p-8 max-w-[1080px]">
            <div className="video-box-shadaw">
              <video className="rounded-2xl " muted loop autoPlay>
                <source src={Banner} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Section - 02 */}
        <div>
          {/* Code Componets */}
          <div>
            <CodeComponts
              codeblock={`<html>
                <head>
                  <title>My Web Page</title>
                </head>
                <body>
                  <h1>Welcome to My Website</h1>
                  <p>This is a basic HTML boilerplate.</p>
                </body>
              </html>`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
