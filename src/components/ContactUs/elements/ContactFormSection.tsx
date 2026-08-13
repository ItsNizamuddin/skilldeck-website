import GenericForm from "@/components/Forms/GenericForm";
import { ArrowRight, Clock, Headphones } from "lucide-react";
import Link from "next/link";

export default function ContactFormSection() {
    return (
        <section className="py-12 lg:py-20 px-4 lg:px-0">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
                        <div className="mb-6">
                            <h2 className="heading-section2 mb-2">Send Us a Message</h2>
                            <p className="body-medium text-gray-600">Fill out the form below and we&apos;ll get back to you soon.</p>
                        </div>

                        <GenericForm
                            formtype="enquiry"
                            title=""
                            description=""
                            formId="contact-us-enquiry"
                        />
                    </div>

                    {/* Support & Office Info */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Headphones className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="heading-card text-white">Priority Support</h3>
                                    <p className="body-small text-white/80">For enterprise customers</p>
                                </div>
                            </div>
                            <p className="body-medium text-gray-300 mb-6">
                                Get dedicated support with guaranteed response times and a personal account manager.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
                            >
                                Learn About Enterprise
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-6 h-6 text-brand-primary" />
                                <h3 className="heading-card">Business Hours</h3>
                            </div>
                            <div className="space-y-2 body-small text-gray-600">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="font-semibold text-brand-dark">9:00 AM - 6:00 PM IST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-semibold text-brand-dark">10:00 AM - 4:00 PM IST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-semibold text-brand-dark">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
