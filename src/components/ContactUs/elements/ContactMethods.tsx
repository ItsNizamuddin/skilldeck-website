import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

const contactMethods = [
    {
        icon: Mail,
        title: "Email Us",
        description: "Our team typically responds within 24 hours",
        contact: "hello@skilldeck.net",
        action: "Send Email",
        href: "mailto:hello@skilldeck.net"
    },
    {
        icon: Phone,
        title: "Call Us",
        description: "Mon-Fri from 9 AM to 6 PM IST",
        contact: "+91 8296494941",
        action: "Call Now",
        href: "tel:+918296494941"
    },
    {
        icon: MessageCircle,
        title: "Live Chat",
        description: "Chat with our support team in real-time",
        contact: "Available 24/7",
        action: "Start Chat",
        href: "#"
    }
];

export default function ContactMethods() {
    return (
        <section className="py-12 px-4 lg:px-0">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 2xl:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-xl flex items-center justify-center mb-6 shadow-md">
                                <method.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="heading-card mb-2">{method.title}</h3>
                            <p className="body-small text-gray-600 mb-4">{method.description}</p>
                            <p className="body-medium font-semibold text-brand-dark mb-4">{method.contact}</p>
                            <Link
                                href={method.href}
                                className="inline-flex items-center text-brand-primary font-semibold hover:underline body-small"
                            >
                                {method.action}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
