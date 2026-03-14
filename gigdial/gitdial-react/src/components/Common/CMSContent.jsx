import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMSContent = ({ contentKey, fallback, className }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await axios.get(`/api/content?key=${contentKey}`);
                console.log('CMS Fetch successful:', contentKey, data);
                setContent(data.content);
                setLoading(false);
            } catch (error) {
                console.error('CMS Fetch failed:', contentKey, error);
                // If not found or error, stay with fallback
                setLoading(false);
            }
        };
        fetchContent();
    }, [contentKey]);

    if (loading) return <span className="animate-pulse bg-slate-100 rounded px-4 py-1" />;
    
    if (!content) return <span className={className}>{fallback}</span>;

    return (
        <span 
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default CMSContent;
