export default function ContactHero() {
    return (
        <section className="pt-24 lg:pt-30 pb-10 lg:pb-20 px-4 lg:px-0 relative overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse" />

            <div className="container mx-auto text-center relative z-10">
                <div className="badge-brand mb-6">
                    Get In Touch
                </div>
                <h1 className="text-xl md:text-2xl lg:text-5xl font-bold mb-4">
                    We&apos;d Love to
                    <span className="block mt-2 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                        Hear From You
                    </span>
                </h1>
                <p className="body-medium max-w-2xl mx-auto">
                    Have questions about our products? Need help getting started?
                    Our team is here to help you succeed.
                </p>
            </div>
        </section>
    );
}
