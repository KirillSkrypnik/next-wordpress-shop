import Link from "next/link";
import Image from 'next/image';
import YoutubeI from "../../../../public/image/youtube";

const Footer = ({ footer, header  }) => {

    const { copyrightText, footerMenuItems, sidebarOne, sidebarTwo, socialLinks } = footer || {};
    const { headerMenuItems, siteDescription, siteLogoUrl, siteTitle } = header || {};
    return (
        <footer>
            <div className="container">
                <div className="footer_top">
                    <div className="footer_top_left">
                        <Link href="/" legacyBehavior>
                            <a className="footer_logo">
                                {
                                siteLogoUrl ? (
                                    <Image
                                    src={siteLogoUrl}
                                    alt={`${siteTitle} logo`}
                                    width={86}
                                    height={86}
                                    />
                                ) : null
                                }
                            </a>
				        </Link>
                        <div
                            className="footer_siteTitle"
                            dangerouslySetInnerHTML={{ __html: header.siteTitle }}
                            />
                    </div>
                    <div className="footer_top_right">
                        <ul>
                        {socialLinks?.length > 0 ? (
                            socialLinks.map((item) => (
                                <li key={item.iconName}>
                                    <a href={item.iconUrl}>
                                        {item.iconName === 'youtube' ? <YoutubeI /> : null}
                                    </a>
                                </li>
                            ))
                            ) : (
                            <li>Меню пустое</li>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;