import {
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
    YoutubeIcon,
} from 'lucide-react';
import Image from 'next/image';
import { SparkIcon } from '@/components/ui/spark-icon';

export function MinimalFooter() {
    const year = new Date().getFullYear();

    const company = [
        {
            title: 'About Us',
            href: '#',
        },
        {
            title: 'Careers',
            href: '#',
        },
        {
            title: 'Brand assets',
            href: '#',
        },
        {
            title: 'Privacy Policy',
            href: '#',
        },
        {
            title: 'Terms of Service',
            href: '#',
        },
    ];

    const resources = [
        {
            title: 'Blog',
            href: '#',
        },
        {
            title: 'Help Center',
            href: '#',
        },
        {
            title: 'Contact Support',
            href: '#',
        },
        {
            title: 'Community',
            href: '#',
        },
        {
            title: 'Security',
            href: '#',
        },
    ];

    const socialLinks = [
        {
            icon: <FacebookIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <GithubIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <InstagramIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <LinkedinIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <TwitterIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <YoutubeIcon className="size-4" />,
            link: '#',
        },
    ];
    return (
        <footer className="relative">
            <div className="bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)] mx-auto max-w-4xl md:border-x">
                <div className="bg-border absolute inset-x-0 h-px w-full" />
                <div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
                    <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
                        <a href="/" className="w-max flex items-center gap-2">
                            <SparkIcon
                                size={24}
                                className="text-neutral-700 dark:text-neutral-200"
                            />
                            <Image
                                src="/logo/black.png"
                                alt="Haestus"
                                width={120}
                                height={28}
                                className="h-7 w-auto dark:hidden block"
                            />
                            <Image
                                src="/logo/white.png"
                                alt="Haestus"
                                width={120}
                                height={28}
                                className="h-7 w-auto dark:block hidden"
                            />
                        </a>
                        <p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
                            Design systems and web development for visionary brands. We craft digital experiences that help Davids compete with Goliaths.
                        </p>
                        <div className="flex gap-2">
                            {socialLinks.map((item, i) => (
                                <a
                                    key={i}
                                    className="hover:bg-accent rounded-md border p-1.5"
                                    target="_blank"
                                    href={item.link}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-3 w-full md:col-span-1">
                        <span className="text-muted-foreground mb-1 text-xs">
                            Resources
                        </span>
                        <div className="flex flex-col gap-1">
                            {resources.map(({ href, title }, i) => (
                                <a
                                    key={i}
                                    className={`w-max py-1 text-sm duration-200 hover:underline`}
                                    href={href}
                                >
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-3 w-full md:col-span-1">
                        <span className="text-muted-foreground mb-1 text-xs">Company</span>
                        <div className="flex flex-col gap-1">
                            {company.map(({ href, title }, i) => (
                                <a
                                    key={i}
                                    className={`w-max py-1 text-sm duration-200 hover:underline`}
                                    href={href}
                                >
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-border absolute inset-x-0 h-px w-full" />
                <div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
                    <p className="text-muted-foreground text-center font-thin">
                        © Haestus. All rights reserved {year}
                    </p>
                </div>
            </div>
        </footer>
    );
}
