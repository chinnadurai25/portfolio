import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form states
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [published, setPublished] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setArticles(data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUploadingImage(true);
        try {
            let finalCoverImage = coverImage;

            if (coverImageFile) {
                const fileExt = coverImageFile.name.split('.').pop();
                const fileName = `article_${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio_images')
                    .upload(filePath, coverImageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('portfolio_images')
                    .getPublicUrl(filePath);
                    
                finalCoverImage = data.publicUrl;
            }

            const articleData = {
                title,
                content,
                cover_image: finalCoverImage,
                published
            };

            if (currentArticle) {
                // Update
                const { error } = await supabase
                    .from('articles')
                    .update(articleData)
                    .eq('id', currentArticle.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('articles')
                    .insert([articleData]);
                if (error) throw error;
            }

            resetForm();
            fetchArticles();
        } catch (error) {
            console.error("Error saving article:", error);
            alert("Failed to save article");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleEdit = (article) => {
        setCurrentArticle(article);
        setTitle(article.title);
        setContent(article.content);
        setCoverImage(article.cover_image || '');
        setPublished(article.published);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;
        try {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchArticles();
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    const resetForm = () => {
        setCurrentArticle(null);
        setTitle('');
        setContent('');
        setCoverImage('');
        setCoverImageFile(null);
        setPublished(false);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Blog Articles</h2>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl font-bold text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                        <FaPlus /> New Article
                    </button>
                )}
            </div>

            {isEditing && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass dark:glass-dark p-6 rounded-[2rem] border border-cyan-500/20 mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">{currentArticle ? 'Edit Article' : 'New Article'}</h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-200"><FaTimes /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Title</label>
                                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="Article Title" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Cover Image</label>
                                <input type="file" accept="image/*" onChange={(e) => setCoverImageFile(e.target.files[0])} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600" />
                                {coverImage && !coverImageFile && <p className="text-xs text-slate-500 mt-2 truncate">Current: {coverImage}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Content (Markdown supported)</label>
                            <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows="12" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white font-mono" placeholder="# Heading 1\n\nWrite your article here..."></textarea>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" />
                            <label htmlFor="published" className="text-sm font-bold text-slate-700 dark:text-slate-300">Publish this article immediately</label>
                        </div>

                        <button type="submit" disabled={uploadingImage} className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-cyan-600 transition-colors w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <FaSave /> {uploadingImage ? 'Saving...' : currentArticle ? 'Update Article' : 'Save Article'}
                        </button>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-10">Loading articles...</div>
                ) : articles.length === 0 ? (
                    <div className="text-center text-slate-400 py-10 glass dark:glass-dark rounded-[2rem]">No articles found. Write your first one!</div>
                ) : (
                    articles.map(article => (
                        <div key={article.id} className="glass dark:glass-dark p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {article.cover_image && (
                                <img src={article.cover_image} alt={article.title} className="w-full md:w-32 h-20 object-cover rounded-xl" />
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-black text-xl">{article.title}</h4>
                                    {article.published ? (
                                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] uppercase font-bold tracking-wider rounded border border-green-500/20">Published</span>
                                    ) : (
                                        <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold tracking-wider rounded border border-yellow-500/20">Draft</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{article.content}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(article.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2">
                                <button onClick={() => handleEdit(article)} className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-colors"><FaEdit /></button>
                                <button onClick={() => handleDelete(article.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminArticles;
