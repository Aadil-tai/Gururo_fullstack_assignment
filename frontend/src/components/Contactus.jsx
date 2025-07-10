import React, { useRef, useState } from 'react';
import contactImage from '../assets/Hero/left3.svg';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const formRef = useRef();
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setIsSent(true);
                    setLoading(false);
                    reset();
                    setTimeout(() => setIsSent(false), 4000);
                },
                (error) => {
                    console.error('Email send error:', error);
                    setLoading(false);
                }
            );
    };

    return (
        <section id="contact" className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Get in Touch</h2>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block font-medium mb-1">Name *</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full border p-3 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your Full Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email *</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email format',
                                },
                            })}
                            className={`w-full border p-3 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Message *</label>
                        <textarea
                            {...register('message', { required: 'Message is required' })}
                            rows={5}
                            className={`w-full border p-3 rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Type your message here"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>

                    {isSent && <p className="text-green-500 text-sm mt-2">Your message has been sent!</p>}
                </form>
            </div>

            <div className="hidden md:block">
                <img src={contactImage} alt="Contact Illustration" className="w-full h-auto rounded-lg" />
            </div>
        </section>
    );
};

export default ContactUs;
