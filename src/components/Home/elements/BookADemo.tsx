import GenericForm from '@/components/Forms/GenericForm';
import { Check, Globe, Phone } from "lucide-react";
// import BookDemoForm from './BookDemoForm';

const BookADemo = () => {
    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12">

                    {/* Left Content */}
                    <div className="lg:sticky lg:top-24 space-y-4 lg:max-w-2xl">

                        <div className=" inline-block rounded-full bg-brand-primary/10 px-4 py-1.5 font-semibold text-[11px] tracking-wider capitalize">
                            <span className='bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent font-bold'>
                                Book A Demo
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="heading-section2">
                                Experience the Power of Skilldeck Yourself
                            </h2>
                            <p className="body-small">
                                Get a personalized walkthrough of the platform and see how we can transform your training business.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row lg:flex-col gap-8">
                            <div className="flex gap-5 items-center">
                                <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl">
                                    <Phone className='w-5 h-5 ' />
                                </div>
                                <div>
                                    <h3 className="body-medium text-brand-dark font-semibold">Virtual Walkthrough</h3>
                                    <p className="body-small text-gray-600 ">30-minute interactive session with our experts.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 items-center">
                                <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-base">
                                    <Globe className='w-5 h-5 ' />
                                </div>
                                <div>
                                    <h3 className="body-medium text-brand-dark font-semibold">On-Premise Presentation</h3>
                                    <p className="body-small text-gray-600 ">Available for established training institutes.</p>
                                </div>
                            </div>
                        </div>

                        {/* What You'll Get Card */}
                        <div className=" bg-slate-900 rounded-2xl p-5 text-white shadow-xl">
                            <h3 className="text-xl font-bold mb-2">What You&apos;ll Get</h3>
                            <ul className="space-y-1">
                                {[
                                    'One-time session password (24-hour access)',
                                    'Full platform walkthrough',
                                    'Personalized use case discussion',
                                    'Pricing and implementation guidance',
                                    'Q&A with product experts'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                        </div>
                                        <span className="text-white/90 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="p-6 lg:p-8 border w-full lg:w-[55%] border-black/10 shadow-2xl rounded-3xl bg-white">
                        {/* <h4 className="text-center text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent ">Enquiry Form</h4> */}
                        <GenericForm formtype="enquiry" showContactDetails={true} formId='book-demo' />
                    </div>

                </div>
            </div>
        </section>
    );
};


export default BookADemo