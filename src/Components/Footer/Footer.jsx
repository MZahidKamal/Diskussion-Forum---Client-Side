import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaFacebook, href: '#', color: 'text-blue-600' },
        { icon: FaTwitter, href: '#', color: 'text-sky-500' },
        { icon: FaInstagram, href: '#', color: 'text-pink-600' },
        { icon: FaLinkedin, href: '#', color: 'text-blue-700' },
        { icon: FaGithub, href: '#', color: 'text-gray-800' },
    ];

    const footerSections = [
        {
            title: 'Company',
            links: [
                { title: 'About Us', href: '#' },
                { title: 'Our Team', href: '#' },
                { title: 'Careers', href: '#' },
                { title: 'Press', href: '#' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { title: 'Blog', href: '#' },
                { title: 'Newsletter', href: '#' },
                { title: 'Events', href: '#' },
                { title: 'Help Center', href: '#' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { title: 'Terms of Service', href: '#' },
                { title: 'Privacy Policy', href: '#' },
                { title: 'Cookie Policy', href: '#' },
                { title: 'GDPR', href: '#' },
            ],
        },
    ];

    const contactInfo = [
        { icon: MdEmail, text: 'contact@diskussion.com', href: 'mailto:contact@diskussion.com' },
        { icon: MdPhone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { icon: MdLocationOn, text: '123 Forum St, Web City, 12345', href: '#' },
    ];

    return (
        <footer className="bg-gray-50 pt-16 pb-8 text-gray-600">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold italic text-gray-800 mb-4">Diskussion</h2>
                        <p className="mb-4 text-sm leading-relaxed">
                            Join the conversation, share your thoughts, and connect with others on our forum.
                            Diskussion is the place where ideas flourish and communities thrive.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className={`${social.color} hover:opacity-80 transition-opacity duration-200`}
                                    aria-label={`Follow us on ${social.icon.name}`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.href}
                                            className="text-sm hover:text-gray-800 transition-colors duration-200"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full md:w-auto mb-4 md:mb-0">
                            <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm">
                                {contactInfo.map((item, index) => (
                                    <li key={index} className="flex items-center mb-2 md:mb-0">
                                        <a href={item.href} className="flex items-center hover:text-gray-800 transition-colors duration-200">
                                            <item.icon className="w-4 h-4 mr-2 text-gray-400" />
                                            <span>{item.text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-auto text-center md:text-right">
                            <p className="text-sm">
                                © {currentYear} Diskussion. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
