export default function ContactPage(){
    return(
        <section className="flex flex-col gap-6 px-4 py-6 md:mx-auto md:max-w-4xl">

            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">Contact Us</h1>
                <p className="text-sm text-gray-500">
                We'd love to hear from you
                </p>
            </div>

            <form className="flex flex-col gap-4">

            <input
                type="text"
                placeholder="Your Name"
                className="rounded-lg border px-4 py-3 text-sm focus:outline-none"
                />
            
            <input
                type="email"
                placeholder="Your Email"
                className="rounded-lg border px-4 py-3 text-sm focus:outline-none"
                />
                <textarea
                rows="4"
                placeholder="Your Message"
                className="rounded-lg border px-4 py-3 text-sm focus:outline-none"
                />
            <button
            type="submit"
            className="mt-2 rounded-lg bg-black py-3 text-white">
            </button>

            </form>

        </section>


    );
}