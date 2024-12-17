

import HeaderHome from "@/components/HeaderHome"
// import ListFriend from "./ListFriend"
import Welcome from "./Welcome"



export default function Home() {

    return (
        <div className="w-full h-screen max-h-screen overflow-auto">
            {/* <div>Home page</div> */}
            <div className="flex flex-1 h-full">


                {/* <ListFriend></ListFriend> */}


                <div className="bg-[#313338] w-full">
                    <HeaderHome />
                    <Welcome></Welcome>
                </div>
            </div>

        </div>

    )
}