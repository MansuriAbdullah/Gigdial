import { useEffect } from 'react';

const SEO = ({ title, description }) => {
    useEffect(() => {
        // Update Title
        document.title = title ? `${title} | GigDial` : 'GigDial - Hire Local Experts';

        // Update Meta Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description || 'Find trusted local professionals for your home and business needs. Verified workers, transparent pricing, and instant booking.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description || 'Find trusted local professionals for your home and business needs. Verified workers, transparent pricing, and instant booking.';
            document.head.appendChild(meta);
        }
    }, [title, description]);

    return null;
};

export default SEO;
