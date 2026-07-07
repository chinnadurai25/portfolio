import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft } from 'react-icons/fa';

const ArticleView = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) throw error;
                if (data) setArticle(data);
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
                <div className="text-slate-400">Loading article...</div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center">
                <div className="glass dark:glass-dark p-20 rounded-[3rem] text-center max-w-2xl w-full">
                    <h2 className="text-3xl font-black mb-4">Article Not Found</h2>
                    <p className="text-slate-400 mb-8">This article might have been removed or doesn't exist.</p>
                    <Link to="/blog" className="px-6 py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors inline-block">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-cyan-500/10 to-transparent -z-20"></div>

            <div className="container mx-auto max-w-4xl">
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors mb-8 font-bold text-sm uppercase tracking-widest">
                    <FaArrowLeft /> Back to Articles
                </Link>

                <motion.article 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass dark:glass-dark rounded-[3rem] overflow-hidden border border-white/20 dark:border-slate-700/50"
                >
                    {article.cover_image && (
                        <div className="w-full h-64 md:h-96 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-4">
                            <img src={article.cover_image} alt={article.title} className="w-full h-full object-contain" />
                        </div>
                    )}
                    
                    <div className="p-8 md:p-16">
                        <div className="mb-12 text-center">
                            <p className="text-sm text-cyan-500 font-bold tracking-widest uppercase mb-4">
                                {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                {article.title}
                            </h1>
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none prose-cyan prose-headings:font-black prose-a:text-cyan-500 hover:prose-a:text-cyan-600 prose-img:rounded-2xl">
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

export default ArticleView;
