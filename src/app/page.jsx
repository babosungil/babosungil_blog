import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight,
  Sun,
  Moon,
  ChevronLeft
} from 'lucide-react';

// --- Mock Data: 실제 블로그 포스트 데이터 ---
const POSTS = [
  {
    id: 1,
    title: "Next.js 14의 새로운 기능 알아보기",
    excerpt: "App Router부터 Server Actions까지, Next.js의 최신 업데이트가 개발자 경험을 어떻게 변화시키는지 심층적으로 분석합니다.",
    content: `
      <p>Next.js 14는 프레임워크의 성능과 개발자 경험을 한 단계 더 끌어올렸습니다. 특히 Server Actions의 정식 지원은 데이터 페칭과 변형의 방식을 완전히 바꾸어 놓았습니다.</p>
      <h3>주요 변경 사항</h3>
      <ul>
        <li><strong>Server Actions:</strong> API 엔드포인트 없이 폼 제출을 처리할 수 있습니다.</li>
        <li><strong>Partial Prerendering:</strong> 정적 콘텐츠와 동적 콘텐츠를 결합하여 더 빠른 로딩 속도를 제공합니다.</li>
        <li><strong>Turbopack:</strong> 로컬 개발 서버의 속도가 혁신적으로 빨라졌습니다.</li>
      </ul>
      <p>이러한 변화들은 React 생태계가 서버 중심으로 이동하고 있음을 보여주는 중요한 지표입니다.</p>
    `,
    category: "개발",
    date: "2024-03-20",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Tailwind CSS를 활용한 디자인 시스템 구축",
    excerpt: "일관성 있는 UI를 위해 Tailwind CSS를 어떻게 구성하고 확장해야 할까요? 실전 프로젝트 경험을 공유합니다.",
    content: `
      <p>디자인 시스템은 협업의 핵심입니다. Tailwind CSS는 Utility-first 접근 방식을 통해 이를 매우 효율적으로 관리하게 해줍니다.</p>
      <p>tailwind.config.js 파일을 통해 색상 팔레트, 타이포그래피, 간격 시스템을 중앙화하는 방법을 알아봅니다.</p>
    `,
    category: "디자인",
    date: "2024-03-18",
    readTime: "8분",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "TypeScript와 함께하는 타입 안전한 개발",
    excerpt: "런타임 에러를 획기적으로 줄여주는 TypeScript 도입 가이드. 생산성을 높이는 팁과 도구들을 소개합니다.",
    content: `
      <p>자바스크립트의 유연함은 양날의 검입니다. TypeScript는 정적 타입을 통해 코드의 안정성을 보장하며, IDE의 자동 완성 기능을 통해 개발 속도를 높여줍니다.</p>
    `,
    category: "개발",
    date: "2024-03-15",
    readTime: "10분",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop"
  }
];

const CATEGORIES = ["전체", "개발", "디자인", "회고", "기술"];

const App = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 다크 모드 적용
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 포스트 필터링 로직
  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === "전체" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 헤더 컴포넌트
  const Header = () => (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => { setSelectedPost(null); setActiveCategory("전체"); }}
        >
          DevLog
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => { setSelectedPost(null); setActiveCategory("전체"); }} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">홈</button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">프로필</button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">프로젝트</button>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
          </button>
        </div>

        {/* 모바일 햄버거 메뉴 */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2">
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900 px-4 py-4 space-y-4 animate-in slide-in-from-top duration-300">
          <button className="block w-full text-left py-2 font-medium dark:text-white">홈</button>
          <button className="block w-full text-left py-2 font-medium dark:text-white">프로필</button>
          <button className="block w-full text-left py-2 font-medium dark:text-white">프로젝트</button>
        </div>
      )}
    </nav>
  );

  // 푸터 컴포넌트
  const Footer = () => (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t dark:border-gray-800 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 dark:text-white">DevLog</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">학습하고 기록하며 성장하는 프론트엔드 개발자 블로그입니다.</p>
            <div className="flex space-x-4">
              <Github size={20} className="cursor-pointer hover:text-blue-600 transition-colors dark:text-gray-400" />
              <Twitter size={20} className="cursor-pointer hover:text-blue-600 transition-colors dark:text-gray-400" />
              <Linkedin size={20} className="cursor-pointer hover:text-blue-600 transition-colors dark:text-gray-400" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 dark:text-white">카테고리</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {CATEGORIES.slice(1).map(cat => (
                <li key={cat} className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveCategory(cat)}>{cat}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 dark:text-white">뉴스레터 구독</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="이메일 주소" 
                className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">구독</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t dark:border-gray-800 text-center text-gray-500 text-sm">
          © 2024 DevLog. All rights reserved.
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {selectedPost ? (
          /* 상세 페이지 뷰 */
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setSelectedPost(null)}
              className="flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>목록으로 돌아가기</span>
            </button>
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-lg"
            />
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                {selectedPost.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={14} className="mr-1" />
                {selectedPost.date}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={14} className="mr-1" />
                {selectedPost.readTime}
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-6 dark:text-white leading-tight">
              {selectedPost.title}
            </h1>
            <div 
              className="prose prose-lg dark:prose-invert max-w-none dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        ) : (
          /* 목록 페이지 뷰 */
          <div className="space-y-12">
            {/* 히어로 섹션 */}
            <section className="text-center py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800/50 dark:to-transparent rounded-3xl mb-8">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white tracking-tight">
                기록하며 성장하는 공간
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                프론트엔드 개발 기술과 지식을 공유하는 개인 블로그입니다.
              </p>
              
              {/* 검색창 */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="관심 있는 주제를 검색해 보세요"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </section>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 포스트 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <article 
                    key={post.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                        <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                        <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                        더 읽어보기 <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-500">
                  <Search size={48} className="mx-auto mb-4 opacity-20" />
                  검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;