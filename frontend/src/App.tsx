import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './App.css';

// Cấu hình worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999/api';

// Types
interface Author {
    name: string;
    affiliation?: string;
    email?: string;
}

interface Article {
    _id: string;
    title: string;
    authors?: Author[];
    abstract: string;
    keywords?: string[];
    content: string;
    pdfFile?: {
        filename: string;
        path: string;
        size: number;
    };
    images?: {
        filename: string;
        path: string;
        caption?: string;
    }[];
    category: string;
    status: string;
    publishDate: string;
    views: number;
    references?: string[];
}

// Component: Header
function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="main-header">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="logo">
                        EduCredo
                    </Link>
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search publications, researchers or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">
                            🔍
                        </button>
                    </form>
                </div>
                <nav className="header-nav">
                    <Link to="/submit" className="nav-link">Join for free</Link>
                    <Link to="/submit" className="nav-link">Log in</Link>
                </nav>
            </div>
        </header>
    );
}

// Component: Trang chủ - Danh sách bài báo
function HomePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchArticles();
    }, [currentPage, selectedCategory]);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/articles`, {
                params: { page: currentPage, limit: 10, category: selectedCategory }
            });
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setLoading(false);
        }
    };

    const categories = [
        { value: '', label: 'All' },
        { value: 'research', label: 'Research' },
        { value: 'review', label: 'Review' },
        { value: 'case-study', label: 'Case Study' },
        { value: 'technical', label: 'Technical' },
        { value: 'news', label: 'News' }
    ];

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="home-page">
            <div className="page-header">
                <h1>Discover Scientific Research</h1>
                <p className="subtitle">Search and share quality research papers</p>
            </div>

            <div className="filters">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
                <Link to="/submit" className="btn-submit">Submit New Article</Link>
            </div>

            <div className="articles-grid">
                {articles.map(article => (
                    <article key={article._id} className="article-card">
                        <div className="article-header">
                            <span className="category-badge">{article.category}</span>
                            <span className="views">👁 {article.views} views</span>
                        </div>
                        <h2>
                            <Link to={`/article/${article._id}`}>{article.title}</Link>
                        </h2>
                        <div className="authors">
                            {article.authors?.map((author, idx) => (
                                <span key={idx}>{author.name}</span>
                            )).join(', ')}
                        </div>
                        <p className="abstract">{article.abstract.substring(0, 200)}...</p>
                        <div className="article-footer">
                            <span className="date">
                                {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                            </span>
                            {article.pdfFile && (
                                <a href={`${API_URL}/articles/file/${article.pdfFile.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pdf-link">
                                    📄 PDF
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}>
                    ← Trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}>
                    Sau →
                </button>
            </div>
        </div>
    );
}

// Component: PDF Viewer
function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    // Theo dõi scroll và tự động tải xuống khi đến trang 3
    useEffect(() => {
        if (pageNumber >= 3 && !hasDownloaded) {
            setHasDownloaded(true);
            // Tự động tải xuống PDF
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = pdfUrl.split('/').pop() || 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('PDF đang được tải xuống vì bạn đã xem đến trang 3!');
        }
    }, [pageNumber, hasDownloaded, pdfUrl]);

    const goToPrevPage = () => {
        setPageNumber(prev => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setPageNumber(prev => Math.min(numPages, prev + 1));
    };

    return (
        <div className="pdf-viewer-container" ref={containerRef}>
            <div className="pdf-controls">
                <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                    ← Trang trước
                </button>
                <span className="page-info">
                    Trang {pageNumber} / {numPages}
                    {pageNumber >= 3 && <span className="warning-text"> (PDF sẽ tự động tải xuống)</span>}
                </span>
                <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                    Trang sau →
                </button>
            </div>

            <div className="pdf-document-wrapper">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div className="pdf-loading">Đang tải PDF...</div>}
                    error={<div className="pdf-error">Không thể tải PDF. Vui lòng thử lại.</div>}
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        width={800}
                    />
                </Document>
            </div>
        </div>
    );
}

