//Log In & Sign Up pages Layout
//Contains the left split - screen (brand, message and svg image)

import { Outlet } from "react-router-dom";

function LogSignLayout(){
    return(
        <>
           <div className="col-start-1 col-end-3 w-full border-2 rounded-lg shadow-sm flex">
                {/*Stable Log In & Sing Up pages site*/}
                <div id="imageArea" className="w-1/2 bg-[rgb(240,244,255)] rounded-l-lg px-14">
                        <div class="group w-full h-10 inline-flex items-center justify-start text-gray-600 py-[10%] sm:h-20">
                        <svg class="w-6 h-6 mr-2 shrink-0 fill-current" 
                        viewBox="0 0 24 24">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M9 12l2 2 4-4 M9 18h6" />
                        </svg>
                        <span class="text-black font-bold text-xl">ToDoList v1</span>
                    </div>
                    <div className=" w-2/4 flex flex-col">
                        <label className="font-bold text-xl">Stay Organized, reach the success!!</label>
                        <label className="font-semibold text-md">Plan your day, set goals - all in one place</label>
                    </div>
                    <div className=" w-96 h-64 px-5">
                        <svg viewBox="90 20 100 75" className="w-full h-full">
                            <image href="./splitImg.svg" width="220" height="95"/>
                        </svg>
                    </div>
                </div>
                {/*Form split-screen (outlet) */}
                <div id="loginFormArea" className="w-full h-full bg-[rgb(255,255,255)] rounded-r-lg flex flex-col px-14 gap-4">
                    <Outlet/>
                </div>
           </div>
        </>
    );
}

export default LogSignLayout;