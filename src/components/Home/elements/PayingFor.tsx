import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import youEndUpPayingImage from "../../../../public/theProblem/Youenduppaying.png";
import lostRevenueImage from "../../../../public/theProblem/lostrevenue.png";
import risingCostsImage from "../../../../public/theProblem/risingcosts.png";
import wastedBudgetImage from "../../../../public/theProblem/wastedbudget.png";

const payingItems = [
    "Multiple software subscriptions",
    "Large teams to manage simple tasks",
    "Agencies to build & maintain systems",
    "Continuous development & maintenance"
];

const PayingFor = () => {
    return (
        <div className="container mx-auto px-2 xl:px-0 pt-16">
            <div className="bg-[#eeedf2] rounded-2xl p-6 md:p-10  shadow-sm">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Right Side - Bento Grid */}
                    <div className="w-full lg:w-4/12">
                        <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-[280px] md:h-[320px]">
                            {/* Wasted Budget - Top Left */}
                            <div className="relative rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
                                <Image
                                    src={wastedBudgetImage}
                                    alt="Wasted Budget"
                                    fill
                                    className="group-hover:scale-105 transition-transform duration-300 object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    <p className="body-small font-semibold text-white">Wasted Budget</p>
                                </div>
                            </div>

                            {/* Rising Costs - Top Right (spans 2 rows) */}
                            <div className="relative rounded-2xl overflow-hidden shadow-md row-span-2 group hover:shadow-lg transition-shadow">
                                <Image
                                    src={risingCostsImage}
                                    alt="Rising Costs"
                                    fill
                                    className="group-hover:scale-105 transition-transform duration-300 object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-600/80 via-pink-500/40 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="body-small font-semibold text-white">Rising Costs</p>
                                    <p className="body-extrasmall text-white/80 mt-1">Month over month</p>
                                </div>
                            </div>

                            {/* Lost Revenue - Bottom Left */}
                            <div className="relative rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
                                <Image
                                    src={lostRevenueImage}
                                    alt="Lost Revenue"
                                    fill
                                    className="group-hover:scale-105 transition-transform duration-300 object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    <p className="body-small font-semibold text-white">Lost Revenue</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left Side - List */}
                    <div className="w-full lg:w-4/12">
                        <h2 className="heading-section2 mb-6">
                            You end up paying for:
                        </h2>

                        <ul className="space-y-4 md:space-y-5">
                            {payingItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] flex items-center justify-center shadow-md">
                                        <BadgeDollarSign className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="body-small font-medium">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Center - Illustration */}
                    <div className="w-full lg:w-4/12 flex flex-col items-center">
                        {/* Image */}
                        <div className="relative w-fit mb-4 border border-slate-200 bg-white rounded-2xl p-4">
                            <Image
                                src={youEndUpPayingImage}
                                alt="Tech complexity illustration"
                                width={400}
                                height={400}
                                className="object-contain"
                                sizes="(max-width: 768px) 90vw, 33vw"
                            />
                            {/* Disappointing Results Banner */}
                            <div className="w-fit bg-gradient-to-r from-brand-primary via-brand-secondary to-pink-500 rounded-full px-6 py-2.5 shadow-lg mx-auto mt-4">
                                <p className="body-small text-white font-medium text-center lg:text-nowrap">
                                    And yet... results remain disappointing.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PayingFor;
