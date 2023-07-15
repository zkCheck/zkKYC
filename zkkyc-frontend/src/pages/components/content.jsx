import React from 'react';
import {FaChartBar, FaLightbulb, FaMobile, FaRocket} from "react-icons/fa";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {GiAbstract031} from "react-icons/gi";


const FeatureBox = ({ icon, label }) => {
    return (
        <div className="rounded-lg p-4 shadow-md flex items-center justify-center w-52">
            <div className="text-white">
                {icon}
            </div>
            <div className="ml-2 text-white font-medium text-center">{label}</div>
        </div>
    );
};

const MainContent = ({openPopup}) => {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="max-w-7xl mx-auto py-8 px-8">
                <div className={"text-6xl underline text-white text-center font-medium"}>
                    zk-KYC platform
                </div>
                <div className="flex justify-center space-x-4 mt-16">
                    <FeatureBox icon={<AiFillSafetyCertificate size={32} />} label="Enhanced privacy protection" />
                    <FeatureBox icon={<GiAbstract031 size={32} />} label="Zero knowledge proofs" />
                    <FeatureBox icon={<FaLightbulb size={32} />} label="Smart contract verification" />
                </div>
                <div className={"flex justify-center mt-20"}>
                    <button
                        className={"w-52 h-16 text-white text-2xl border-2 border-white rounded-lg bg-gradient-to-br from-main-or to-main-orlll cursor-pointer"}
                        onClick={openPopup}
                    >
                        Start Now
                    </button>
                </div>
                <div className={"flex justify-center mt-3"}>
                    <div className={"font-thin text-gray-400 text-sm"}>
                        * using auto generated document
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;