// Component: Chi tiết bài báo
function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const response = await axios.get(`${API_URL}/articles/${id}`);
            setArticle(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching article:', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!article) return <div className="error">Article not found</div>;

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="article-detail-page">
            <div className="article-layout">
                {/* Left Column - Main Content */}
                <div className="article-main">
                    <div className="article-header-top">
                        <span className="category-badge">{article.category}</span>
                        <span className="publish-date">March 4, 2021</span>
                    </div>

                    <h1 className="article-title">{article.title}</h1>

                    <div className="authors-list">
                        {article.authors?.map((author, idx) => (
                            <div key={idx} className="author-item">
                                <div className="author-avatar">
                                    {getInitials(author.name)}
                                </div>
                                <div className="author-info">
                                    <strong className="author-name">{author.name}</strong>
                                    {author.affiliation && <p className="author-affiliation">{author.affiliation}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <section className="abstract-section">
                        <h2>Abstract</h2>
                        <p>{article.abstract}</p>
                    </section>

                    {article.keywords && article.keywords.length > 0 && (
                        <div className="keywords-section">
                            <strong>Keywords:</strong> {article.keywords.join(', ')}
                        </div>
                    )}

                    {/* PDF Preview Section */}
                    {article.pdfFile && (
                        <section className="pdf-preview-section">
                            <div className="pdf-preview-header">
                                <h2>📄 PDF Preview</h2>
                            </div>
                            <div className="pdf-preview-content">
                                <div className="pdf-warning">
                                    ⚠️ <strong>Note:</strong> PDF will be automatically downloaded when you reach page 3
                                </div>
                                <PDFViewer pdfUrl={`${API_URL}/articles/file/${article.pdfFile.path}`} />
                            </div>
                        </section>
                    )}

                    <section className="content-main">
                        <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
                    </section>

                    {article.images && article.images.length > 0 && (
                        <section className="images-section">
                            <h2>Figures</h2>
                            <div className="images-grid">
                                {article.images.map((img, idx) => (
                                    <figure key={idx}>
                                        <img src={`${API_URL}/articles/file/${img.path}`} alt={img.caption || `Figure ${idx + 1}`} />
                                        {img.caption && <figcaption>{img.caption}</figcaption>}
                                    </figure>
                                ))}
                            </div>
                        </section>
                    )}

                    {article.references && article.references.length > 0 && (
                        <section className="references-section">
                            <h2>References ({article.references.length})</h2>
                            <ol className="references-list">
                                {article.references.map((ref, idx) => (
                                    <li key={idx}>{ref}</li>
                                ))}
                            </ol>
                        </section>
                    )}
                </div>

                {/* Right Sidebar */}
                <aside className="article-sidebar">
                    <div className="sidebar-card download-card">
                        <div className="card-icon">✓</div>
                        {article.pdfFile ? (
                            <>
                                <a href={`${API_URL}/articles/file/${article.pdfFile.path}`}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-download-pdf">
                                    <span className="icon">📄</span>
                                    Download full-text PDF
                                </a>
                                <Link to={`/article/${article._id}`} className="btn-read-full">
                                    <span className="icon">📖</span>
                                    Read full-text
                                </Link>
                                <p className="file-size">Size: {(article.pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </>
                        ) : (
                            <p className="no-pdf">No PDF available</p>
                        )}
                    </div>

                    <div className="sidebar-card info-card">
                        <h3>Publication Info</h3>
                        <p><strong>Published:</strong><br />March 4, 2021</p>
                        <p><strong>Category:</strong><br />{article.category}</p>
                        {article.authors && article.authors.length > 0 && (
                            <p><strong>Authors:</strong><br />{article.authors.length} author{article.authors.length > 1 ? 's' : ''}</p>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

// Component: Form đăng bài
function SubmitArticle() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        content: '',
        category: 'research',
        status: 'published',
        authors: [{ name: '', affiliation: '', email: '' }],
        keywords: '',
        references: ''
    });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
        const newAuthors = [...formData.authors];
        newAuthors[index][field] = value;
        setFormData({ ...formData, authors: newAuthors });
    };

    const addAuthor = () => {
        setFormData({
            ...formData,
            authors: [...formData.authors, { name: '', affiliation: '', email: '' }]
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('abstract', formData.abstract);
            data.append('content', formData.content);
            data.append('category', formData.category);
            data.append('status', formData.status);
            data.append('authors', JSON.stringify(formData.authors));

            if (formData.keywords) {
                const keywordsArray = formData.keywords.split(',').map(k => k.trim());
                data.append('keywords', JSON.stringify(keywordsArray));
            }

            if (formData.references) {
                const referencesArray = formData.references.split('\n').filter(r => r.trim());
                data.append('references', JSON.stringify(referencesArray));
            }

            if (pdfFile) {
                data.append('pdf', pdfFile);
            }

            const response = await axios.post(`${API_URL}/articles`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Article published successfully!');
            navigate(`/article/${response.data._id}`);
        } catch (error) {
            console.error('Error submitting article:', error);
            alert('An error occurred while publishing the article!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="submit-page">
            <Link to="/" className="back-link">← Back to Home</Link>

            <h1>Submit New Article</h1>

            <form onSubmit={handleSubmit} className="submit-form">
                <div className="form-group">
                    <label>Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter article title"
                    />
                </div>

                <div className="form-group">
                    <label>Authors *</label>
                    {formData.authors.map((author, idx) => (
                        <div key={idx} className="author-inputs">
                            <input
                                type="text"
                                placeholder="Full name"
                                value={author.name}
                                onChange={(e) => handleAuthorChange(idx, 'name', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Affiliation"
                                value={author.affiliation}
                                onChange={(e) => handleAuthorChange(idx, 'affiliation', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={author.email}
                                onChange={(e) => handleAuthorChange(idx, 'email', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addAuthor} className="btn-add">+ Add author</button>
                </div>

                <div className="form-group">
                    <label>Category *</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                        <option value="research">Research</option>
                        <option value="review">Review</option>
                        <option value="case-study">Case Study</option>
                        <option value="technical">Technical</option>
                        <option value="news">News</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Abstract *</label>
                    <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        placeholder="Enter article abstract"
                    />
                </div>

                <div className="form-group">
                    <label>Keywords</label>
                    <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleInputChange}
                        placeholder="Enter keywords, separated by commas"
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={15}
                        placeholder="Enter full article content (optional)"
                    />
                </div>

                <div className="form-group">
                    <label>References</label>
                    <textarea
                        name="references"
                        value={formData.references}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="One reference per line"
                    />
                </div>

                <div className="form-group">
                    <label>PDF File</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    />
                    {pdfFile && <span className="file-name">{pdfFile.name}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={submitting} className="btn-submit">
                        {submitting ? 'Publishing...' : 'Publish Article'}
                    </button>
                </div>
            </form>
        </div>
    );
}

// App component chính
function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/article/:id" element={<ArticleDetail />} />
                        <Route path="/submit" element={<SubmitArticle />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
